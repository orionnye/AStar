import Grid from "./grid"
import { Vector } from "./math"
import Player from "../Player"

export default class State {
    map: Grid
    constructor(width: number, height: number) {
        this.map = new Grid(width, height)
    }
}