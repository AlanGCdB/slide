export default class Slide {
    constructor(slide, wrapper) {
        this.slide = document.querySelector(slide);
        this.wrapper = document.querySelector(wrapper);
        
    }
onStrat(event){
event.preventDefault();
this.wrapper.addEventListener('mousemove', this.onMove);
}

onMove(event){
}
onEnd(event){
this.wrapper.removeEventListener('mousemove', this.onMove);


}

addSlideEvents(){
    this.wrapper.addEventListener('mousedown', this.onStrat);
    this.wrapper.addEventListener('mouseup', this.onEnd);
}
bindEvents(){
    this.onStrat = this.onStrat.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
}

init(){
    this.bindEvents();
    this.onMove();
    this.onEnd();
    this.addSlideEvents();
    return this;
}
}