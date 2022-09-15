class CurvePlus{
    constructor(ctx) {
            this.ctx = ctx
            // this.currCoord = {"x": 0, "y": 0}
            this.animationTime = 0
        }


    calculateRandomAngle(angleBorder) {
        // calculate random angle
        let angle = getRandomInt(angleBorder[0], angleBorder[1])

        // if angle is negative, e.g. -18 -> 342
        angle = angle < 0 ? angle + 360 : angle
        return angle
    }


    calculateDistance(angle, size, i) {
        let
        coord = {
            "x": this.coords.x[i],
            "y": this.coords.y[i]
        },
        // distance by sinus
        distanceSin, 
        // distance by cosinus
        distanceCos,
        // final distance (with random)
        distanceF
        
        if (angle < 180) {
            distanceSin = (size.h - coord.y) / Math.sin((angle * Math.PI) / 180)
        }else {
            distanceSin = coord.y / Math.abs(Math.sin((angle * Math.PI) / 180))
        }
        
        // Calculating distance to left and right border
        if (angle >= 90 && angle <= 270) {
            distanceCos = (size.w - coord.x) / Math.abs(Math.cos((angle* Math.PI) / 180))
        } else {
            distanceCos = coord.x / Math.abs(Math.cos((angle* Math.PI) / 180))
        }

        if (distanceSin > distanceCos ) {
            distanceF = distanceCos / (this.curves - i)
        } else {
            distanceF = distanceSin / (this.curves - i)
        }

        // distanceF = distanceSin > distanceCos ? distanceCos / this.curves : distanceSin / this.curves
        // console.log(this.curves, angle, coord.x + "x", coord.y +" y", distanceSin, distanceCos, distanceF)
        // console.log(distanceF, this.curves, i)
        // randomize line distance
        if (i != this.curves - 1) {
            distanceF = distanceF + getRandomInt(20, -20) / 100 * distanceF
        }
        // console.log(distanceF )
        return distanceF;
    }

    calculateCoordByLine(x, y, angle, distance){
        x = x + (-1 * distance * Math.cos(angle * Math.PI / 180))
        y = y + distance * Math.sin(angle * Math.PI / 180)
        return {x,y}
    }

    calculateDotCoord(angleBorder, size, i) {
        let
        coord = {
            "x": this.coords.x[i],
            "y": this.coords.y[i]
        },
        angle = this.calculateRandomAngle(angleBorder),
        distance = this.calculateDistance(angle, size, i);

        this.angles.push(angle)
        this.distances.push(distance)

        let newCoord = this.calculateCoordByLine(coord.x, coord.y, angle, distance)
        // console.log(x +"x", y +"y", distance, angle, coord)
        
        return newCoord

    }


    generateLinePath(size) {
        let angleBorders = [180+20, 0-20],
        curves = getRandomInt(4, 2)
        this.coords = {
            "x": [getRandomInt(size.w-size.w*0.05, size.w*0.05)],
            "y": [0]
        }
        this.angles = []
        this.distances = []
        this.curves = curves

        // ctx.beginPath();
        // ctx.moveTo(this.coords.x[0],this.coords.y[0]);

        // let coord = this.calculateDotCoord([100,90], size, 0)
        // this.coords.x.push(coord.x)
        // this.coords.y.push(coord.y)
        // ctx.lineTo(coord.x,coord.y);
        // coord = this.calculateDotCoord([80,30], size, 1)
        // this.coords.x.push(coord.x)
        // this.coords.y.push(coord.y)
        // ctx.lineTo(coord.x,coord.y);
        // coord = this.calculateDotCoord([80,30], size, 2)
        // this.coords.x.push(coord.x)
        // this.coords.y.push(coord.y)
        // ctx.lineTo(coord.x,coord.y);

        for(let i = 0; i < curves; i++) {
            //unique angle for start and for end
            if (i == 0 || i == curves - 1) {
                var newAngleBorders = [150, 30]
            }
            let coord = this.calculateDotCoord(newAngleBorders, size, i)
            this.coords.x.push(coord.x)
            this.coords.y.push(coord.y)
            
            newAngleBorders = angleBorders
        }
    }


    draw() {
        ctx.beginPath();
        ctx.moveTo(this.coords.x[0],this.coords.y[0]);

        for(let i = 1; i < this.coords.x.length; i++) {
            ctx.lineTo(this.coords.x[i], this.coords.y[i]);
        }

        ctx.stroke();

        // console.log(this)
    }

    drawing(pct) {
        if (pct >= 1) {
            this.draw()
            return false
        }
        let coords = this.coords
        let fullDistance = this.distances.reduce((prev, curr)=>curr + prev)
        // let currCoord = this.currCoord
        let distance = this.distances[0]
        // console.log(this.distances, fullDistance)
        // percentage distance
        let pctDistance = fullDistance * pct
        // console.log(pctDistance)
        this.ctx.beginPath();
        this.ctx.moveTo(coords.x[0], coords.y[0]);
        for(let i = 0; i < this.distances.length; i++) {
            if (pctDistance <= distance) {
                pctDistance = this.distances[i] - (distance - pctDistance)
                let coord = this.calculateCoordByLine(coords.x[i], coords.y[i], this.angles[i], pctDistance)
                this.ctx.lineTo(coord.x, coord.y)
                // console.log(pctDistance, i, coord)
                
                break
            } else {
                distance += this.distances[i+1]
                this.ctx.lineTo(coords.x[i+1], coords.y[i+1])
                continue
            }
        }

        ctx.stroke();
        // ctx.moveTo(currCoord.x, currCoord.y);
        return true
    }

    animate(timeArg) {
        this.animationTime += timeArg
        let animationStatus = this.drawing(this.animationTime)
        return animationStatus
    }
}