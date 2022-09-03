import refs from '../js/refs';

import Notiflix from 'notiflix';
import { pixabay } from './pixabay';

let page = 1;
let searchName = '';

export function onFormSubmit(e) {
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

let options = {
    root: null,
    rootMargin: '100px',
    threshold: 0.5,
};

let scroll = function (entries) {    
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

export let observer = new IntersectionObserver(scroll, options);