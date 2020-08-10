import React from 'react'
import { useEffect } from 'react';

const drawBall = (canvas, context, ball) => {
    console.log(ball)
    context.fillStyle = ball.colour;
    context.beginPath();
    context.arc(ball.xPos, ball.yPos, ball.radius, 0, 2 * Math.PI);
    context.fill();
}

const createBall = () => ({
    xPos: (Math.random() * window.innerWidth),
    yPos: (Math.random() * window.innerHeight/2),
    
    xVel: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10),
    yVel: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10),
    xAcc: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10),
    yAcc: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10),
    
    xVelMax: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10),
    yVelMax: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10),
    
    draw: drawBall,
    colour: Math.random() > 0.5? '#ff8080' : '#0099b0',
    radius: 10
})

const getWrappedPos = (curr, delta, radius, lim) => {
    if(curr + delta < 0 - radius) {
        return lim + radius
    }
    if(curr + delta > lim + radius) {
        return 0 - radius
    }
    return curr + delta
}

const updateState = (state, canvas) => {
    const { balls } = state
    return {
        balls: balls.map((b) => {
            return {
                ...b,
                
                xPos: getWrappedPos(b.xPos, b.xVel, b.radius, (canvas.width)),
                yPos: getWrappedPos(b.yPos, b.yVel, b.radius, (canvas.height)),

                xVel: b.xAcc > 0 ? Math.min(b.xVel + b.xAcc, -b.xVelMax) : Math.max(b.xVel + b.xAcc, b.xVelMax),
                yVel: b.yAcc > 0 ? Math.min(b.yVel + b.yAcc, -b.yVelMax) : Math.max(b.yVel + b.yAcc, b.yVelMax),
            }
        })
    }
}



const drawState = (canvas, context, state) => {
    // Get a random color, red or blue
    const { balls } = state
    balls.forEach((ball) => ball.draw(canvas, context, ball))

    // Draw a rectangle
}

const clearCanvas = (canvas, context) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

const gameLoop = (canvas, context, state) => {    
    let updatedState = updateState(state, canvas)
    
    clearCanvas(canvas, context)
    drawState(canvas, context, updatedState)
    
    window.requestAnimationFrame(() => gameLoop(canvas, context, updatedState));
}

const Game = () => {
    const canvasRef = React.useRef(null)

    const initialState = {
        balls: Array.from({ length: 200 }, createBall)
    }
    console.log(initialState)
    useEffect(() => {
        const canvas = canvasRef.current        
        const context = canvas.getContext('2d')
        window.requestAnimationFrame(() => gameLoop(canvas, context, initialState));        
    })

    return (
        <canvas
            id="canvas"
            width={window.innerWidth}
            height={window.innerHeight/2}
            ref={canvasRef}
        >
            Your browser does not support the HTML5 canvas tag.
        </canvas>
    )
}

export default Game
