import {ColorProperty} from "./palette-engine";

export default class ColorPropertyRange {
    public min: number;
    public max: number;
    
    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }
}