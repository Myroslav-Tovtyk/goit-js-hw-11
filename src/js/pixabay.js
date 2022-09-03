import Notiflix from "notiflix";
import { fetchPictures } from "./fetchPictures";
import refs from "./refs";
import render from '../templates/render.hbs';
import { lightbox } from "..";
import { observer } from './onFormSubmit';

export async function pixabay(searchName, page) {
    try {
        const data = await fetchPictures(searchName, page);
        const hits = await data.hits;
        console.log(data)

        if (hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        };

        if (page * 40 >= data.totalHits) { 
            observer.unobserve(refs.more);
            Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
        }

        if (page === 1 && hits.length > 0) { 
            Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
        }
        
        // renderMarkup(hits, refs.gallery, render);
        refs.gallery.insertAdjacentHTML('beforeend', render(data));
        
        lightbox.refresh();
    }
    catch(error) {
        Notiflix.Notify.failure('Ooops, next time will be better...');
    }
};