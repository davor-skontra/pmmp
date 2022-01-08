import {Box, FormControl, MenuItem, TextField, Typography} from '@mui/material';
import {CSSProperties, useState} from 'react';
import {ColorProperty, ColorPropertyNames} from "./palette-engine";
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ColorValueSelectorProps {
    title: string;
    defaultSelected: ColorProperty
    selectableOptions: string[]
    onOptionChange: (selection: ColorProperty) => void;
    onValueChange: (value: number) => void;
}

const boxStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10pt',
    margin: '10pt'
}

function ColorValueSelector(p: ColorValueSelectorProps) {
    return (
        <Box>
            <FormControl style={boxStyle} sx={{ m: 1, minWidth: 420 }}>
                <Typography variant={'body1'} style={{width: '45pt'}}>{p.title}</Typography>
                <Select
                    style={{width: '98pt'}}
                    value={p.defaultSelected.toString()}
                    onChange={e => p.onOptionChange(e.target.value as unknown as ColorProperty)}
                >
                    {ColorPropertyNames.map((x, i) => (
                        <MenuItem key={i} value={x}>{x}</MenuItem>)
                    )}
                </Select>
                <TextField type={'number'} inputProps={{ inputMode: 'numeric'}} label={'Count'}/>
            </FormControl>
        </Box>
    )
}

export default ColorValueSelector;