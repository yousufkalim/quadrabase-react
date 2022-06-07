import * as React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { makeStyles } from "@mui/styles";
import FormHelperText from "@mui/material/FormHelperText";
export default function BasicDatePicker(props) {
  const useStyles = makeStyles((theme) => ({
    TextField: {
      padding: props.padding,
      width: props.width,
      height: props.height ? props.height : 50,
    },
    helper: {},
  }));
  const classes = useStyles();
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <div>
        <DatePicker
          label={props.label}
          shrink={false}
          value={props.value}
          disabled={props.disabled === true ? true : false}
          maxDate={props.maxDate}
          minDate={props.minDate}
          shouldDisableDate={props.shouldDisableDate}
          shouldDisableYear={props.shouldDisableYear}
          inputFormat="DD-MM-YYYY"
          InputProps={{
            style: {
              height: props.height ? props.height : 38,
            },
          }}
          sx={{ height: 38 }}
          onChange={props.onChange}
          renderInput={(params) => (
            <TextField
              {...params}
              className={classes.TextField}
              sx={{
                borderRadius: "30px",
                fontStyle: "initial",
                boxShadow: "",
              }}
              InputLabelProps={{
                shrink: true,
                style: { color: "#3b373c" },
              }}
              error={props.error ? true : false}
            >
              {props.error && (
                <FormHelperText className={classes.helper} {...props.helperProps}>
                  {props.ErrorMsg}
                </FormHelperText>
              )}
            </TextField>
          )}
          {...props.datePickerProps}
        />
      </div>
    </LocalizationProvider>
  );
}
