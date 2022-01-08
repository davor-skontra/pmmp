import React, {CSSProperties, useEffect, useState} from 'react';
import './App.css';
import {Box, Card, Typography} from "@mui/material";
import ColorValueSelector from "./ColorValueSelector";
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

    const exclude = (property: ColorProperty) => properties.filter(x => x != property)

    return (
        <Box>
            <Card style={cardStyle}>
                <Typography variant={"h6"}>Palette Maker Makes Palettes</Typography>
                <ColorValueSelector
                    title={'Base:'}
                    defaultSelected={baseSelection}
                    selectableOptions={exclude(variantSelection)}
                    onOptionChange={setBaseSelection}
                    onValueChange={x => {
                    }}/>
                <ColorValueSelector
                    title={'Variant:'}
                    defaultSelected={variantSelection}
                    selectableOptions={exclude(baseSelection)}
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
