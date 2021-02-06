import { Vector } from "./math"
import { Tile }from "./flood"
import State from "./state"

//should recieve a world model
let canvas = <HTMLCanvasElement> document.getElementById("canvas1")
let canvasSize = new Vector(canvas.clientWidth, canvas.clientHeight)
let c = canvas.getContext('2d')

export function clearCanvas() {
    // Clear the page
    c.fillStyle = "beige"
    c.fillRect(0, 0, canvasSize.x, canvasSize.y)        
}

//Simple
export function drawRect(pos: Vector, size: Vector, color: string = "red") {
    c.fillStyle = color
    c.fillRect(pos.x, pos.y, size.x, size.y)
}
export function strokeRect(pos: Vector, size: Vector, color: string = "black") {
    c.lineWidth = 1;
    c.strokeStyle = color
    c.strokeRect(pos.x, pos.y, size.x, size.y)
}
export function drawLine(start: Vector, finish: Vector, lineWidth: number = 5) {
    c.lineWidth = lineWidth
    c.moveTo(start.x, start.y)
    c.lineTo(finish.x, finish.y)
    c.stroke()
}
export function drawLines(lines: Vector[], scaler: Vector, lineWidth: number = 5) {
    c.lineWidth = lineWidth
    c.beginPath()
    if (lines.length > 1) {
        let half = scaler.multiply(0.5)
        let start = lines[0].multiplyVec(scaler).add(half)
        c.moveTo(start.x, start.y);
        for (let i = 1; i < lines.length; i++) {
            let next = lines[i].multiplyVec(scaler).add(half)
            c.lineTo(next.x, next.y)
        }
        c.stroke()
    }
}

//Text
export function drawText(pos: Vector, size: number, text: string, color: string = "black") {
    c.fillStyle = color
    c.font = size + "px Times New Roman"
    c.fillText(text, pos.x + size, pos.y + size)
}