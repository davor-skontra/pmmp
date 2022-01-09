import React, {CSSProperties, useEffect, useState} from 'react';
import './App.css';
import {Box, Card, Typography} from "@mui/material";
import ColorPropertySelectorWithTextField from "./ColorPropertySelectorWithTextField";
import {ColorProperty} from "./palette-engine";
import _ from 'lodash'
import ColorValueSlider from "./ColorValueSlider";

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
    const properties = Object.values<ColorProperty>(ColorProperty)
    const constantSelection = _.without(properties, baseSelection, variantSelection)

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
                    selectableOptions={properties}
                    onOptionChange={setBaseSelection}
                    onValueChange={x => {
                    }}/>
                <ColorPropertySelectorWithTextField
                    title={'Variant:'}
                    defaultSelected={variantSelection}
                    selectableOptions={properties}
                    onOptionChange={setVariantSelection}
                    onValueChange={x => {
                    }}/>
                <ColorValueSlider 
                    title={`Base (${constantSelection}):`}
                    from={1}
                    to={100} 
                    onValueChange={x => {}}
                />
            </Card>
        </Box>
    );
}

export default App;
