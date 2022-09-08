class CurvePlus{
    constructor(ctx) {
            this.ctx = ctx
        }


    calculateRandomAngle(angleBorder) {
        // calculate random angle
        let angle = getRandomInc(angleBorder[0], angleBorder[1])

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
        
        console.log(this.curves, angle, coord.x + "x", coord.y +" y", distanceSin, distanceCos, distanceF)
        return distanceF;
    }


    calculateDotCoord(angleBorder, size, i) {
        let
        coord = {
            "x": this.coords.x[i],
            "y": this.coords.y[i]
        },
        angle = this.calculateRandomAngle(angleBorder),
        distance = this.calculateDistance(angle, size, i);

        let x = coord.x + (-1 * distance * Math.cos(angle * Math.PI / 180))
        let y = coord.y + distance * Math.sin(angle * Math.PI / 180)
        console.log(x +"x", y +"y", distance, angle, coord)
        
        return {x,y}

    }


    generateLinePath(size) {
        let angleBorders = [180+20, 0-20],
        curves = getRandomInc(4, 1)
        this.coords = {
            "x": [getRandomInc(size.w, 0)],
            "y": [0]
        }
        this.curves = curves

        ctx.beginPath();
        ctx.moveTo(this.coords.x[0],this.coords.y[0]);

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
            ctx.lineTo(coord.x,coord.y);
            // newAngleBorders = angleBorders
        }
        ctx.stroke();
    }
}