import * as React from 'react';
import { Currencies, Money } from 'ts-money';
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
          namesPaying[name].items.push(<p key={(itemIndex + "-" + payingIndex)}><i>{item.quantity}x</i> {item.name}: <b>{this.moneyDecimalToString(perPersonCost)}</b></p>);
          namesPaying[name].personTotal += perPersonCost
        } else {
          namesPaying[name] = { personTotal: perPersonCost, items: [<p key={(itemIndex + "-" + payingIndex)}><i>{item.quantity}x</i> {item.name}: <b>{this.moneyDecimalToString(perPersonCost)}</b></p>] };
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
              <p><b>{key}'s</b> total: <b>{this.moneyDecimalToString(namesPaying[key].personTotal)}</b></p>
            </div>
          ))
        }
      </div>
    )
  }

  private getNameByIndex = (index: number) => {
    return this.props.names[index];
  }

  private moneyDecimalToString = (money: number | string | undefined | null, isFocused?: boolean) => {
    if (typeof (money) === "string") {
      return money;
    }
    if (money === undefined || money === 0 || money === null || isNaN(money)) {
      return "";
    }
    if (isFocused) {
      return money.toString();
    }
    return "$" + Money.fromDecimal(money, Currencies.USD, Math.round).toString();
  }

}
