import {Slider, SliderProps, TextField} from '@mui/material';
import ColorPropertySelector, {ColorPropertySelectorProps} from "./ColorPropertySelector";

type SliderColorPropertySelectorProps = ColorPropertySelectorProps & SliderProps

function renderSlider(p: SliderColorPropertySelectorProps, onValueChange: (value: number) => void) {
    return (
        <Slider 
            style={{width: '100%', maxWidth: '300pt'}} {...p}
            onChange={(e, v )=> p.onValueChange(v as number)}
            step={1}
        />
    )
}

function ColorPropertySelectorWithSlider(p: SliderColorPropertySelectorProps) {
    const sliderFactory = (v: (value: number) => void) => renderSlider(p, v)
    
    return (
        <ColorPropertySelector {...p} rightElement={sliderFactory}/>
    )
}

export default ColorPropertySelectorWithSlider;