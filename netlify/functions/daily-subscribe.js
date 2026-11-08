const { DOMAIN, FROM, REPLY_TO, SERIES_NAME, createToken, mailgun, siteUrl, parseForm, htmlPage } = require('../lib/daily');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const checkYourEmail = () =>
    htmlPage(200, 'Check your email', '<p>I sent you a link to confirm your subscription. It works for seven days.</p>');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers: { Allow: 'POST' }, body: 'Method not allowed' };
    }

    const form = parseForm(event);
    if (form.website) return checkYourEmail();

    const email = (form.email || '').trim().toLowerCase();
    if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
        return htmlPage(400, 'That email address looks wrong', '<p>Please go back and check it.</p>');
    }

    try {
        const { expires, signature } = createToken(email);
        const query = new URLSearchParams({ email, expires, signature });
        const link = `${siteUrl()}/.netlify/functions/daily-confirm?${query}`;

        await mailgun(`${DOMAIN}/messages`, {
            from: FROM,
            to: email,
            'h:Reply-To': REPLY_TO,
            subject: `Confirm your subscription to ${SERIES_NAME}`,
            text: `Someone, hopefully you, asked to get Richard Littauer's ${SERIES_NAME} by email.\n\nTo confirm, open this link and press the button:\n\n${link}\n\nIf this wasn't you, ignore this email and nothing will happen.\n`,
            'o:tracking': 'no',
        });
    } catch (error) {
        console.error(error);
        return htmlPage(502, 'Something went wrong', '<p>Your subscription did not go through. Please try again later.</p>');
    }

    return checkYourEmail();
};
