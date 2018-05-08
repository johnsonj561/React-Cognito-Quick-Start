import { createMuiTheme } from 'material-ui/styles';
// import orange from 'material-ui/colors/orange';


const theme = createMuiTheme({
  // palette: {
  //   primary: orange
  // },
  overrides: {
    MuiTableCell: {
      root: {
        padding: '4px 10px 4px 10px'
      }
    },
    MuiFormHelperText: {
      error: {
        position: 'absolute',
        bottom: '-17px',
        right: 0
      }
    }
  }
});

export default theme;

