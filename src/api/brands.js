import { getData } from './api'

const fetchBrands = async function() {
    const response = await getData("brands");
    const brands = response.data;

    return brands;
}

export { fetchBrands };
