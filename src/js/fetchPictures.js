import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';

export async function fetchPictures(query, page) {
    const params = {
        key: '29598631-67f61c45caf91015f5fc88c1e',
        q: `${query}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: `${page}`,
        per_page: 40,
    };

    try {
        const response = await axios.get(`${BASE_URL}`, { params });
        console.log(response.data);
        return await response.data;
        
    } catch (error) {
        console.error(error);
    };
};