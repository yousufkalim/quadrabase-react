import * as React from 'react';
import frLocale from 'date-fns/locale/fr';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { makeStyles } from '@mui/styles';
import FormHelperText from '@mui/material/FormHelperText';

const localeMap = {
  fr: frLocale,
};

export default function LocalizedDatePicker(props) {
  const useStyles = makeStyles((theme) => ({
    TextField: {
      padding: props.padding,
      width: props.width,
      height: props.height ? props.height : 50,
    },
    helper: {},
  }));
  const classes = useStyles();
  const [locale, setLocale] = React.useState('fr');

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeMap[locale]}>
      <DatePicker
        label={props.label}
        shrink={false}
        value={props.value}
        disabled={props.disabled === true ? true : false}
        maxDate={props.maxDate}
        minDate={props.minDate}
        shouldDisableDate={props.shouldDisableDate}
        shouldDisableYear={props.shouldDisableYear}
        inputFormat="dd-MM-yyyy"
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
              borderRadius: '30px',
              fontStyle: 'initial',
              boxShadow: '',
            }}
            InputLabelProps={{
              shrink: true,
              style: { color: '#3b373c' },
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
    </LocalizationProvider>
  );
}
