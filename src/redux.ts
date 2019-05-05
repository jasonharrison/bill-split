import { combineReducers, createStore } from 'redux';

// actions.js
export const reduxSetNames = (names: any) => ({
  type: 'REDUX_SET_NAMES',
  names,
});

export const reduxGetNames = () => ({
  type: 'REDUX_GET_NAMES',
});

// reducers.js
export const reducer = (state = {}, action: { type: any; names: any; }) => {
  console.log('state is ');
  console.log(state);
  switch (action.type) {
    case 'REDUX_SET_NAMES':
      return action.names;
      // return {...state, names: action.names };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  names: reducer,
});

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState);
  return store;
}

export const store = configureStore();
