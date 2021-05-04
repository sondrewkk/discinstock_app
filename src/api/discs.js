
import { getData } from './api'

const fetchDiscs = async function() {
  
  const discs = await getData("discs", "skip=0&limit=50");
  return discs;
}

const searchDiscs = async function(discName) {

  const discs = await getData("discs/search", `name=${discName}`);
  return discs;
} 

export { fetchDiscs, searchDiscs };
