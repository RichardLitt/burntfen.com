// Sends new daily log entries to the email list, Bluesky and Mastodon.
// See .github/workflows/publish-daily.yml. Set DRY_RUN=1 to print instead of send.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const SITE_URL = process.env.SITE_URL || 'https://www.burntfen.com';
const MAILGUN_API = process.env.MAILGUN_API_BASE || 'https://api.mailgun.net';
const MAILGUN_DOMAIN = 'mg.burntfen.com';
const LIST_ADDRESS = `daily@${MAILGUN_DOMAIN}`;
const FROM = `Richard Littauer <${LIST_ADDRESS}>`;
const REPLY_TO = 'richard@burntfen.com';
const SOCIAL_LINK = 'burntfen.com/daily';
const BLUESKY_API = 'https://bsky.social/xrpc';

const MAX_AGE_HOURS = 48;
const POLL_INTERVAL_MS = Number(process.env.POLL_INTERVAL_MS || 20_000);
const POLL_TIMEOUT_MS = Number(process.env.POLL_TIMEOUT_MS || 10 * 60_000);
const BLUESKY_MAX_GRAPHEMES = 300;
const MASTODON_MAX_CHARS = 500;
// Mastodon counts every link as 23 characters, plus the space before it.
const MASTODON_LINK_COST = 24;

const DRY_RUN = Boolean(process.env.DRY_RUN);
const ENTRY = process.env.ENTRY;
const TEST_TO = process.env.TEST_TO;
const CHANNELS = TEST_TO ? ['email'] : (process.env.CHANNELS || 'email,bluesky,mastodon').split(',').map((c) => c.trim());

function requireEnv(name) {
    const value = process.env[name];
    if (!value) throw new Error(`Missing ${name}`);
    return value;
}

function newEntryPaths() {
    const output = execFileSync(
        'git',
        ['-c', 'core.quotePath=false', 'diff', '--name-only', '--diff-filter=A', '-M', requireEnv('BEFORE_SHA'), requireEnv('AFTER_SHA'), '--', '_daily/'],
        { encoding: 'utf8' }
    );
    return output.split('\n').filter((path) => path.endsWith('.md'));
}

function isTooOld(path) {
    const match = path.match(/^_daily\/(\d{4}-\d{2}-\d{2})-/);
    if (!match) throw new Error(`${path}: the filename must start with YYYY-MM-DD`);
    // The end of that date in New Zealand is at the latest 12:00 UTC on the same date.
    const endOfDay = Date.parse(`${match[1]}T12:00:00Z`);
    return Date.now() - endOfDay > MAX_AGE_HOURS * 3600_000;
}

async function waitForEntries(paths) {
    const deadline = Date.now() + POLL_TIMEOUT_MS;
    console.log(`Looking for ${paths.join(', ')} at ${SITE_URL}/daily.json`);
    for (;;) {
        try {
            const response = await fetch(`${SITE_URL}/daily.json?t=${Date.now()}`, { cache: 'no-store' });
            if (response.ok) {
                const published = await response.json();
                if (paths.every((path) => published.some((entry) => entry.path === path))) return published;
                console.log('Still waiting: not in daily.json yet');
            } else {
                console.log(`Still waiting: daily.json returned ${response.status}`);
            }
        } catch (error) {
            console.log(`Still waiting: ${error.message}`);
        }
        if (Date.now() > deadline) throw new Error(`Timed out waiting for ${paths.join(', ')} to appear in daily.json`);
        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    }
}

function checkEntry(entry, published) {
    if (published.filter((other) => other.id === entry.id).length > 1) {
        throw new Error(`${entry.path}: there is more than one entry for ${entry.id}`);
    }
}

function entryUrl(entry) {
    return `${SITE_URL}/daily#${entry.id}`;
}

function markdownSource(entry) {
    return readFileSync(entry.path, 'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();
}

function renderTemplate(name, values) {
    return readFileSync(new URL(`../../daily/${name}`, import.meta.url), 'utf8').replace(/\{\{(\w+)\}\}/g, (placeholder, key) => {
        if (!(key in values)) throw new Error(`Unknown placeholder ${placeholder} in ${name}`);
        return values[key];
    });
}

function splitGraphemes(text) {
    return [...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(text)].map((s) => s.segment);
}

function shorten(text, maxGraphemes) {
    const graphemes = splitGraphemes(text);
    return graphemes.length <= maxGraphemes ? text : `${graphemes.slice(0, maxGraphemes - 1).join('').trimEnd()}…`;
}

// "Day 13/75: The title", with only the title shortened if it won't fit.
function socialLead(entry, maxGraphemes) {
    const prefix = `${entry.day.replace(' of ', '/')}: `;
    return `${prefix}${shorten(entry.title, maxGraphemes - splitGraphemes(prefix).length)}`;
}

async function checkResponse(label, response) {
    if (!response.ok) throw new Error(`${label} returned ${response.status}: ${await response.text()}`);
    return response.json();
}

async function sendEmail(entry) {
    const archive = `${SITE_URL}/daily`;
    const unsubscribe = TEST_TO ? `${SITE_URL}/daily#unsubscribe-placeholder` : '%mailing_list_unsubscribe_url%';
    const date = new Date(`${entry.id}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
    const content = entry.html
        .replace(/(href|src)="\//g, `$1="${SITE_URL}/`)
        .replace(/<a /g, '<a style="color: #2450c8; font-weight: bold" ');
    const values = { date, day: entry.day, archive_url: archive, unsubscribe_url: unsubscribe };
    const html = renderTemplate('_email.html', { ...values, content });
    const text = renderTemplate('_email.txt', { ...values, content: markdownSource(entry) });

    const fields = {
        from: FROM,
        to: TEST_TO || LIST_ADDRESS,
        'h:Reply-To': REPLY_TO,
        subject: TEST_TO ? `[test] ${entry.title}` : entry.title,
        html,
        text,
        'o:tracking': 'no',
        'o:tracking-clicks': 'no',
        'o:tracking-opens': 'no',
    };
    if (!TEST_TO) fields['h:List-Unsubscribe'] = `<${unsubscribe}>`;

    if (DRY_RUN) return console.log(`[dry run] email to ${fields.to}: ${fields.subject}\n${text}\n${html}`);

    const key = Buffer.from(`api:${requireEnv('MAILGUN_API_KEY')}`).toString('base64');
    await checkResponse(
        'Mailgun',
        await fetch(`${MAILGUN_API}/v3/${MAILGUN_DOMAIN}/messages`, {
            method: 'POST',
            headers: { Authorization: `Basic ${key}` },
            body: new URLSearchParams(fields),
        })
    );
}

function blueskyRecord(entry) {
    const prefix = `${socialLead(entry, BLUESKY_MAX_GRAPHEMES - splitGraphemes(` ${SOCIAL_LINK}`).length)} `;
    const byteStart = Buffer.byteLength(prefix);
    return {
        $type: 'app.bsky.feed.post',
        text: `${prefix}${SOCIAL_LINK}`,
        createdAt: new Date().toISOString(),
        langs: ['en'],
        facets: [
            {
                index: { byteStart, byteEnd: byteStart + Buffer.byteLength(SOCIAL_LINK) },
                features: [{ $type: 'app.bsky.richtext.facet#link', uri: entryUrl(entry) }],
            },
        ],
    };
}

async function postToBluesky(entry) {
    const record = blueskyRecord(entry);
    if (DRY_RUN) return console.log(`[dry run] bluesky: ${JSON.stringify(record)}`);

    const session = await checkResponse(
        'Bluesky createSession',
        await fetch(`${BLUESKY_API}/com.atproto.server.createSession`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier: requireEnv('BLUESKY_HANDLE'), password: requireEnv('BLUESKY_APP_PASSWORD') }),
        })
    );
    await checkResponse(
        'Bluesky createRecord',
        await fetch(`${BLUESKY_API}/com.atproto.repo.createRecord`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.accessJwt}` },
            body: JSON.stringify({ repo: session.did, collection: 'app.bsky.feed.post', record }),
        })
    );
}

async function postToMastodon(entry) {
    // Mastodon only links URLs with a scheme, and hides the scheme when displaying them.
    const status = `${socialLead(entry, MASTODON_MAX_CHARS - MASTODON_LINK_COST)} https://${SOCIAL_LINK}`;
    if (DRY_RUN) return console.log(`[dry run] mastodon: ${status}`);

    const instance = requireEnv('MASTODON_INSTANCE').replace(/^https?:\/\//, '').replace(/\/+$/, '');
    await checkResponse(
        'Mastodon',
        await fetch(`https://${instance}/api/v1/statuses`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${requireEnv('MASTODON_TOKEN')}`,
                'Content-Type': 'application/json',
                'Idempotency-Key': `daily-${entry.id}`,
            },
            body: JSON.stringify({ status, visibility: 'public' }),
        })
    );
}

const SENDERS = { email: sendEmail, bluesky: postToBluesky, mastodon: postToMastodon };

async function main() {
    if (!DRY_RUN && Number(process.env.GITHUB_RUN_ATTEMPT || 1) > 1) {
        throw new Error('Refusing to run on a re-run, because it would send to everyone again. Use "Run workflow" and name only the failed channels.');
    }
    const unknown = CHANNELS.filter((channel) => !SENDERS[channel]);
    if (unknown.length) throw new Error(`Unknown channels: ${unknown.join(', ')}`);

    let paths;
    if (ENTRY) {
        if (!existsSync(ENTRY)) throw new Error(`No such file: ${ENTRY}`);
        paths = [ENTRY];
    } else {
        paths = newEntryPaths().filter((path) => {
            if (!isTooOld(path)) return true;
            console.log(`Skipping ${path}: dated more than ${MAX_AGE_HOURS} hours ago`);
            return false;
        });
    }
    if (paths.length === 0) return console.log('No new entries to send.');

    const published = await waitForEntries(paths);
    const failures = [];

    for (const path of paths) {
        const entry = published.find((candidate) => candidate.path === path);
        if (!ENTRY && !entry.send) {
            console.log(`Skipping ${path}: send is false`);
            continue;
        }
        try {
            checkEntry(entry, published);
        } catch (error) {
            console.error(error.message);
            failures.push(`${path}: not sent`);
            continue;
        }
        const channels = !ENTRY && !entry.social ? CHANNELS.filter((channel) => channel === 'email') : CHANNELS;
        if (channels.length < CHANNELS.length) console.log(`${path}: social is false, so skipping social posts`);
        for (const channel of channels) {
            try {
                await SENDERS[channel](entry);
                console.log(`${path}: ${channel} done`);
            } catch (error) {
                console.error(`${path}: ${channel} failed: ${error.message}`);
                failures.push(`${path}: ${channel}`);
            }
        }
    }

    if (failures.length) {
        throw new Error(`Failed: ${failures.join('; ')}`);
    }
}

main().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
