import React, {CSSProperties, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Box, Card, Typography} from "@mui/material";
import ColorValueSelector from "./ColorValueSelector";
import {ColorProperty, ColorPropertyNames} from "./palette-engine";

function App() {
    useEffect(() => {
        document.title = "pmmp - Make Palettes"
    });

    return (
        <Box>
            <Card>
                <Typography variant={"h6"}>Palette Maker Makes Palettes</Typography>
                <ColorValueSelector title={'Base:'} defaultSelected={'Hue' as unknown as ColorProperty} selectableOptions={ColorPropertyNames.filter(x => true)} onOptionChange={x => {}} onValueChange={x => {}}/>
                <ColorValueSelector title={'Variant:'} defaultSelected={'Saturation' as unknown as ColorProperty} selectableOptions={ColorPropertyNames.filter(x => true)} onOptionChange={x => {}} onValueChange={x => {}}/>
            </Card>
        </Box>
    );
}

export default App;
