import {FormControl, Typography} from "@mui/material";
import {CSSProperties} from "react";

interface ColorValueSliderProps {
    title: string
    from: number
    to: number
    onValueChange: (value: number) => void
}

const formControlStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10pt',
}
function ColorValueSlider(p: ColorValueSliderProps){
    return (
        <FormControl style={formControlStyle}>
            <Typography variant={'body1'} style={{width: '200pt'}}>{p.title}</Typography>
        </FormControl>
    )
}

export default ColorValueSlider;