import AppBar from '@material-ui/core/AppBar';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import * as React from 'react';
import './App.css';
import { BillSplit } from './BillSplit';

class App extends React.Component<any, any> {
  public theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
  });

  public render() {
    const circleVersionInfo = null; // for CircleCI
    return (
      <MuiThemeProvider theme={this.theme}>
        <div>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h6' color='inherit'>
                Bill Split
              </Typography>
              <Typography variant='body2' color='inherit' style={{ marginLeft: 'auto' }}>
                {circleVersionInfo}
              </Typography>
            </Toolbar>
          </AppBar>
          <div style={{
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '16px',
            paddingTop: '32px',
          }}
          >
            <BillSplit />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;