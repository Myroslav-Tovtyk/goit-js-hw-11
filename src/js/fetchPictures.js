import axios from "axios";
import Notiflix from "notiflix";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29598631-67f61c45caf91015f5fc88c1e';


export async function fetchPictures(q, page) {
     const params = {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page,
        q,
        per_page: 40,
    };
    try {
        const response = await axios.get(BASE_URL, { params });
        return await response.data;
        
    } catch (error) {
        Notiflix.Notify.failure(error);
    };
};