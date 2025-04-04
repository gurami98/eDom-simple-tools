exports.handler = async function(event, context) {
  const { default: fetch } = await import('node-fetch');  // Ensure 'node-fetch' is installed for making HTTP requests

  const id = event.path.split('/').pop();
  const apiUrl = `https://edominations.com/en/api/battle-damage/${id}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch data from the API' }),
        headers: {
          'Access-Control-Allow-Origin': '*',  // Allow all origins
        },
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',  // Allow all origins
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error while fetching data' }),
      headers: {
        'Access-Control-Allow-Origin': '*',  // Allow all origins
      },
    };
  }
};
