import SlideNav from './slide.js';

const slide = new SlideNav('[data-slide]', '[data-wrapper]');
slide.init();
slide.addArrow('[data-prev]', '[data-next]');
slide.addControl('[data-controls]');
