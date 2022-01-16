import React, {CSSProperties, useEffect, useState} from 'react';
import './App.css';
import {Box, Card, Typography} from "@mui/material";
import ColorPropertySelectorWithTextField from "./ColorPropertySelectorWithTextField";
import {calculateColors, ColorCalculationSettings, ColorProperty} from "./palette-engine";
import _ from 'lodash'
import ColorValueSlider from "./ColorPropertySelectorWithSlider";

const cardStyle: CSSProperties = {
    margin: '10pt',
    padding: '20pt',
    display: 'flex',
    flexDirection: 'column',
    gap: '10pt'
}

function App() {
    const [baseSelection, setBaseSelection] = useState(ColorProperty.Hue)
    const [variantSelection, setVariantSelection] = useState(ColorProperty.Brightness)
    const [constantSelection, setConstantSelection] = useState(ColorProperty.Saturation)
    const [baseValue, setBaseValue] = useState(3)
    const [variantValue, setVariantValue] = useState(3)
    const [constantValue, setConstantValue] = useState(128) // Middle value (between 0 and 255) for constant
    
    const settings: ColorCalculationSettings = {
        baseColorProperty: baseSelection,
        baseValue: baseValue,
        variantColorProperty: variantSelection,
        variantValue: variantValue,
        constantColorProperty: constantSelection,
        constantValue: constantValue,
    }
    
    calculateColors(settings)
    
    useEffect(() => {
        document.title = "pmmp - Make Palettes"
    });
    
    return (
        <Box>
            <Card style={cardStyle}>
                <Typography variant={"h6"}>Palette Maker Makes Palettes</Typography>
                <ColorPropertySelectorWithTextField
                    title={'Base:'}
                    defaultSelected={baseSelection}
                    defaultValue={baseValue}
                    onOptionChange={setBaseSelection}
                    onValueChange={setBaseValue}
                />
                <ColorPropertySelectorWithTextField
                    title={'Variant:'}
                    defaultSelected={variantSelection}
                    defaultValue={variantValue}
                    onOptionChange={setVariantSelection}
                    onValueChange={setVariantValue}
                />
                <ColorValueSlider
                    title={`Constant:`}
                    defaultSelected={constantSelection}
                    defaultValue={constantValue}
                    onOptionChange={setConstantSelection}
                    onValueChange={setConstantValue}
                    min={0} 
                    max={255}
                    step={1}
                />
            </Card>
        </Box>
    );
}

export default App;
