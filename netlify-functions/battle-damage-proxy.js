const fetch = require('node-fetch');  // Ensure 'node-fetch' is installed for making HTTP requests

exports.handler = async function(event, context) {
  // Extract the ID from the URL (e.g., /battle-damage/123)
  const id = event.path.split('/').pop();

  // Construct the URL for the third-party API
  const apiUrl = `https://edominations.com/en/api/battle-damage/${id}`;

  try {
    // Fetch the data from the third-party API
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch data from the API' }),
      };
    }

    // Get the JSON response from the API
    const data = await response.json();

    // Return the API response back to the frontend
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error while fetching data' }),
    };
  }
};
