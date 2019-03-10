import Button from '@material-ui/core/Button';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import moneyDecimalToString from './Helpers';
import { IItem } from './ItemFieldSet';

interface IResultSetProps {
  items: IItem[],
  names: string[],
  reset: () => void,
}

export class Result extends React.Component<IResultSetProps> {
  public render() {
    const namesPaying: any = {};
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
          namesPaying[name] = {
            items: [
              <p key={(itemIndex + "-" + payingIndex)}>
                <i>{item.quantity}x</i> {item.name}: <b>{moneyDecimalToString(perPersonCost)}</b>
              </p>
            ],
            personTotal: perPersonCost
          };
        }
      });
    });
    const resetButton = (
      <Button variant="contained" color="primary" onClick={this.reset}>
        <NavigateBeforeIcon style={{ marginRight: '8px' }} />
        Start again
      </Button>
    );
    return (
      <div>
        {
          Object.keys(namesPaying).map((key, index) => (
            <Card key={key + " " + index} style={{ marginBottom: '16px' }}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {key}
                </Typography>
                {namesPaying[key].items}
                <p><b>{key}'s</b> total: <b>{moneyDecimalToString(namesPaying[key].personTotal)}</b></p>
              </CardContent>
            </Card>
          ))
        }
        {resetButton}
      </div>
    )
  }

  private reset = () => {
    this.props.reset();
  }

  private getNameByIndex = (index: number) => {
    return this.props.names[index];
  }

}
