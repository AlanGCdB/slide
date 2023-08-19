import Slide from './slide.js';

const slide = new Slide('[data-slide]', '[data-wrapper]');
slide.init();

slide.changeSlide(3);
slide.activeNextSlide()