import { mount } from 'enzyme';
import * as React from 'react';
import BillSplit from './BillSplit';

it('renders without crashing', () => {
  const wrapper = mount(<BillSplit />);
  expect(wrapper).toBeTruthy();
});
