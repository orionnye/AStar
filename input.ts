import { Vector } from "./src/math"

export default class Input {
    keys: Map<string, boolean>
    mouse: Map<number, boolean>
    cursor: Vector
    constructor() {
        this.keys = new Map()
        this.mouse = new Map()
        this.cursor = new Vector(0, 0)
    }
    
    setKeyTrue(e: KeyboardEvent) {
        console.log("setting:", this.keys)
        this.keys.set(e.key, true)
    }
    setKeyFalse(e: KeyboardEvent) {
        console.log("setting:", e.key)
        this.keys.set(e.key, false)
    }
    setMouse(button: number, value: boolean) {
        this.mouse.set(button, value)
    }
    setCursor(newPoint: Vector) {
        this.cursor = newPoint
    }
    watchKeys() {
        console.log("starting watch")
        window.addEventListener("keyup", this.logKey)
        // window.addEventListener("keydown", this.setKeyTrue)
        // window.addEventListener("keyup", this.setKeyFalse)
    }
    stopWatch() {
        console.log("stopping watch")
        window.removeEventListener("keyup", this.logKey)
        // window.removeEventListener("keydown", (e) => this.setKey(e, true), true)
        // window.removeEventListener("keyup", (e) => this.setKey(e, false), true)
        // window.removeEventListener("mousedown", (e) => this.setMouse(e.button, true))
        // window.removeEventListener("mouseup", (e) => this.setMouse(e.button, false))
        // window.removeEventListener("mousemove", (e) => this.setCursor(new Vector(e.x, e.y)))
    }
    test() {
        console.log("functions work fine")
    }
    logKey(e) {
        console.log(e.key)
        if (e.key == "Enter") {
            console.log("call me")
            this.stopWatch()
        }
    }
    watchMouse() {
        window.addEventListener("mousedown", (e) => this.setMouse(e.button, true))
        window.addEventListener("mouseup", (e) => this.setMouse(e.button, false))
    }
    watchCursor() {
        window.addEventListener("mousemove", (e) => this.setCursor(new Vector(e.x, e.y)))
    }
}