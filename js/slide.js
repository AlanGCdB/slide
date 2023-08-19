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
        let movetype;
        if (event.type === 'mousedown') {
            event.preventDefault();
            this.dist.stratX = event.clientX;
            movetype = 'mousemove'
        } else {
            this.dist.stratX = event.changedTouches[0].clientX;
            movetype = 'touchmove'

        }
        this.wrapper.addEventListener(movetype, this.onMove);
    }

    onMove(event) {
        const pointerPosition = (event.type === 'mousemove')
            ? event.clientX : event.changedTouches[0].clientX;
        const finalPosition = this.updatePosition(pointerPosition);
        this.moveSlide(finalPosition);
    }

    onEnd(event) {
        const moveType = (event.type === 'mouseup')
            ? 'mousemove' : 'touchmove'
        this.wrapper.removeEventListener(moveType, this.onMove);
        this.dist.finalPosition = this.dist.movePosition;
    }

    addSlideEvents() {
        this.wrapper.addEventListener('mousedown', this.onStrat);
        this.wrapper.addEventListener('touchstart', this.onStrat);
        this.wrapper.addEventListener('mouseup', this.onEnd);
        this.wrapper.addEventListener('touchend', this.onEnd);
    }
    bindEvents() {
        this.onStrat = this.onStrat.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    /* Slide config */
    slidePosition(slide) {
        const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
        return -(slide.offsetLeft - margin);
    }

    slideConfig() {
        this.slideArray = [...this.slide.children].map((element => {
            const position = this.slidePosition(element);
            return { position, element }
        }));
    }

    slidesIndexNav(index) {
        const last = this.slideArray.length - 1
        this.index = {
            prev: index ? index - 1 : undefined,
            active: index,
            next: index === last ? undefined : index + 1,
        }
    }

    changeSlide(index) {
        const activeSlide = this.slideArray[index];
        this.moveSlide(this.slideArray[index].position);
        this.slidesIndexNav(index);
        this.dist.finalPosition = activeSlide.position;
    }


    init() {
        this.bindEvents();
        this.addSlideEvents();
        this.slideConfig();
        return this;
    }
}