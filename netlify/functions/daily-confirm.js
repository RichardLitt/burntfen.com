const { LIST_ADDRESS, isValidToken, mailgun, parseForm, escapeHtml, htmlPage } = require('../lib/daily');

const invalidLink = () =>
    htmlPage(400, 'That link is not valid', '<p>It may have expired. You can subscribe again from the daily log.</p>');

// GET only shows a button, because mail scanners open links in emails. Only the
// POST from that button adds someone to the list.
exports.handler = async (event) => {
    if (event.httpMethod === 'GET') {
        const token = event.queryStringParameters || {};
        if (!isValidToken(token)) return invalidLink();

        const hidden = ['email', 'expires', 'signature']
            .map((name) => `<input type="hidden" name="${name}" value="${escapeHtml(token[name])}">`)
            .join('\n');
        return htmlPage(
            200,
            'Confirm your subscription',
            `<p>Send the daily log to ${escapeHtml(token.email)}?</p>
<form method="post">
${hidden}
<button type="submit">Confirm</button>
</form>`
        );
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers: { Allow: 'GET, POST' }, body: 'Method not allowed' };
    }

    const token = parseForm(event);
    if (!isValidToken(token)) return invalidLink();

    try {
        await mailgun(`lists/${LIST_ADDRESS}/members`, {
            address: token.email,
            subscribed: 'yes',
            upsert: 'yes',
        });
    } catch (error) {
        console.error(error);
        return htmlPage(502, 'Something went wrong', '<p>Your subscription did not go through. Please try the link again later.</p>');
    }

    return htmlPage(200, "You're subscribed", '<p>The next daily log will land in your inbox. Every email has an unsubscribe link.</p>');
};
