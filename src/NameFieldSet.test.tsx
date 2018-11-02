import { shallow } from 'enzyme';
import * as React from 'react';
import NameFieldSet from './NameFieldSet';

it('should have a disabled Split Bill button', () => {
    const mockFunction = jest.fn();
    const nameFieldSetWrapper = shallow(<NameFieldSet setNames={mockFunction} />);
    const splitBtn = nameFieldSetWrapper.find('#splitBtn');
    expect(splitBtn.props().disabled).toEqual(true);
  });

it('should not have a disabled Split Bill button', () => {
  const mockFunction = jest.fn();
  const nameFieldSetWrapper = shallow(<NameFieldSet setNames={mockFunction} />);
  nameFieldSetWrapper.setState({names: ["Jason", "Vinny"]});
  const splitBtn = nameFieldSetWrapper.find('#splitBtn');
  expect(splitBtn.props().disabled).toEqual(false);
});

it('should ignore blank names', () => {
  const mockFunction = jest.fn();
  const nameFieldSetWrapper = shallow(<NameFieldSet setNames={mockFunction} />);
  nameFieldSetWrapper.setState({names: ["Jason", "Vinny", "", "Vitor", " "]});
  const splitBtn = nameFieldSetWrapper.find('#splitBtn');
  splitBtn.simulate('click');
  expect(nameFieldSetWrapper.state().names).toEqual(["Jason", "Vinny", "Vitor"]);
});
