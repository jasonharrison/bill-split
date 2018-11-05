import * as React from 'react';
import { IItem } from './ItemFieldSet';

interface IResultState {
  names: string[],
  items: IItem[],
}

interface IResultSetProps {
  items: IItem[],
}

export class Result extends React.Component<IResultSetProps, IResultState> {
  public state = {
    items: [],
    names: []
  }

  public render() {
    return (<p>{JSON.stringify(this.props.items)}</p>)
  }
}
