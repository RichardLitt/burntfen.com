document.getElementById('api-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const userInput = document.getElementById('user-input').value;
    const netlifyFunctionUrl = `/.netlify/functions/ebird-request?query=${encodeURIComponent(userInput)}`;

    fetch(netlifyFunctionUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching data from Netlify function');
            }
            return response.text();
        })
        .then(data => {
            const apiResponseDiv = document.getElementById('api-response');
            apiResponseDiv.innerHTML = `<p>API Response:</p>
${data}`;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('api-response').innerHTML = `<p>Error: ${error.message}</p>`;
        });
});
