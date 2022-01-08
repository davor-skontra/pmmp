import {Box, FormControl, MenuItem, TextField, Typography} from '@mui/material';
import {CSSProperties, useState} from 'react';
import {ColorProperty} from "./palette-engine";
import Select, {SelectChangeEvent} from '@mui/material/Select';

interface ColorValueSelectorProps {
    title: string;
    defaultSelected: ColorProperty
    selectableOptions: ColorProperty[]
    onOptionChange: (selection: ColorProperty) => void;
    onValueChange: (value: number) => void;
}

const formControlStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10pt',
}

function ColorValueSelector(p: ColorValueSelectorProps) {
    return (
        <FormControl style={formControlStyle}>
            <Typography variant={'body1'} style={{width: '45pt'}}>{p.title}</Typography>
            <Select
                style={{width: '98pt'}}
                value={p.defaultSelected.toString()}
                onChange={e => p.onOptionChange(ColorProperty[e.target.value as keyof typeof ColorProperty])}
            >
                {p.selectableOptions.map((x, i) => (
                    <MenuItem key={i} value={x.toString()}>{x.toString()}</MenuItem>)
                )}
            </Select>
            <TextField
                type={'number'}
                inputProps={{inputMode: 'numeric'}}
                label={'Count'}
                onChange={e => p.onValueChange(Number(e.target.value))}/>
        </FormControl>
    )
}

export default ColorValueSelector;