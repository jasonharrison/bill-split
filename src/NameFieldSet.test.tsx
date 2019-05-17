import { shallow } from 'enzyme';
import { INameFieldSetState, NameFieldSet } from './NameFieldSet';
import { INITIAL_STATE } from './redux';

import * as React from 'react';

describe('NameFieldSet', () => {
  let mockHistory: object;
  let mockFunction: jest.Mock;
  let mockReduxSetNames: jest.Mock;
  beforeEach(async () => {
    mockHistory = {push: jest.fn()};
    mockFunction = jest.fn();
    mockReduxSetNames = jest.fn();
  });

  it('should have a disabled Split Bill button', () => {
    const names = INITIAL_STATE.names;
    const nameFieldSetWrapper = shallow(<NameFieldSet
      names={names}
      reduxSetNames={mockFunction}
      history={mockFunction}
      />);
    const splitBtn = nameFieldSetWrapper.find('#splitBtn');
    expect(splitBtn.props().disabled).toEqual(true);
  });

  it('should not have a disabled Split Bill button', () => {
    const names = INITIAL_STATE.names;
    const nameFieldSetWrapper = shallow(
      <NameFieldSet
        history={mockHistory}
        names={names}
        reduxSetNames={mockFunction}
      />);
    nameFieldSetWrapper.setState({ names: ['Jason', 'Vinny'] });
    const splitBtn = nameFieldSetWrapper.find('#splitBtn');
    expect(splitBtn.props().disabled).toEqual(false);
  });

  it('should ignore blank names', () => {
    const names = INITIAL_STATE.names;
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
    const nameFieldSetWrapper = shallow(
      <NameFieldSet
        names={names}
        reduxSetNames={mockReduxSetNames}
        history={mockHistory}
      />);
    nameFieldSetWrapper.setState({ names: ['Jason', 'Vinny', 'Vitor'] });
    const addBtn = nameFieldSetWrapper.find('#addBtn');
    addBtn.simulate('click');
    expect((nameFieldSetWrapper.state() as INameFieldSetState).names).toEqual(['Jason', 'Vinny', 'Vitor', '']);
  });
});
