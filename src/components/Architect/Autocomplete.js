import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox(props) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={props.options}
      getOptionLabel={(option) => option?.establishment}
      defaultValue={props.defaultValue}
      onChange={(event, value) => props.setValue(value._id)}
      fullWidth
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          type="text"
          InputLabelProps={{
            shrink: true,
            style: { color: "#3b373c" },
          }}
          InputProps={{
            style: {
              height: props.height ? props.height : 38,
            },
          }}
          required={props.required}
          value={props.textValue}
          fullWidth
          onChange={(e) => {
            props.setValue("");
            props.setTextValue(e.target.value);
          }}
        />
      )}
    />
  );
}
