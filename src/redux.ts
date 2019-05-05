import { combineReducers, createStore } from 'redux';

// actions.js
export const reduxSetNames = (nameSetPage: any) => ({
  type: 'REDUX_SET_NAMES',
  nameSetPage,
});

export const reduxGetNames = () => ({
  type: 'REDUX_GET_NAMES',
});

// reducers.js
export const reducer = (state = {}, action: { type: any; nameSetPage: any; }) => {
  console.log('state is ');
  console.log(action);
  switch (action.type) {
    case 'REDUX_SET_NAMES':
      return action.nameSetPage;
      // return {...state, names: action.names };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  nameSetPage: reducer,
});

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState);
  return store;
}

export const store = configureStore();
