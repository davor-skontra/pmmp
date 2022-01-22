import {Checkbox, CheckboxProps, FormControlLabel, FormGroup} from "@mui/material";

type LabeledCheckboxProps = CheckboxProps & {
    label: string
}

export default function LabeledCheckbox(p: LabeledCheckboxProps){
    return(
        <FormGroup>
            <FormControlLabel control={<Checkbox {...p} />} label={p.label} />
        </FormGroup>
    )
}