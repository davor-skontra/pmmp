import React, {CSSProperties, useEffect, useRef, useState} from 'react';
import './App.css';
import {Box, Card, Collapse, Fab, Paper, Slide, Switch, Typography} from "@mui/material";
import ColorPropertySelector from "./ColorPropertySelector";
import {calculateColors, ColorCalculationSettings, ColorColumn, ColorProperty} from "./palette-engine";
import _ from 'lodash'
import ColorPropertyConstantSelector from "./ColorPropertyConstantSelector";
import ColorPropertyRange from "./color-property-range";
import LabeledCheckbox from "./LabeledCheckbox";
import {SaveAs} from "@mui/icons-material";

const cardStyle: CSSProperties = {
    margin: '10pt',
    padding: '20pt',
    display: 'flex',
    gap: '10pt'
}

function App() {
    const maxFor = (property: ColorProperty) => property == ColorProperty.Hue ? 359 : 100;

    const baseDefaultRange = new ColorPropertyRange(0, 300)
    const [baseSelection, setBaseSelection] = useState(ColorProperty.Hue)
    const [baseValue, setBaseValue] = useState(6)
    const [baseRange, setBaseRange] = useState(baseDefaultRange)

    const variantDefaultRange = new ColorPropertyRange(20, 80)
    const [variantSelection, setVariantSelection] = useState(ColorProperty.Brightness)
    const [variantValue, setVariantValue] = useState(12)
    const [variantRange, setVariantRange] = useState(variantDefaultRange)

    const [constantSelection, setConstantSelection] = useState(ColorProperty.Saturation)
    const [constantValue, setConstantValue] = useState(50) // Middle value (between 0 and 100) for constant
    
    const [showDebugValues, setShowDebugValues] = useState(false)
    const colors = useRef<ColorColumn[]>([])
    
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
    
    if (selectionsAreValid) {
        colors.current = calculateColors(settings)
        selectionsAreValid = !_.isEmpty(colors)
    }
    
    useEffect(() => {
        document.title = 'pmmp - Make Palettes'
    });
    
    const colorFieldStyle: CSSProperties = {
        height: `30pt`,
        width: `100%`
    }
    
    const fabStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        gap: '10pt',
        width: '150pt',
        marginLeft: '10pt'
    }
    
    const validSelectionTransition = (delayWhen: boolean) : CSSProperties => ({
        transitionDelay: (delayWhen ? '300ms' : '0ms'),
        transitionDuration: '100ms'
    })
    
    return (
        <Box>
            <Card style={{...cardStyle, flexDirection: 'column'}}>
                <Typography variant={"h6"}>Palette Maker Makes Palettes</Typography>
                <Box style={{display: 'flex', flexDirection: 'row', gap: '10pt'}}>
                    <LabeledCheckbox defaultChecked={showDebugValues} label={'Show Debug Values'} onChange={(e, v) => setShowDebugValues(v)}/>
                </Box>
            </Card>
            <Card style={{...cardStyle, flexDirection: 'column', justifyContent: 'space-evenly'}}>
                <ColorPropertySelector
                    title={'Base:'}
                    defaultSelected={baseSelection}
                    defaultValue={baseValue}
                    onOptionChange={setBaseSelection}
                    onValueChange={setBaseValue}
                    defaultSelectedRange={baseDefaultRange} 
                    onRangeChange={r => setBaseRange(r)}
                    range={new ColorPropertyRange(0, maxFor(baseSelection))}
                />
                <ColorPropertySelector
                    title={'Variant:'}
                    defaultSelected={variantSelection}
                    defaultValue={variantValue}
                    onOptionChange={setVariantSelection}
                    onValueChange={setVariantValue}
                    defaultSelectedRange={variantDefaultRange}
                    onRangeChange={r => setVariantRange(r)}
                    range={new ColorPropertyRange(0, maxFor(variantSelection))}/>
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
                <Collapse in={showDebugValues}>
                    <Card variant={'outlined'} style={{...cardStyle, margin: 0, flexDirection: 'column'}}>
                        <Typography>{`Base: ${baseValue} | Variant: ${variantValue} | Constant: ${constantValue}`}</Typography>
                        <Typography>{`B Min: ${settings.baseMin} | B Max: ${settings.baseMax} | V Min: ${settings.variantMin} | V Max: ${settings.variantMax}`}</Typography>
                    </Card>
                </Collapse>
            </Card>
            <Slide direction='right' in={selectionsAreValid} mountOnEnter unmountOnExit style={validSelectionTransition(!selectionsAreValid)}>
                <Card style={cardStyle}>
                    <Box style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                        {colors.current.map(r =>
                            <div style={{display: 'flex', flexDirection: 'column', width: "100%", flexWrap: 'wrap'}}>
                                {r.colors.flatMap(c => (<div style={{...colorFieldStyle, backgroundColor: c.hex()}}/>))}
                            </div>
                        )}
                    </Box>
                </Card>
            </Slide>
            <Slide direction='right' in={selectionsAreValid} mountOnEnter unmountOnExit style={validSelectionTransition(selectionsAreValid)}>
                <Fab variant='extended' color='secondary' style={fabStyle}>
                    <SaveAs/>
                    Export Palette
                </Fab>
            </Slide>
        </Box>
    );
}

export default App;
