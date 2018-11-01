import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import * as React from 'react';
import { IItem, ItemFieldSet } from './ItemFieldSet';
import { NameFieldSet } from './NameFieldSet';

interface IBillSplitState {
  names: string[],
  items: IItem[],
}

/** This component should hold the overall application state and manage which page to show. */
export class BillSplit extends React.Component<{}, IBillSplitState>  {
  public state = {
    items: [],
    names: []
  }

  public render() {
    if (this.state.names.length === 0) {
      // Insert names page
      return (
        <div>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Easily split a restaurant or bar bill.
              </Typography>
              <Typography component="p">
                Bill split is free, and it works offline.
              </Typography>
            </CardContent>
          </Card>
          <div style={{marginTop: '16px'}}>
            <NameFieldSet setNames={this.setNames} />
          </div>
        </div>
      );
    }
    // Items page
    return (<ItemFieldSet 
              names={this.state.names}
              setItems={this.setItems}
            />);
  }

  private setNames = (names: string[]) => {
    this.setState({
      ...this.state,
      names
    });
  }

  private setItems = (items: IItem[]) => {
    this.setState({
      ...this.state,
      items
    });
  }
}

export default BillSplit;