import * as React from 'react';
import { IItem } from './ItemFieldSet';

interface IResultSetProps {
  items: IItem[],
  names: string[],
}

export class Result extends React.Component<IResultSetProps> {
  public render() {
    const results = this.props.items.map((item: IItem, itemIndex: number) => {
      const payors = item.payingIndexes.map((payingIndex: number) => {
        const name = this.getNameByIndex(payingIndex);
        return (<p key={(itemIndex + "-" + payingIndex)}>{name}: <b>${item.price / item.payingIndexes.length}</b></p>);
      });
      return (
        <div key={itemIndex}>
          <p><b>{item.name}</b>:</p>
          {payors}
          <br />
        </div>);
    });
    return (<div>{results}</div>);
  }

  private getNameByIndex = (index: number) => {
    return this.props.names[index];
  }
}
