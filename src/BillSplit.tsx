import * as React from 'react';
import { IItem, ItemFieldSet } from './ItemFieldSet';
import { NameFieldSet } from './NameFieldSet';
import { Result } from './Result';

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
      return (<NameFieldSet
        setNames={this.setNames}
      />);
    } else if (this.state.items.length === 0) {
      // Items page
      return (<ItemFieldSet
        names={this.state.names}
        setItems={this.setItems}
      />);
    } else {
      // Result page
      return (<Result
        names={this.state.names}
        items={this.state.items}
        reset={this.reset}
      />);
    }
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
  private reset = () => {
    this.setState({
      items: [],
      names: []
    });
  };
}

export default BillSplit;
