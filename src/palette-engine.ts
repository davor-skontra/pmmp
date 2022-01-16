export enum ColorProperty {Hue= 'Hue', Saturation = 'Saturation', Brightness = 'Brightness'}

export interface ColorCalculationSettings {
    baseColorProperty: ColorProperty
    baseValue: number
    variantColorProperty: ColorProperty
    variantValue: number
    constantColorProperty: ColorProperty
    constantValue: number
}

export function calculateColors(settings: ColorCalculationSettings) {
    
}