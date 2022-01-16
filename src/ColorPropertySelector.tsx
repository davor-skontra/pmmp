import {Box, FormControl, MenuItem, TextField, Typography} from '@mui/material';
import {CSSProperties, ReactNode, useState} from 'react';
import {ColorProperty} from "./palette-engine";
import Select, {SelectChangeEvent} from '@mui/material/Select';

export interface ColorPropertySelectorProps {
    title: string;
    defaultSelected: ColorProperty
    onOptionChange: (selection: ColorProperty) => void;
    onValueChange: (value: number) => void
}

export type ExtendedColorPropertySelectorProps = ColorPropertySelectorProps & {
    rightElement: (onValueChange: (value: number) => void) => JSX.Element
}

const formControlStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '15pt',
}

const colorProperties = Object.values<ColorProperty>(ColorProperty)

function ColorPropertySelector(p: ExtendedColorPropertySelectorProps) {
    return (
        <FormControl style={formControlStyle}>
            <Typography variant={'body1'} style={{width: '55pt'}}>{p.title}</Typography>
            <Select
                style={{width: '98pt'}}
                value={p.defaultSelected.toString()}
                onChange={e => p.onOptionChange(ColorProperty[e.target.value as keyof typeof ColorProperty])}
            >
                {colorProperties.map((x, i) => (
                    <MenuItem key={i} value={x.toString()}>{x.toString()}</MenuItem>)
                )}
            </Select>
            {p.rightElement(p.onValueChange)}
        </FormControl>
    )
}

export default ColorPropertySelector;