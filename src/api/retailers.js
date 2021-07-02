import { getData } from './api'

const fetchRetailers = async function() {
    const response = await getData("retailers");
    const retailers = response.data;

    return retailers;
}

export { fetchRetailers };
