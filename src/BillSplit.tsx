import * as React from 'react';
import { IItem, ItemFieldSet } from './ItemFieldSet';
import { NameFieldSet } from './NameFieldSet';
import { Result } from './Result';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

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

  public render = () => {
    return (<Router>
      <div>
      <Route path="/" exact render={() => <NameFieldSet setNames={this.setNames} /> } />
      <Route path="/Items" render={() => <ItemFieldSet names={this.state.names} setItems={this.setItems} /> } />
      <Route path="/Result" render={() => <Result names={this.state.names} items={this.state.items} reset={this.reset} /> } />
    </div>
    </Router>)
  }

  private setNames = (names: string[]) => {
    this.setState({
      ...this.state,
      names
    });
    return <Redirect push to="/Items" />
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
