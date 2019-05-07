import { shallow } from 'enzyme';
import { INameFieldSetState, NameFieldSet } from './NameFieldSet';
import { INITIAL_STATE } from './redux';
import { createMemoryHistory } from 'history';

import * as React from 'react';

it('should have a disabled Split Bill button', () => {
  const mockFunction = jest.fn();
  const names = INITIAL_STATE.names;
  const nameFieldSetWrapper = shallow(<NameFieldSet
    names={names}
    reduxSetNames={mockFunction}
    />);
  const splitBtn = nameFieldSetWrapper.find('#splitBtn');
  expect(splitBtn.props().disabled).toEqual(true);
});

it('should not have a disabled Split Bill button', () => {
  const mockFunction = jest.fn();
  const names = INITIAL_STATE.names;
  const nameFieldSetWrapper = shallow(<NameFieldSet names={names} reduxSetNames={mockFunction} />);
  nameFieldSetWrapper.setState({ names: ['Jason', 'Vinny'] });
  const splitBtn = nameFieldSetWrapper.find('#splitBtn');
  expect(splitBtn.props().disabled).toEqual(false);
});

it('should ignore blank names', () => {
  const mockFunction = jest.fn();
  const names = INITIAL_STATE.names;
  const mockHistory = {push: jest.fn()};
  const nameFieldSetWrapper = shallow(<NameFieldSet
    names={names}
    reduxSetNames={mockFunction}
    history={mockHistory}
    />);
  nameFieldSetWrapper.setState({ names: ['Jason', 'Vinny', '', 'Vitor', ' '] });
  const splitBtn = nameFieldSetWrapper.find('#splitBtn');
  splitBtn.simulate('click');
  expect((nameFieldSetWrapper.state() as INameFieldSetState).names).toEqual(['Jason', 'Vinny', 'Vitor']);
});

it('should add a name', () => {
  const names = INITIAL_STATE.names;
  const nameFieldSetWrapper = shallow(<NameFieldSet names={names} />);
  nameFieldSetWrapper.setState({ names: ['Jason', 'Vinny', 'Vitor'] });
  const addBtn = nameFieldSetWrapper.find('#addBtn');
  addBtn.simulate('click');
  expect((nameFieldSetWrapper.state() as INameFieldSetState).names).toEqual(['Jason', 'Vinny', 'Vitor', '']);
});
