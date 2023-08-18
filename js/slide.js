export default class Slide {
    constructor(slide, wrapper) {
        this.slide = document.querySelector(slide);
        this.wrapper = document.querySelector(wrapper);
        this.dist = { finalPosition: 0, stratX: 0, movement: 0 }
    }

    moveSlide(distX) {
        this.dist.movePosition = distX;
        this.slide.style.transform = `translate3d(${distX}px,0,0)`;
    }

    updatePosition(clientX) {
        this.dist.movement = (this.dist.stratX - clientX) * 3;
        return this.dist.finalPosition - this.dist.movement;
    }

    onStrat(event) {
        event.preventDefault();
        this.dist.stratX = event.clientX;
        this.wrapper.addEventListener('mousemove', this.onMove);
    }

    onMove(event) {
        const finalPosition = this.updatePosition(event.clientX);
        this.moveSlide(finalPosition);
    }

    onEnd(event) {
        this.wrapper.removeEventListener('mousemove', this.onMove);
        this.dist.finalPosition = this.dist.movePosition;
    }

    addSlideEvents() {
        this.wrapper.addEventListener('mousedown', this.onStrat);
        this.wrapper.addEventListener('mouseup', this.onEnd);
    }
    bindEvents() {
        this.onStrat = this.onStrat.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    init() {
        this.bindEvents();
        this.addSlideEvents();
        return this;
    }
}