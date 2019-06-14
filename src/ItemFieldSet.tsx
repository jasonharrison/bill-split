import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Currencies, Money } from 'ts-money';
import moneyDecimalToString from './Helpers';
import { connect } from 'react-redux';
import { reduxSetItems } from './redux';
import { INITIAL_STATE } from './redux';
import { Redirect } from 'react-router';

import * as React from 'react';

export interface IItem {
  name: string;
  payingIndexes: number[]; // Indexes of people who will pay for this item
  price: number;
  quantity: number;
}

export interface IItemInternal {
  isFocused: boolean;
  name: string;
  payingIndexes: number[]; // Indexes of people who will pay for this item
  price: string;
  quantity: number;
}

interface IItemFieldSetProps {
  names: any;
  items: any;
  reduxSetItems: any;
  history: any;
}
interface IItemFieldSetState {
  items: IItemInternal[];
}

export class ItemFieldSet extends React.Component<IItemFieldSetProps, IItemFieldSetState> {
  public state = { items: this.props.items };
  public render() {
    if (this.props.names === INITIAL_STATE.names) {
      return <Redirect to="/" />;
    }
    const names = (itemIndex: number) =>
      this.props.names.map((name: string, nameIndex: number) => {
        return (
          <FormControlLabel
            key={itemIndex + '-' + nameIndex}
            control={
              <Checkbox
                checked={this.isPayingForItem(itemIndex, nameIndex)}
                onChange={this.payingForItemToggle(itemIndex, nameIndex)}
                value={name}
              />
            }
            label={name}
          />
        );
      });
    const splitBillButton = (
      <Button
        id="splitBtn"
        variant="contained"
        style={{ float: 'right' }}
        color="primary"
        onClick={this.setItems}
        disabled={!this.isValid()}
      >
        Split bill
        <NavigateNextIcon style={{ marginLeft: '8px' }} />
      </Button>
    );
    let addButton: JSX.Element;
    const backButton = (
      <Button id="backBtn" variant="contained" style={{ float: 'left' }} color="primary" onClick={this.goBackToNames}>
        <NavigateBeforeIcon style={{ marginRight: '8px' }} />
        Go Back
      </Button>
    );
    const itemsLength = this.state.items.length;
    const itemsArray = this.state.items.map((item: IItemInternal, itemIndex: number) => {
      let minusBtn = null;
      if (itemIndex > 0) {
        minusBtn = (
          <Button
            variant="contained"
            color="secondary"
            style={{ float: 'right', marginBottom: '16px' }}
            aria-label="Remove Item"
            onClick={this.remove(itemIndex)}
          >
            <RemoveCircleIcon style={{ marginRight: '8px' }} />
            Remove Item
          </Button>
        );
      }
      if (itemIndex === itemsLength - 1) {
        // last item
        addButton = (
          <Button variant="contained" color="secondary" aria-label="Add Item" onClick={this.add}>
            <AddCircleIcon style={{ marginRight: '8px' }} />
            Add Item
          </Button>
        );
      }
      const autoFocus = (itemsLength === 1 && itemIndex === 0) || (itemsLength > 1 && itemIndex === itemsLength - 1);
      return (
        <div key={itemIndex}>
          <Card key={itemIndex} style={{ marginTop: '16px', marginBottom: '16px' }}>
            <CardContent>
              <div>
                <TextField
                  type="text"
                  autoFocus={autoFocus}
                  label="Product Name"
                  value={item.name}
                  onChange={this.changeItemName(itemIndex)}
                />
              </div>
              <br />
              <div>
                <TextField
                  type="number"
                  label="Quantity"
                  value={this.getItemQuantityString(itemIndex)}
                  onChange={this.changeItemQuantity(itemIndex)}
                  onFocus={this.itemQtyToggleFocus(itemIndex, true)}
                  onBlur={this.itemQtyToggleFocus(itemIndex, false)}
                />
              </div>
              <br />
              <div>
                <TextField
                  type="text"
                  label="Price"
                  value={moneyDecimalToString(item.price, item.isFocused)}
                  onChange={this.changeItemPrice(itemIndex)}
                  onFocus={this.itemPriceToggleFocus(itemIndex, true)}
                  onBlur={this.itemPriceToggleFocus(itemIndex, false)}
                />
              </div>
              <br />
              <div>
                <FormLabel component="label">Who consumed</FormLabel>
                <FormGroup>{names(itemIndex)}</FormGroup>
              </div>
              {minusBtn}
              {addButton}
            </CardContent>
          </Card>
        </div>
      );
    });
    return (
      <div>
        <Typography variant="h5" component="h2">
          Describe Items
        </Typography>
        {itemsArray}
        {backButton}
        {splitBillButton}
      </div>
    );
  }

  private add = () => {
    const newItem: IItemInternal = { isFocused: false, name: '', payingIndexes: [], quantity: 1, price: '' };
    const items: IItemInternal[] = [...this.state.items, newItem];
    this.setState({ items });
  };

  private remove = (itemIndex: number) => () => {
    const items: IItemInternal[] = [...this.state.items];
    items.splice(itemIndex, 1);
    this.setState({ items });
  };

  private goBackToNames = () => {
    this.props.history.push('/');
  };
  private getItemQuantityString = (index: number) => {
    const quantity = this.state.items[index].quantity;
    if (this.state.items[index].isFocused && isNaN(quantity)) {
      return '';
    }
    if (isNaN(quantity)) {
      return '1';
    }
    return quantity.toString();
  };

  private moneyStringToDecimal = (money: string | null) => {
    if (money === null) {
      return NaN;
    }
    const removedDollarSign = money.replace(/[^\d.-]/g, '');
    return Money.fromDecimal(parseFloat(removedDollarSign), Currencies.USD, Math.round).toDecimal();
  };

  private changeItemName = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const items: IItemInternal[] = [...this.state.items];
    items[index].name = event.target.value;
    this.setState({ items });
  };

  private changeItemPrice = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const items: IItemInternal[] = [...this.state.items];
    const newPrice = event.target.value.replace(/[^0-9.]/, '');
    items[index].price = newPrice;
    this.setState({ items });
  };

  private changeItemQuantity = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const items: IItemInternal[] = [...this.state.items];
    const newQuantity = event.target.value.replace(/[^0-9]/, '');
    if (!this.isNumber(newQuantity)) {
      items[index] = { ...items[index], quantity: 1 };
    } else {
      items[index] = { ...items[index], quantity: parseInt(newQuantity, 10) };
    }
    this.setState({ items });
  };

  private itemPriceToggleFocus = (index: number, focused: boolean) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const items: IItemInternal[] = [...this.state.items];
    items[index] = { ...items[index], isFocused: focused };
    if (items[index].price === '') {
      return;
    }
    if (focused) {
      items[index].price = event.target.value.replace(/[^0-9]/, '');
    } else {
      const moneyStr = Money.fromDecimal(items[index].price, Currencies.USD, Math.round).toString();
      items[index].price = '$' + moneyStr;
    }
    this.setState({ items });
  };

  private itemQtyToggleFocus = (index: number, focused: boolean) => () => {
    const items: IItemInternal[] = [...this.state.items];
    items[index].isFocused = focused;
    if (!focused) {
      if (isNaN(items[index].quantity) || items[index].quantity === 0) {
        items[index] = { ...items[index], quantity: 1 };
      }
    }
    this.setState({ items });
  };

  private itemsArrayContainsAtLeastOneItem = () => {
    return (
      this.state.items[0].name !== '' &&
      this.state.items[0].quantity !== 0 &&
      this.state.items[0].price !== '' &&
      this.state.items[0].payingIndexes.length > 0
    );
  };

  private isEmptyOrSpaces = (s: string) => {
    if (s === undefined) {
      return true;
    }
    return s === null || s.match(/^ *$/) !== null;
  };

  private payingForItemToggle = (itemIdx: number, nameIdx: number) => () => {
    const items: IItemInternal[] = [...this.state.items];
    if (items[itemIdx].payingIndexes.indexOf(nameIdx) !== -1) {
      items[itemIdx] = {
        ...items[itemIdx],
        payingIndexes: items[itemIdx].payingIndexes.filter(index => index !== nameIdx),
      };
    } else {
      items[itemIdx] = {
        ...items[itemIdx],
        payingIndexes: [...items[itemIdx].payingIndexes, nameIdx],
      };
    }
    this.setState({ items });
  };

  private isPayingForItem = (itemIndex: number, nameIndex: number) => {
    const item: IItemInternal = this.state.items[itemIndex];
    return item.payingIndexes.indexOf(nameIndex) !== -1;
  };

  private isNumber = (value: string | number) => {
    return !isNaN(Number(value.toString()));
  };

  private isValid = () => {
    return this.itemsArrayContainsAtLeastOneItem();
  };

  private setItems = () => {
    const newItems: IItem[] = this.state.items
      .filter(
        (item: any) =>
          !this.isEmptyOrSpaces(item.name) &&
          !this.isEmptyOrSpaces(item.price) &&
          item.quantity > 0 &&
          item.payingIndexes.length > 0,
      )
      .map((item: IItemInternal) => {
        return {
          name: item.name,
          payingIndexes: item.payingIndexes,
          price: this.moneyStringToDecimal(item.price),
          quantity: item.quantity,
        };
      });
    this.props.reduxSetItems(newItems);
    this.props.history.push('/Result');
  };
}

// AppContainer.js
const mapStateToProps = (state: any) => ({
  names: state.names,
  items: state.items,
});

const mapDispatchToProps = {
  reduxSetItems,
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemFieldSet);

export default AppContainer;
