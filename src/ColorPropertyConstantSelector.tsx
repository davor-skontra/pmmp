import {Slider, SliderProps, TextField} from '@mui/material';
import ColorPropertySelectorBase, {ColorPropertySelectorProps} from "./ColorPropertySelectorBase";

type SliderColorPropertySelectorProps = ColorPropertySelectorProps & SliderProps

function renderSlider(p: SliderColorPropertySelectorProps, defaultValue: number, onValueChange: (value: number) => void) {
    return (
        <Slider 
            style={{width: '100%', maxWidth: '300pt'}} {...p}
            onChange={(e, v )=> p.onValueChange(v as number)}
            step={1}
            defaultValue={defaultValue}
        />
    )
}

function ColorPropertyConstantSelector(p: SliderColorPropertySelectorProps) {
    const sliderFactory = (defaultValue: number, onChange: (value: number) => void) => renderSlider(p, defaultValue, onChange)
    
    return (
        <ColorPropertySelectorBase {...p} rightElement={sliderFactory}/>
    )
}

export default ColorPropertyConstantSelector;