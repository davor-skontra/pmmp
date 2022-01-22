import {TextField} from '@mui/material';
import ColorPropertySelectorBase, {ColorPropertySelectorProps} from "./ColorPropertySelectorBase";

function renderTextField(defaultValue: number, onValueChange: (value: number) => void) {
    return (
        <TextField
            style={{width: '100%', maxWidth: '300pt'}}
            type={'number'}
            inputProps={{inputMode: 'numeric'}}
            label={'Count'}
            onChange={e => onValueChange(Number(e.target.value))}
            defaultValue={defaultValue}
        />
    )
}

function ColorPropertySelector(p: ColorPropertySelectorProps) {
    return (
        <ColorPropertySelectorBase{...p} rightElement={renderTextField}/>
    )
}

export default ColorPropertySelector;