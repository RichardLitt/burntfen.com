const crypto = require('crypto');
const fetch = require('node-fetch');

const DOMAIN = 'mg.burntfen.com';
const LIST_ADDRESS = `daily@${DOMAIN}`;
const FROM = `Richard Littauer <${LIST_ADDRESS}>`;
const REPLY_TO = 'richard@burntfen.com';
const SERIES_NAME = 'Notes from China';
const API_BASE = process.env.MAILGUN_API_BASE || 'https://api.mailgun.net';
const TOKEN_LIFETIME_SECONDS = 7 * 24 * 60 * 60;

function sign(email, expires) {
    return crypto
        .createHmac('sha256', process.env.DAILY_CONFIRM_SECRET)
        .update(`${email}\n${expires}`)
        .digest('base64url');
}

function createToken(email) {
    const expires = Math.floor(Date.now() / 1000) + TOKEN_LIFETIME_SECONDS;
    return { expires, signature: sign(email, expires) };
}

function isValidToken({ email, expires, signature }) {
    if (!email || !expires || !signature) return false;
    if (Number(expires) < Date.now() / 1000) return false;
    const expected = Buffer.from(sign(email, expires));
    const received = Buffer.from(signature);
    return expected.length === received.length && crypto.timingSafeEqual(expected, received);
}

async function mailgun(path, fields) {
    const response = await fetch(`${API_BASE}/v3/${path}`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString('base64')}`,
        },
        body: new URLSearchParams(fields),
    });
    if (!response.ok) {
        throw new Error(`Mailgun ${path} returned ${response.status}: ${await response.text()}`);
    }
}

function siteUrl() {
    const url = process.env.CONTEXT === 'deploy-preview' ? process.env.DEPLOY_PRIME_URL : process.env.URL;
    return url || 'https://www.burntfen.com';
}

function parseForm(event) {
    const body = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString() : event.body || '';
    return Object.fromEntries(new URLSearchParams(body));
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function htmlPage(statusCode, title, body) {
    return {
        statusCode,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
        body: `<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<body style="font-family: Georgia, serif; max-width: 32em; margin: 4em auto; padding: 0 1em; line-height: 1.5">
<h1>${escapeHtml(title)}</h1>
${body}
<p><a href="/daily">Back to ${SERIES_NAME}</a></p>
</body>`,
    };
}

module.exports = {
    DOMAIN,
    LIST_ADDRESS,
    FROM,
    REPLY_TO,
    SERIES_NAME,
    createToken,
    isValidToken,
    mailgun,
    siteUrl,
    parseForm,
    escapeHtml,
    htmlPage,
};
