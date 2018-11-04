import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Currencies, Money } from 'ts-money';

import * as React from 'react';

export interface IItem {
  isFocused: boolean,
  name: string,
  payingIndexes: number[], // Indexes of people who will pay for this item 
  price: string,
  quantity: string
}

interface IItemFieldSetProps {
  names: string[],
  setItems: (items: IItem[]) => void,
}
interface IItemFieldSetState {
  items: IItem[],
}

export class ItemFieldSet extends React.Component<IItemFieldSetProps, IItemFieldSetState> {
  public state = {
    items: [
      {
        isFocused: false,
        name: "",
        payingIndexes: [],
        price: "",
        quantity: "1",
      }
    ]
  }

  public render() {
    const names = (itemIndex: number) => this.props.names.map((name: string, nameIndex: number) => {
      return (<FormControlLabel
        key={(itemIndex + "-" + nameIndex)}
        control={
          <Checkbox checked={this.isPayingForItem(itemIndex, nameIndex)} onChange={this.isPayingForItemNameToggle(itemIndex, nameIndex)} value={name} />
        }
        label={name}
      />
      )
    });
    const splitBillButton = (<Button id="splitBtn" variant="contained" color="primary" onClick={this.setItems} disabled={!this.isValid()}>
      Split bill
		</Button>);
    const addButton = (<IconButton style={{ float: 'right' }} iaria-label="Add " onClick={this.add}>
      <AddCircleIcon color="secondary" />
    </IconButton>);
    const itemsArray = this.state.items.map((item: IItem, itemIndex: number) => {
      return (<div key={itemIndex}>
        <Card key={itemIndex}>
          <CardContent>
            <p>Describe Item Consumed</p>
            <div>
              <TextField type="text"
                label="Product Name"
                value={item.name}
                onChange={this.changeItemName(itemIndex)}
              />
            </div>
            <br />
            <div>
              <FormLabel component="legend">Quantity</FormLabel>
              <TextField type="text"
                value={item.quantity}
                onChange={this.changeItemQuantity(itemIndex)}
                onFocus={this.itemQuantityToggleFocus(itemIndex, true)}
                onBlur={this.itemQuantityToggleFocus(itemIndex, false)}
              />
            </div>
            <br />
            <div>
              <FormLabel component="legend">Price</FormLabel>
              <TextField type="text"
                value={item.price}
                onChange={this.changeItemPrice(itemIndex)}
                onFocus={this.itemPriceToggleFocus(itemIndex, true)}
                onBlur={this.itemPriceToggleFocus(itemIndex, false)}
              />
            </div>
            <br />
            <div>
              <FormLabel component="legend">Who consumed</FormLabel>
              <FormGroup>
                {names(itemIndex)}
              </FormGroup>
            </div>
          </CardContent>
        </Card>
      </div>
      );
    });
    return (<div>{itemsArray}{splitBillButton}{addButton}</div>)
  }

  private add = () => {
    const newItem: IItem = { isFocused: false, name: "", payingIndexes: [], quantity: "1", price: "" }
    const items: IItem[] = [...this.state.items, newItem];
    this.setState({ items });
  }

  private changeItemName = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const items: IItem[] = [...this.state.items];
    items[index].name = event.target.value;
    this.setState({ items });
  }

  private changeItemPrice = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const items: IItem[] = [...this.state.items];
    const newPrice = event.target.value.replace(/[^0-9.]/, '');
    items[index].price = newPrice;
    this.setState({ items });
    this.props.setItems(this.state.items);
  }

  private changeItemQuantity = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const items: IItem[] = [...this.state.items];
    const newQuantity = event.target.value.replace(/[^0-9]/, '');
    if (!this.isNumber(newQuantity)) {
      return
    }
    items[index].quantity = newQuantity;
    this.setState({ items });
    this.props.setItems(this.state.items);
  }

  private itemPriceToggleFocus = (index: number, focused: boolean) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const items: IItem[] = [...this.state.items];
    items[index].isFocused = focused;
    const removedDollarSign = items[index].price.replace(/[^\d.-]/g, '');
    if (removedDollarSign === "") {
      return;
    }
    if (focused) {
      items[index].price = Money.fromDecimal(parseFloat(removedDollarSign), Currencies.USD, Math.round).toString();
    } else {
      items[index].price = "$" + Money.fromDecimal(parseFloat(items[index].price), Currencies.USD, Math.round).toString();
    }
    this.setState({ items });
  }

  private itemQuantityToggleFocus = (index: number, focused: boolean) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const items: IItem[] = [...this.state.items];
    items[index].isFocused = focused;
    if (!focused && items[index].quantity === "") {
      items[index].quantity = "1"
    }
    this.setState({ items });
  }

  private isPayingForItemNameToggle = (itemIndex: number, nameIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const items: IItem[] = [...this.state.items];
    if (items[itemIndex].payingIndexes.indexOf(nameIndex) !== -1) {
      items[itemIndex].payingIndexes.splice(nameIndex, 1);
    }
    else {
      items[itemIndex].payingIndexes.push(nameIndex);
    }
    this.setState({ items });
  }

  private isPayingForItem = (itemIndex: number, nameIndex: number) => {
    const item: IItem = this.state.items[itemIndex];
    return item.payingIndexes.indexOf(nameIndex) !== -1
  }

  private isNumber = (value: string | number) => {
    return !isNaN(Number(value.toString()));
  }

  private isValid = () => {
    return true;
  }

  private setItems = () => {
    const newItems = [...this.state.items];
    this.setState({ items: newItems });
    this.props.setItems(this.state.items);
  }

}
