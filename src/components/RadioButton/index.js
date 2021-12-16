import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function ControlledRadioButtonsGroup(props) {
  return (
    <FormControl component="fieldset">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="grid-first-name"
      >
        {props.translate?props.translate(`${props.label}`):props.label}
      </label>
      <RadioGroup
        aria-label="gender"
        row
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        {props.options &&
          props.options.map((opt) => (
            <FormControlLabel value={opt} control={<Radio />} label={props.translate?props.translate(`${opt}`):opt} />
          ))}
      </RadioGroup>
    </FormControl>
  );
}
