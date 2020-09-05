import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { Provider } from 'react-redux';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createStore} from 'redux'
import allReducers from './reducers'
import Firebase, {FirebaseContext} from './config/index'

const store = createStore(allReducers)

ReactDOM.render(
  <FirebaseContext.Provider value= {new Firebase()}>
  <Provider store={store}>
    <App />
  </Provider>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
