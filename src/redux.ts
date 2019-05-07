import { createStore } from 'redux';
// import { combineReducers, createStore } from 'redux';

export const INITIAL_STATE = {
  items: [
  {
    isFocused: false,
    name: '',
    payingIndexes: [],
    price: '',
    quantity: 1,
  },
  ],
  names: ['', ''],
};

// actions.js
export const reduxSetNames = (names: any) => ({
  type: 'REDUX_SET_NAMES',
  payload: names,
});

export const reduxSetItems = (items: any) => ({
  type: 'REDUX_SET_ITEMS',
  payload: items,
});

export const reduxReset = () => ({
  type: 'REDUX_RESET',
});

// reducers.js
export const reducers = (state = {}, action: any) => {
  switch (action.type) {
    case 'REDUX_SET_NAMES':
      return {
        ...state,
        names: action.payload,
      };
    case 'REDUX_SET_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
    case 'REDUX_RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
};

// store.js
export function configureStore(initialState = {}) {
  const newStore = createStore(reducers, initialState);
  return newStore;
}

export const store = configureStore(INITIAL_STATE);
