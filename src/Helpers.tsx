import { Currencies, Money } from 'ts-money';

const moneyDecimalToString = (money: number | string | undefined | null, isFocused?: boolean) => {
  if (typeof (money) === 'string') {
    return money;
  }
  if (!money) {
    return '';
  }
  if (isFocused) {
    return money.toString();
  }
  return '$' + Money.fromDecimal(money, Currencies.USD, Math.round).toString();
};

export default moneyDecimalToString;
