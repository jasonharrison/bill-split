import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import * as React from 'react';

export interface IItem {
  name: string,
  payingIndexes: number[], // Indexes of people who will pay for this item 
  price?: number,
  quantity: number,
}

interface IItemFieldSetProps {
  names: string[],
  setItems: (items: IItem[]) => void,
}
interface IItemFieldSetState {
 items: IItem[]
}

export class ItemFieldSet extends React.Component<IItemFieldSetProps, IItemFieldSetState> {
  public state = {
    items: [
      {
        name: "",
        payingIndexes: [],
        quantity: 1,
      }
    ]
  }

  public render() {
    const names = this.props.names.map((name: string) => {
      return (<p key={name}>{name}</p>);
    });
    return this.state.items.map((item: IItem, index: number) => {
      return (
        <Card key={index}>
          <CardContent> 
              <p>Describe Item Consumed</p>
              <div>
                <TextField type="text"
                           label="Product Name"
                           value={ item.name } 
                           onChange={ this.changeItemName(index) }
                />
              </div>
              <div>
                <TextField type="text"
                           label="Quantity"
                           value={ item.quantity } 
                           onChange={ this.changeItemQuantity(index) }
                />
              </div>
              {names}
          </CardContent>
        </Card>
      );
    });
  }

  private changeItemName = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) =>  {
    const items: IItem[] = [...this.state.items];
    items[index].name = event.target.value;
    this.setState({ items });
  }

  private changeItemQuantity = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) =>  {
    const items: IItem[] = [...this.state.items];
    items[index].quantity  = parseInt(event.target.value, 10);
    this.setState({ items });
  }
}
