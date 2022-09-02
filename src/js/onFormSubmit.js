import refs from '../js/refs';
import { fetchPictures } from '../js/fetchPictures';
import { renderMarkup } from "../js/renderMarkup";
import render from '../templates/render.hbs';
import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

refs.btnSubmit.addEventListener('submit', onFormSubmit);
let searchName = '';
let page = 1;

export function onFormSubmit(e) {
    e.preventDefault();
    observer.unobserve(document.querySelector('.more'));
    searchName = '';
    page = 1;
    document.querySelector('.gallery').innerHTML = '';

    if (!e.currentTarget.elements.searchQuery.value) {
        Notiflix.Notify.info('Please, enter valid search query');
        return;
    };

    if (searchName === e.currentTarget.elements.searchQuery.value) {
        Notiflix.Notify.info('Ooops, already found');
        return;
    };

    searchName = e.currentTarget.elements.searchQuery.value;
    console.log(searchName);
    e.target.reset();
    pixabay(searchName, page);

    observer.observe(document.querySelector('.more'));
};

async function pixabay(searchName, page) {
    try {
        const data = await fetchPictures(searchName, page);
        const hits = await data.hits;

        if (hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        };

        if (page * 40 >= data.totalHits) { 
            observer.unobserve(document.querySelector('.more'));
            Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
        }

        if (page === 1 && hits.length > 0) { 
            Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
        }
        
        renderMarkup(hits, refs.gallery, render);
        lightbox.refresh();
    }
    catch {

    }
};

let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    showCounter: false,
    captionType: "attr",
});

let options = {
    root: null,
    rootMargin: '100px',
    threshold: 0.5,
};

let callback = function (entries) {
    console.log('callback')
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            page++;
            pixabay(searchName, page);
        }
      });
};

let observer = new IntersectionObserver(callback, options);