export class Vector {
    x: number
    y: number
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    get length() {
        let dist = Math.sqrt(this.x**2 + this.y**2)
        return dist
    }
}