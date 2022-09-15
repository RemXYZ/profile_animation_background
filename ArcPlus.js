class ArcPlus {
    constructor(ctx, x, y, r, color) {
        this.r = r
        this.ctx = ctx
        this.color = color
        this.x = x
        this.y = y

        this.frameKeyWords = ["x","y","r"]
        this.animationFrames = []
    }

    draw() {
        this.ctx.save();
        this.ctx.fillStyle = this.color
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.restore()
    }

    setAnimationFrame(keyFrame) {
        Object.keys(keyFrame).forEach(el => {
            if (!this.frameKeyWords.some(fel => el == fel)) {
                console.error(`${el} cannot be used as a parameter to change, use`, this.frameKeyWords)
                delete keyFrame[el]
            }
        })
        let options = {
            i: this.animationFrames.length,
            keyLeft: Object.keys(keyFrame).length,
            achived: 0,
            keyFrame
        }
        this.animationFrames.push(options)
    }

    animate(timeArg) {
        for(let i = 0; i < this.animationFrames.length; i++) {
            let frame = this.animationFrames[i]
            let achived = frame.achived
            if (achived == 0) {

                for (const [k,v] of Object.entries(frame.keyFrame)) {
                    let time = timeArg
                    if(v == this[k]) {
                        continue
                    }
                    if (v < this[k]) {
                        time *= -1
                    }
                    

                    // removes bumps in numbers :)
                    if (Math.abs(v - this[k]) < Math.abs(time)) {
                        time = v - this[k]
                        
                    }
                    // console.log(k,v,this[k],Math.abs(v - this[k]),  time)
                    // console.log(k,v, time, this[k], v < this[k])
                    this[k] += time

                    if(v == this[k]) {
                        this.animationFrames[i].keyLeft -= 1
                    }
                }

                if (this.animationFrames[i].keyLeft == 0) {
                    this.animationFrames[i].achived = 1
                }
                // console.log(this)
                // console.log(this.animationFrames)
                break
            }
        }
        this.draw()

        let frameCounter = this.animationFrames.length
        for(let i = 0; i < this.animationFrames.length; i++) {
            if (this.animationFrames[i].achived == 1) {
                frameCounter -= 1
            }
            if (frameCounter == 0)
                return false
        }
        return true
    }
}