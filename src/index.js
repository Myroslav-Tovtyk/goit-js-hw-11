
import refs from './js/refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import render from './templates/render.hbs';
import { fetchPictures } from './js/fetchPictures';


refs.btnSubmit.addEventListener('submit', onFormSubmit);

let searchName = '';
let page = 1;

function onFormSubmit(e) {
    e.preventDefault();

    if (!e.currentTarget.elements.searchQuery.value) {
        Notiflix.Notify.info('Please, enter valid search query');
        return;
    };

    if (searchName === e.currentTarget.elements.searchQuery.value) {
        Notiflix.Notify.info('Ooops, already found');
        return;
    };
  
    searchName = '';
    page = 1;
    refs.gallery.innerHTML = '';

    searchName = e.currentTarget.elements.searchQuery.value;    
    e.target.reset();
    pixabay(searchName, page);

    observer.observe(refs.more);
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
            observer.unobserve(refs.more);
            Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
        }

        if (page === 1 && hits.length > 0) { 
            Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
        }        

        refs.gallery.insertAdjacentHTML('beforeend', render(data));
        
        lightbox.refresh();
    }
    catch(error) {
        Notiflix.Notify.failure('Ooops, next time will be better...');
    }
};

let options = {
    root: null,
    rootMargin: '100px',
    threshold: 0.5,
};

let loadMore = function (entries) {    
    if (refs.gallery.innerHTML == '') {
        return;
    }
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            page++;            
            pixabay(searchName, page);
        }
      });
};

let observer = new IntersectionObserver(loadMore, options);


let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    showCounter: false,
    captionType: "attr",
});


