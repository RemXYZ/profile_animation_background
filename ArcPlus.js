class ArcPlus {
    constructor(ctx, x, y, w, h, color) {
        this.w = w
        this.h = h
        this.ctx = ctx
        this.color = color
        this.x = x
        this.y = y

        this.frameKeyWords = ["x","y","w","h"]
        this.animationFrames = []
    }

    draw() {
        ctx.beginPath();
        ctx.arc(0, 200, 100, 0, Math.PI * 2)
        ctx.fill()
    }
}