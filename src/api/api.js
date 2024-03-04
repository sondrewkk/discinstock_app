
import axios from 'axios'

const getData = async function(endpoint, query = null) {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"};
  const baseUrl = import.meta.env.VITE_API_URL;
  console.log("Baseurl = " + baseUrl);
  var url = `${baseUrl}/${endpoint}`;
  
  if(query) {
    url = `${url}?${query}`;
  }

  const response = await axios.get(url, {"headers": headers});
  return response;
}

export { getData }