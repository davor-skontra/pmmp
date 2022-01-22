import React, {CSSProperties, useEffect, useState} from 'react';
import './App.css';
import {Box, Card, Collapse, Typography} from "@mui/material";
import ColorPropertySelectorWithTextField from "./ColorPropertySelectorWithTextField";
import {calculateColors, ColorCalculationSettings, ColorProperty} from "./palette-engine";
import _ from 'lodash'
import ColorValueSlider from "./ColorPropertySelectorWithSlider";

const cardStyle: CSSProperties = {
    margin: '10pt',
    padding: '20pt',
    display: 'flex',
    gap: '10pt'
}

function App() {
    const [baseSelection, setBaseSelection] = useState(ColorProperty.Hue)
    const [variantSelection, setVariantSelection] = useState(ColorProperty.Brightness)
    const [constantSelection, setConstantSelection] = useState(ColorProperty.Saturation)
    const [baseValue, setBaseValue] = useState(3)
    const [variantValue, setVariantValue] = useState(3)
    const [constantValue, setConstantValue] = useState(50) // Middle value (between 0 and 100) for constant
    
    const maxFor = (property: ColorProperty) => property === ColorProperty.Hue ? 359 : 100
    
    const settings: ColorCalculationSettings = {
        baseColorProperty: baseSelection,
        baseValue: baseValue,
        variantColorProperty: variantSelection,
        variantValue: variantValue,
        constantColorProperty: constantSelection,
        constantValue: constantValue,
        baseMax: maxFor(baseSelection),
        baseMin: 0,
        variantMax: maxFor(variantSelection),
        variantMin: 0,
    }
    
    const amountOfColorProperties = 3
    const allSelections = [baseSelection, variantSelection, constantSelection]
    let selectionsAreValid = _.uniq(allSelections).length === amountOfColorProperties
    let colors: string[] = []
    
    if (selectionsAreValid) {
        colors = calculateColors(settings)
        selectionsAreValid = !_.isEmpty(colors)
    }
    
    useEffect(() => {
        document.title = "pmmp - Make Palettes"
    });
    
    const colorFieldStyle: CSSProperties = {
        width: `${(100.0 / baseValue)}%`,
        height: '30pt'
    }
    return (
        <Box>
            <Card style={cardStyle}>
                <Typography variant={"h6"}>Palette Maker Makes Palettes</Typography>
            </Card>
            <Card style={{...cardStyle, flexDirection: 'column'}}>
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
                    max={maxFor(constantSelection)}
                    step={1}
                />
            </Card>
            <Collapse in={selectionsAreValid}>
                <Card style={cardStyle}>
                    <Box style={{display: 'flex', flexDirection: 'row', width: "100%", flexWrap: 'wrap'}}>
                        {colors.map(c => <div style={{...colorFieldStyle, backgroundColor: c}}/>)}
                    </Box>
                </Card>
            </Collapse>
        </Box>
    );
}

export default App;
