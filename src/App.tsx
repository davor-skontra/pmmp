import React, {CSSProperties, useEffect, useState} from 'react';
import './App.css';
import {Box, Card, Typography} from "@mui/material";
import ColorPropertySelectorWithTextField from "./ColorPropertySelectorWithTextField";
import {ColorProperty} from "./palette-engine";
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
                    onOptionChange={setBaseSelection}
                    onValueChange={x => {}}
                />
                <ColorPropertySelectorWithTextField
                    title={'Variant:'}
                    defaultSelected={variantSelection}
                    onOptionChange={setVariantSelection}
                    onValueChange={x => {}}
                />
                <ColorValueSlider
                    title={`Constant:`}
                    defaultSelected={constantSelection} 
                    onOptionChange={setConstantSelection}
                    onValueChange={x => {}}
                    min={1} 
                    max={100}
                    step={1}
                />
            </Card>
        </Box>
    );
}

export default App;
