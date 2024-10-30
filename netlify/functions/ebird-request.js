const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const userInput = event.queryStringParameters.query;
    const apiUrl = `https://api.ebird.org/v2/ref/hotspot/${userInput}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-eBirdApiToken': process.env.EBIRD_API_KEY,
            },
        });

        if (!response.ok) {
            return { statusCode: response.status, body: 'Error fetching data from eBird API' };
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
