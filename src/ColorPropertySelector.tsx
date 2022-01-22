import {Slider, TextField} from '@mui/material';
import ColorPropertySelectorBase, {ColorPropertySelectorProps} from "./ColorPropertySelectorBase";
import ColorPropertyRange from "./color-property-range";

function renderTextField(defaultValue: number, onValueChange: (value: number) => void, rp: RangeProperties) {
    return (
        <>
            <TextField
                style={{width: '20%', maxWidth: '100pt'}}
                type={'number'}
                inputProps={{inputMode: 'numeric'}}
                label={'Count'}
                onChange={e => onValueChange(Number(e.target.value))}
                defaultValue={defaultValue}
            />
            <Slider
                style={{width: '80%', maxWidth: '300pt'}}
                defaultValue={[0, rp.possibleMax]}
                onChange={ (e, v) => {
                    const [min, max] = v as number[];
                    rp.onRangeChange(new ColorPropertyRange(min, max));
                }}
            />
        </>
    )
}

interface RangeProperties { 
    possibleMax: number;
    defaultSelectedRange: ColorPropertyRange;
    onRangeChange: (rp: ColorPropertyRange) => void;
}

function ColorPropertySelector(
    p: ColorPropertySelectorProps & RangeProperties
) {
    const rightSideFactory = (defaultValue: number, onChange: (value: number) => void) =>
        renderTextField(defaultValue, onChange, p);
    
    return (
        <ColorPropertySelectorBase{...p} rightElement={rightSideFactory} />
    )
}

export default ColorPropertySelector;