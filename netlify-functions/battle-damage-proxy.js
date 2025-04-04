exports.handler = async function(event, context) {
  const { default: fetch } = await import('node-fetch');  // Ensure 'node-fetch' is installed for making HTTP requests

  // Extract the ID from the URL path
  const id = event.path.split('/').pop();
  const apiUrl = `https://edominations.com/en/api/battle-damage/${id}`;

  console.log(`Requesting API with URL: ${apiUrl}`);  // Log the API URL

  try {
    // Make the request to the third-party API
    const response = await fetch(apiUrl);
    console.log(response, 'response')

    // Log the response status and URL
    console.log(`API response status for ${apiUrl}: ${response.status}`);

    if (!response.ok) {
      // Log failure details if the response isn't OK
      console.log(`Failed to fetch data from API for ID: ${id}`);

      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch data from the API' }),
        headers: {
          'Access-Control-Allow-Origin': '*',  // Allow requests from all origins
          'Content-Type': 'application/json',
        },
      };
    }

    // Parse the JSON response
    const data = await response.json();

    // Log the data received from the API
    console.log(`Received data from API: ${JSON.stringify(data)}`);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',  // Allow requests from all origins
        'Access-Control-Allow-Headers': 'Content-Type', // Allow proper headers for CORS
        'Access-Control-Allow-Methods': 'GET, OPTIONS', // Allow GET requests
      },
    };
  } catch (error) {
    // Log any error that occurs during the fetch request
    console.error(`Error fetching data for ID: ${id}`, error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error while fetching data' }),
      headers: {
        'Access-Control-Allow-Origin': '*',  // Allow requests from all origins
      },
    };
  }
};
