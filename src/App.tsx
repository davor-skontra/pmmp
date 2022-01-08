import React, {CSSProperties, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Box, Card, Typography} from "@mui/material";
import ColorValueSelector from "./ColorValueSelector";
import {ColorProperty} from "./palette-engine";

function App() {
    const [baseSelection, setBaseSelection] = useState(ColorProperty.Hue)
    const [variantSelection, setVariantSelection] = useState(ColorProperty.Brightness)
    const [constantSelection, setConstantSelection] = useState(ColorProperty.Saturation)

    useEffect(() => {
        document.title = "pmmp - Make Palettes"
    });

    const exclude = (property: ColorProperty) =>
        Object.values<ColorProperty>(ColorProperty).filter(x => x != property)

    return (
        <Box>
            <Card>
                <Typography variant={"h6"}>Palette Maker Makes Palettes</Typography>
                <ColorValueSelector
                    title={'Base:'}
                    defaultSelected={baseSelection}
                    selectableOptions={exclude(variantSelection)}
                    onOptionChange={x => {}}
                    onValueChange={x => {}}/>
                <ColorValueSelector
                    title={'Variant:'}
                    defaultSelected={variantSelection}
                    selectableOptions={exclude(baseSelection)}
                    onOptionChange={x => {}}
                    onValueChange={x => {}}/>
            </Card>
        </Box>
    );
}

export default App;
