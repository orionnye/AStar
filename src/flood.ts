import Grid from './grid'
import { Vector } from './math'

//NEED TO REWORK TILE CLASS SO WE KNOW HOW FAR IT GOES
export class Tile {
    origin: Tile | null
    pos: Vector
    cost: number
    constructor(origin: Tile | null, pos: Vector) {
        this.origin = origin
        this.pos = pos
        if (origin != null)
            this.cost = origin.cost + pos.subtract(origin.pos).length
        else
            this.cost = 0
    }
    // addCost(cost: number) {
    //     this.cost += cost
    // }
}

export class Flood {
    //stores travelled tiles
    occupied: Set<string> = new Set()
    tiles: Tile[]
    start: Vector
    finish: Vector
    growIndex: number
    nope: boolean
    constructor(start: Vector, finish: Vector) {
        this.start = start
        this.finish = finish
        this.growIndex = 0
        this.tiles = [new Tile(null, start)]
        this.nope = false
    }

    get complete() {
        if (this.contains(this.finish) || this.nope) {
            return true
        }
        return false
    }

    findPathHome(child: Tile) {
        let path: Vector[] = []
        if (!child) return path
        path.push(child.pos)
        let current = child.origin
        while (current?.pos) {
            path.push(current.pos)
            current = current.origin
        }
        return path
    }


    addChildren(parent: Tile, cells: Vector[]) {
        cells.forEach(cell => {
            if (!this.contains(cell)) {
                let child = new Tile(parent, cell)
                this.tiles.push(child)
                this.occupied.add(cell.keyString())
            }
        })
    }

    contains(pos: Vector) {
        // Checking Set.has is O(1), vs the previous method which was an O(n) search.
        return this.occupied.has(pos.keyString())
    }

    grow(map: Grid) {
        //grab cell at grow index
        if (this.growIndex < this.tiles.length) {
            let origin = this.tiles[this.growIndex]
            // console.log(origin)
            if (origin !== undefined) {
                let neighbors: Vector[] = map.getNeighbors(origin.pos)
                this.addChildren(origin, neighbors)
                this.growIndex += 1
            } else {
                this.nope = true
                console.log("we got nothing chief")
            }
        }
    }

    finalPath() {
        //check for path containing the final tile
        let completePaths = []
        for (let tile of this.tiles)
            if (tile.pos.x == this.finish.x && tile.pos.y == this.finish.y)
                completePaths.push(tile)
        let winner = undefined
        let lowestCost = Infinity
        for (let value of completePaths) {
            if (lowestCost > value.cost) {
                winner = value
                lowestCost = value.cost
            }
        }
        return winner
    }
}