// init
import { makeStyles } from '@mui/styles';

// makeStyles from material UI for styling
export const useStyles = makeStyles({
  main_container: {
    position: 'relative',
    overflowX: 'hidden',
    height: '100vh',
    backgroundColor: '#eeeeee'
  },
  container: {
    padding: '10px 20px',
    height: '100vh'
  },
  flex_container: {
    display: 'flex',
    justifyContent: 'space-between',
    whiteSpace: 'nowrap'
  },
  btn: {
    backgroundColor: '#3b373c !important',
    marginRight: '10px !important',
    height: '35px !important',
    borderRadius: 10
  },
  left_container: {
    width: '400px',
    marginTop: 20
  },
  right_container: {
    width: '100%',
    marginTop: 20,
    paddingLeft: 20,
    ['@media (max-width:1300px)']: {
      // eslint-disable-line no-useless-computed-key
      overflowX: 'scroll'
    }
  },
  fotter_text: {
    width: '70%',
    ['@media (max-width:1215px)']: {
      // eslint-disable-line no-useless-computed-key
      width: '48%'
    },
    ['@media (max-width:1040px)']: {
      // eslint-disable-line no-useless-computed-key
      width: '15%'
    },
    ['@media (max-width:870)']: {
      // eslint-disable-line no-useless-computed-key
      width: '0%'
    },
    display: 'flex',
    justifyContent: 'flex-end'
  },
  fotter_amount: {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  }
});
