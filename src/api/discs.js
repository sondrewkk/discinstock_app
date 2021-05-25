
import { getData } from './api'

const fetchDiscs = async function(skip, limit) {
  const response = await getData("discs", `skip=${ skip }&limit=${ limit }`);
  const discs = response.data;
  const linkHeader = response.headers['link'];
  const links = linkHeader.split(",");

  const parsedlinks = links.map(link => {
    link = link.split(";");
    const url = link[0].match(/[^<]+(?=>)/)[0];
    const rel = link[1].match(/[^="]+(?=")/)[0];
    
    return {"key": rel, "value": url};
  });

  const parsedLinksHash = Object.fromEntries(parsedlinks.map(link => [link.key, link.value]))
  const discResponse = {
    "pagination": parsedLinksHash,
    "data": discs
  }

  return discResponse;
}

const searchDiscs = async function(discName) {

  const response = await getData("discs/search", `name=${discName}`);
  const discs = response.data;
  
  return discs;
} 

export { fetchDiscs, searchDiscs };
