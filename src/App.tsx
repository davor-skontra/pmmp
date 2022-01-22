import React, {CSSProperties, useEffect, useState} from 'react';
import './App.css';
import {Box, Card, Collapse, Typography} from "@mui/material";
import ColorPropertySelector from "./ColorPropertySelector";
import {calculateColors, ColorCalculationSettings, ColorProperty} from "./palette-engine";
import _ from 'lodash'
import ColorPropertyConstantSelector from "./ColorPropertyConstantSelector";
import ColorPropertyRange from "./color-property-range";

const cardStyle: CSSProperties = {
    margin: '10pt',
    padding: '20pt',
    display: 'flex',
    gap: '10pt'
}

function App() {
    
    const maxFor = (property: ColorProperty) => property === ColorProperty.Hue ? 359 : 100

    const [baseSelection, setBaseSelection] = useState(ColorProperty.Hue)
    const [baseValue, setBaseValue] = useState(3)
    const [baseRange, setBaseRange] = useState(new ColorPropertyRange(0, maxFor(baseSelection)))
    
    const [variantSelection, setVariantSelection] = useState(ColorProperty.Brightness)
    const [variantValue, setVariantValue] = useState(3)
    const [variantRange, setVariantRange] = useState(new ColorPropertyRange(0, maxFor(variantSelection)))

    const [constantSelection, setConstantSelection] = useState(ColorProperty.Saturation)
    const [constantValue, setConstantValue] = useState(50) // Middle value (between 0 and 100) for constant
    
    
    const settings: ColorCalculationSettings = {
        baseColorProperty: baseSelection,
        baseValue: baseValue,
        variantColorProperty: variantSelection,
        variantValue: variantValue,
        constantColorProperty: constantSelection,
        constantValue: constantValue,
        baseMax: baseRange.max,
        baseMin: baseRange.min,
        variantMax: variantRange.max,
        variantMin: variantRange.min,
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
                <ColorPropertySelector
                    title={'Base:'}
                    defaultSelected={baseSelection}
                    defaultValue={baseValue}
                    onOptionChange={setBaseSelection}
                    onValueChange={setBaseValue}
                    possibleMax={maxFor(baseSelection)}
                    defaultSelectedRange={new ColorPropertyRange(0, maxFor(baseSelection))} 
                    onRangeChange={r => setBaseRange(r)}
                />
                <ColorPropertySelector
                    title={'Variant:'}
                    defaultSelected={variantSelection}
                    defaultValue={variantValue}
                    onOptionChange={setVariantSelection}
                    onValueChange={setVariantValue}
                    possibleMax={maxFor(variantSelection)}
                    defaultSelectedRange={new ColorPropertyRange(0, maxFor(variantSelection))}
                    onRangeChange={r => setVariantRange(r)}
                />
                <ColorPropertyConstantSelector
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
                    <Box style={{display: 'flex', flexDirection: 'row', width: "1000%", flexWrap: 'wrap'}}>
                        {colors.map(c => <div style={{...colorFieldStyle, backgroundColor: c}}/>)}
                    </Box>
                </Card>
            </Collapse>
        </Box>
    );
}

export default App;
