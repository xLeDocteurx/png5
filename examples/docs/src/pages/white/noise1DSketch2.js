export default (p5) => {
    let canvas = null
    // const scale = 0.05
    const scale = 1
    // const scale = 10

    let prevData = null

    p5.setup = function() {
        canvas = p5.createCanvas(0,0)
        resizeCanvas()
    }
  
    p5.draw = function() {
        if(p5.data && p5.data !== prevData) {
            drawFrame()
            prevData = p5.data            
        }
    }

    function drawFrame() {

        p5.background(51)

        p5.fill(255)

        p5.beginShape()

        for (let x = 0; x <= p5.width; x += p5.width/p5.data.divisionValue) {

            let y = p5.map(1 - p5.data.getNoise(x * p5.data.noiseScaleValue * scale), 0, 1, 0, p5.height)

            // p5.circle(x, y - p5.data.offsetValue * p5.height, 10)
            p5.vertex(x, y - p5.data.offsetValue * p5.height)
        }
        
        p5.vertex(p5.width, p5.height)
        p5.vertex(0, p5.height)

        p5.endShape(p5.CLOSE)

    }

    function resizeCanvas() {
        const coef = 0.75
        const parentWidth = canvas.parent().clientWidth * coef
        const computedHeight = parentWidth * (9/16)
        p5.resizeCanvas(parentWidth, computedHeight)
    }
    p5.windowResized = function() {
        resizeCanvas()
        drawFrame()
    }
}