import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import * as React from 'react';
import './App.css';
import { BillSplit  } from './BillSplit'

class App extends React.Component {
  public render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Bill Split
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', paddingTop: '32px'}}>
          <BillSplit />
        </div>
      </div>
    );
  }
}

export default App;
