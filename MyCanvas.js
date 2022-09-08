class MyCanvas {
    constructor(root) {
        this.canv = document.querySelector(root),
        this.ctx = this.canv.getContext('2d');
        this.maxW = window.innerWidth;
        this.maxH = window.innerHeight;
    }

    setCanvasSize(){
        this.canv.width = this.maxW
        this.canv.height = this.maxH
    }
    
    getCanvas() {
        return this.ctx
    }

    getCanvasSize() {
        return {w: this.maxW, h:this.maxH}
    }
}