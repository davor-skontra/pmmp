import {TextField} from '@mui/material';
import ColorPropertySelector, {ColorPropertySelectorProps} from "./ColorPropertySelector";

type SliderColorPropertySelectorProps = ColorPropertySelectorProps & {
    from: number
    to: number
}

function renderSlider(onValueChange: (value: number) => void) {
    return (
        <TextField
            type={'number'}
            inputProps={{inputMode: 'numeric'}}
            label={'Count'}
            onChange={e => onValueChange(Number(e.target.value))}/>
    )
}

function ColorPropertySelectorWithSlider(p: SliderColorPropertySelectorProps) {
    return (
        <ColorPropertySelector {...p} rightElement={renderSlider}/>
    )
}

export default ColorPropertySelectorWithSlider;