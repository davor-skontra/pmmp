import Color from "color";
import _ from "lodash"

export enum ColorProperty {Hue= 'Hue', Saturation = 'Saturation', Brightness = 'Brightness'}

export interface ColorCalculationSettings {
    baseColorProperty: ColorProperty
    baseValue: number
    variantColorProperty: ColorProperty
    variantValue: number
    constantColorProperty: ColorProperty
    constantValue: number
    baseMin: number,
    baseMax: number,
    variantMin: number
    variantMax: number
}

function getSteps(min: number, max: number, amount: number): number[] {
    const result: number[] = []
    const range = max - min
    const step = range / ( amount - 1 ) // -1 because we have min and max in by default
    if (step == 0 || amount == 0) {
        return result
    }
    let next = min;
    while(next <= max){
        result.push(next)
        next += step
    }
    return result
}

function createColor(baseCurrent: number, variantCurrent: number, s: ColorCalculationSettings){
    const values: {cp: ColorProperty, v: number}[] = [
            {cp: s.baseColorProperty, v: baseCurrent},
            {cp: s.variantColorProperty, v: variantCurrent},
            {cp: s.constantColorProperty, v: s.constantValue},
        ]
    
    const use = (cp: ColorProperty): number => {
        return _.find(values, x => x.cp == cp)!!.v
    }

    return Color.hsl(
        use(ColorProperty.Hue), use(ColorProperty.Saturation), use(ColorProperty.Brightness)
    )
    
}

export function calculateColors(s: ColorCalculationSettings): string[] {
    const baseSteps = getSteps(s.baseMin, s.baseMax, s.baseValue)
    const variantSteps = getSteps(s.variantMin, s.variantMax, s.variantValue)
    const colors = baseSteps
        .flatMap(b => variantSteps.map(v => createColor(b, v, s)))
        .map(c => c.hex())
    return colors
}