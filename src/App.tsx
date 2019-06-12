import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import * as React from 'react';
import './App.css';
import { BillSplit } from './BillSplit';

class App extends React.Component<any, any> {

  public render() {
    const devMode = process.env.NODE_ENV === 'development';
    const version = process.env.REACT_APP_VERSION;
    let devVersionJSX;
    if (devMode) {
      devVersionJSX = (
        <Typography variant="body2" color="inherit" style={{ marginLeft: 'auto' }}>
          {version}
        </Typography>
      );
    }
    return (
        <div>
          <AppBar position="static">
            <Toolbar>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography variant="h6" style={{ color: 'white' }}>
                  Bill Split
                </Typography>
              </Link>
              {devVersionJSX}
            </Toolbar>
          </AppBar>
          <div
            style={{
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
    );
  }
}

export default App;
