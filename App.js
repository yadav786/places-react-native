// import 'react-native-gesture-handler';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/places-reducers';

import { init } from './helpers/db';

init().then(() => {
  console.log('db initialised');
}).
catch(err => {
  console.log('db failed');
  console.log(err);
});

const rootReducer = combineReducers({ 
  places: placesReducer 
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

console.log('store', store);

export default function App() {
  return (
      <Provider store={store}>
      <PlacesNavigator />
      </Provider>
  );
}
