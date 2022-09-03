
import refs from './js/refs';
import { onFormSubmit } from './js/onFormSubmit';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


refs.btnSubmit.addEventListener('submit', onFormSubmit);
 


export let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    showCounter: false,
    captionType: "attr",
});


