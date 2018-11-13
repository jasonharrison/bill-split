import * as React from 'react';
import moneyDecimalToString from './Helpers';
import { IItem } from './ItemFieldSet';

interface IResultSetProps {
  items: IItem[],
  names: string[],
}

export class Result extends React.Component<IResultSetProps> {
  public render() {
    const namesPaying = {};
    this.props.items.map((item: IItem, itemIndex: number) => {
      item.payingIndexes.map((payingIndex: number) => {
        const name = this.getNameByIndex(payingIndex);
        const perPersonCost = (item.price * item.quantity) / item.payingIndexes.length;
        if (name in namesPaying) {
          namesPaying[name].items.push(
            <p key={(itemIndex + "-" + payingIndex)}>
              <i>{item.quantity}x</i> {item.name}: <b>{moneyDecimalToString(perPersonCost)}</b>
            </p>);
          namesPaying[name].personTotal += perPersonCost
        } else {
          namesPaying[name] = { personTotal: perPersonCost, items: [<p key={(itemIndex + "-" + payingIndex)}><i>{item.quantity}x</i> {item.name}: <b>{moneyDecimalToString(perPersonCost)}</b></p>] };
        }
      });
    });
    return (
      <div>
        {
          Object.keys(namesPaying).map((key, index) => (
            <div key={key + " " + index}>
              <p><b>{key}</b>:</p>
              {namesPaying[key].items}
              <p><b>{key}'s</b> total: <b>{moneyDecimalToString(namesPaying[key].personTotal)}</b></p>
            </div>
          ))
        }
      </div>
    )
  }

  private getNameByIndex = (index: number) => {
    return this.props.names[index];
  }

}
