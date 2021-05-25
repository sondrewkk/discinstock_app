
import axios from 'axios'

const getData = async function(endpoint, query) {
  //const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"};
  const baseUrl = process.env.VUE_APP_API_URL;
  var url = `${baseUrl}/${endpoint}`;

  if(query) {
    url = `${url}?${query}`;
  }

  //const response = await fetch(url);
  const response = await axios.get(url);
  return response;
}

export { getData }