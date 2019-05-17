import AppBar from '@material-ui/core/AppBar';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

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
    return (
      <MuiThemeProvider theme={this.theme}>
        <div>
          <AppBar position='static'>
            <Toolbar>
              <Link to='/' style={{ textDecoration: 'none' }}>
                <Typography variant='h6' style={{color: 'white'}}>
                  Bill Split
                </Typography>
              </Link>
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
