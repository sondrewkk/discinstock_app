


const getData = async function(endpoint, query) {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"};
  const baseUrl = process.env.VUE_APP_API_URL;
  var url = `${baseUrl}/${endpoint}`;

  if(query) {
    url = `${url}?${query}`;
  }

  const response = await fetch(url, headers);
  const data = await response.json();

  return data
}

export { getData }