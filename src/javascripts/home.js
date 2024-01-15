import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Carousel } from 'bootstrap';

const myCarouselElement = document.querySelector('#myCarousel');

new Carousel(myCarouselElement, {
  interval: 10,
  touch: false
});

