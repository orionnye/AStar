import { Vector } from "./math"
import Tile from "./tile"

export default class Grid {
    content: any[]
    width: number
    height: number
    constructor(width, height) {
        this.width = width
        this.height = height
        this.content = []
        for (let r = 0; r < this.height; r++) {
            this.content.push([])
            for (let c = 0; c < this.width; c++) {
                this.content[r].push(new Tile(0))
            }
        }
    }
    populate() {
        
    }
    set(pos: Vector, value) {
        if (pos.y >= this.height || pos.x >= this.width)
            console.error("tried setting value on grid that does not exist")
        this.content[pos.y][pos.x].content = value
    }
    setBlock(pos: Vector, size: Vector, value) {
        if (pos.y >= this.height || pos.x >= this.width)
            console.error("tried setting value on grid that does not exist")
        if (pos.y + size.y >= this.height || pos.x + size.x >= this.width)
            console.error("tried setting value on grid that does not exist")
        for (let r = pos.y; r < pos.y + size.y; r++) {
            for (let c = pos.x; c < pos.x + size.x; c++) {
                this.content[r][c].content = value
            }
        }
    }

}