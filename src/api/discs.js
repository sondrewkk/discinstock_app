
const fetchDiscs = async function() {
  const headers = { "Content-Type": "application/json" };
  const response = await fetch("http://127.0.0.1:8000/discs?skip=0&limit=50", headers);
  const data = await response.json()

  return data
}

export { fetchDiscs };
