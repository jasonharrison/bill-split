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
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Currencies, Money } from 'ts-money';
import moneyDecimalToString from './Helpers';

import * as React from 'react';

export interface IItem {
  name: string,
  payingIndexes: number[], // Indexes of people who will pay for this item 
  price: number,
  quantity: number,
}

export interface IItemInternal {
  isFocused: boolean,
  name: string,
  payingIndexes: number[], // Indexes of people who will pay for this item 
  price: string,
  quantity: number,
}

interface IItemFieldSetProps {
  names: string[],
  setItems: (items: IItem[]) => void,
}
interface IItemFieldSetState {
  items: IItemInternal[],
}

export class ItemFieldSet extends React.Component<IItemFieldSetProps, IItemFieldSetState> {
  public state = {
    items: [
      {
        isFocused: false,
        name: "",
        payingIndexes: [],
        price: "",
        quantity: 1,
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
    const splitBillButton = (
      <Button id="splitBtn" variant="contained" color="primary" onClick={this.setItems} disabled={!this.isValid()}>
        Split bill
      </Button>);
    const addButton = (<IconButton style={{ float: 'right' }} iaria-label="Add " onClick={this.add}>
      <AddCircleIcon color="secondary" />
    </IconButton>);
    const itemsArray = this.state.items.map((item: IItemInternal, itemIndex: number) => {
      let minusBtn = null;
      if (itemIndex > 0) {
        minusBtn = (
          <IconButton aria-label="Remove item" onClick={this.remove(itemIndex)}>
            <RemoveCircleIcon style={{ height: '24px', width: '24px' }} />
          </IconButton>)
      }
      return (<div key={itemIndex}>
        <Card key={itemIndex}>
          <CardContent>
            <p>Describe Item Consumed</p>
            {minusBtn}
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
              <TextField type="number"
                value={this.getItemQuantityString(itemIndex)}
                onChange={this.changeItemQuantity(itemIndex)}
                onFocus={this.itemQuantityToggleFocus(itemIndex, true)}
                onBlur={this.itemQuantityToggleFocus(itemIndex, false)}
              />
            </div>
            <br />
            <div>
              <FormLabel component="legend">Price</FormLabel>
              <TextField type="text"
                value={moneyDecimalToString(item.price, item.isFocused)}
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
    const newItem: IItemInternal = { isFocused: false, name: "", payingIndexes: [], quantity: 1, price: "" }
    const items: IItemInternal[] = [...this.state.items, newItem];
    this.setState({ items });
  }

  private remove = (itemIndex: number) => (event: React.MouseEvent<HTMLElement>) => {
    const items: IItemInternal[] = [...this.state.items];
    items.splice(itemIndex, 1);
    this.setState({ items })
  }

  private getItemQuantityString = (index: number) => {
    const quantity = this.state.items[index].quantity;
    if (this.state.items[index].isFocused && isNaN(quantity)) {
      return "";
    }
    if (isNaN(quantity)) {
      return "1";
    }
    return quantity.toString()
  }

  private moneyStringToDecimal = (money: string | null) => {
    if (money === null) {
      return NaN;
    }
    const removedDollarSign = money.replace(/[^\d.-]/g, '');
    return Money.fromDecimal(parseFloat(removedDollarSign), Currencies.USD, Math.round).toDecimal();
  }

  private changeItemName = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const items: IItemInternal[] = [...this.state.items];
    items[index].name = event.target.value;
    this.setState({ items });
  }

  private changeItemPrice = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const items: IItemInternal[] = [...this.state.items];
    const newPrice = event.target.value.replace(/[^0-9.]/, '');
    items[index].price = newPrice;
    this.setState({ items });
  }

  private changeItemQuantity = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const items: IItemInternal[] = [...this.state.items];
    const newQuantity = event.target.value.replace(/[^0-9]/, '');
    if (!this.isNumber(newQuantity)) {
      items[index] = { ...items[index], quantity: 1 };
    } else {
      items[index] = { ...items[index], quantity: parseInt(newQuantity, 10) };
    }
    this.setState({ items });
  }

  private itemPriceToggleFocus = (index: number, focused: boolean) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const items: IItemInternal[] = [...this.state.items];
    items[index] = { ...items[index], isFocused: focused }
    if (items[index].price === "") {
      return;
    }
    if (focused) {
      items[index].price = event.target.value.replace(/[^0-9]/, '');
    } else {
      items[index].price = "$" + Money.fromDecimal(items[index].price, Currencies.USD, Math.round).toString();
    }
    this.setState({ items });
  }

  private itemQuantityToggleFocus = (index: number, focused: boolean) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const items: IItemInternal[] = [...this.state.items];
    items[index].isFocused = focused;
    if (!focused) {
      if (isNaN(items[index].quantity) || items[index].quantity === 0) {
        items[index] = { ...items[index], quantity: 1 }
      }
    }
    this.setState({ items });
  }

  private itemsArrayContainsAtLeastOneItem = () => {
    return this.state.items[0].name !== "" &&
      this.state.items[0].quantity !== 0 &&
      this.state.items[0].price !== "" &&
      this.state.items[0].payingIndexes.length > 0;
  }

  private isEmptyOrSpaces = (s: string) => {
    if (s === undefined) {
      return true;
    }
    return s === null || s.match(/^ *$/) !== null;
  }

  private isPayingForItemNameToggle = (itemIndex: number, nameIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const items: IItemInternal[] = [...this.state.items];
    if (items[itemIndex].payingIndexes.indexOf(nameIndex) !== -1) {
      items[itemIndex] = {
        ...items[itemIndex],
        payingIndexes: items[itemIndex].payingIndexes
          .filter(index => index !== nameIndex)
      };
    }
    else {
      items[itemIndex] = {
        ...items[itemIndex],
        payingIndexes: [...items[itemIndex].payingIndexes, nameIndex]
      };
    }
    this.setState({ items });
  }

  private isPayingForItem = (itemIndex: number, nameIndex: number) => {
    const item: IItemInternal = this.state.items[itemIndex];
    return item.payingIndexes.indexOf(nameIndex) !== -1
  }

  private isNumber = (value: string | number) => {
    return !isNaN(Number(value.toString()));
  }

  private isValid = () => {
    return this.itemsArrayContainsAtLeastOneItem();
  }

  private setItems = () => {
    const newItems: IItem[] = this.state.items.filter(item =>
      !this.isEmptyOrSpaces(item.name) &&
      !this.isEmptyOrSpaces(item.price) &&
      item.quantity > 0 &&
      item.payingIndexes.length > 0)
      .map((item: IItemInternal) => {
        return {
          name: item.name,
          payingIndexes: item.payingIndexes,
          price: this.moneyStringToDecimal(item.price),
          quantity: item.quantity,
        }
      });
    this.props.setItems(newItems);
  }
}
