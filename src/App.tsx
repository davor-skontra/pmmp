import React, {CSSProperties, useEffect, useState} from 'react';
import './App.css';
import {Box, Card, Typography} from "@mui/material";
import ColorValueSelector from "./ColorValueSelector";
import {ColorProperty} from "./palette-engine";
import _ from 'lodash'

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
            <Card>
                <Typography variant={"h6"}>Palette Maker Makes Palettes</Typography>
                <ColorValueSelector
                    title={'Base:'}
                    defaultSelected={baseSelection}
                    selectableOptions={exclude(variantSelection)}
                    onOptionChange={setBaseSelection}
                    onValueChange={x => {}}/>
                <ColorValueSelector
                    title={'Variant:'}
                    defaultSelected={variantSelection}
                    selectableOptions={exclude(baseSelection)}
                    onOptionChange={setVariantSelection}
                    onValueChange={x => {}}/>
                <Typography variant={'body1'}>{constantSelection}</Typography>
            </Card>
        </Box>
    );
}

export default App;
