
import { getData } from './api'

const fetchDiscs = async function(skip, limit) {
  const response = await getData("discs", `skip=${ skip }&limit=${ limit }`);
  const discs = response.data;
  const parsedLinks = parseLinkHeader(response.headers['link'])
  
  const discResponse = {
    "pagination": parsedLinks,
    "data": discs
  }

  return discResponse;
}

const searchDiscs = async function(discName) {

  const response = await getData("discs/search", `name=${discName}`);
  const discs = response.data;
  
  return discs;
} 

const parseLinkHeader = (header) => {
  if(header == null) {
    console.error("No link header");
    return {};
  }
    
  const links = header.split(",");
  const parsedlinks = links.map(link => {
    link = link.split(";");
    const url = link[0].match(/[^<]+(?=>)/)[0];
    const rel = link[1].match(/[^="]+(?=")/)[0];
    
    return { "key": rel, "value": url };
  });

  const parsedLinksHash = Object.fromEntries(parsedlinks.map(link => [link.key, link.value]));

  return parsedLinksHash;
}

export { fetchDiscs, searchDiscs };
