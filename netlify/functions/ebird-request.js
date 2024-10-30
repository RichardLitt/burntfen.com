const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const userInput = event.queryStringParameters.query;
    const apiUrl = `https://api.ebird.org/v2/ref/hotspot/${userInput}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'x-ebirdapitoken': process.env.EBIRD_API_TOKEN,
            },
        });

        if (!response.ok) {
            return { statusCode: response.status, body: 'Error fetching data from eBird API' };
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: data,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
