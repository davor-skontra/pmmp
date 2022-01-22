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
                min={rp.range.min}
                max={rp.range.max}
                defaultValue={[rp.defaultSelectedRange.min, rp.defaultSelectedRange.max]}
                onChange={ (e, v) => {
                    const [min, max] = v as number[];
                    rp.onRangeChange(new ColorPropertyRange(min, max));
                }}
            />
        </>
    )
}

interface RangeProperties {
    range: ColorPropertyRange;
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