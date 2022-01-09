import {TextField} from '@mui/material';
import ColorPropertySelector, {ColorPropertySelectorProps} from "./ColorPropertySelector";

function renderTextField(onValueChange: (value: number) => void) {
    return (
        <TextField
            type={'number'}
            inputProps={{inputMode: 'numeric'}}
            label={'Count'}
            onChange={e => onValueChange(Number(e.target.value))}/>
    )
}

function ColorPropertySelectorWithTextField(p: ColorPropertySelectorProps) {
    return (
        <ColorPropertySelector{...p} rightElement={renderTextField}/>
    )
}

export default ColorPropertySelectorWithTextField;