import Typography from "@material-ui/core/Typography/Typography";
import { shallow } from 'enzyme';
import * as React from 'react';
import BillSplit from './BillSplit';

it('renders without crashing', () => {
  const wrapper = shallow(<BillSplit />);
  const welcome = <Typography component="p">Bill split is free, and it works offline.</Typography>;
  expect(wrapper.contains(welcome)).toEqual(true);
});