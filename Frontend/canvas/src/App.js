import React, { Component } from 'react';
import './App.css';
import Main from './components/main';
import {BrowserRouter} from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './store';


class App extends Component {
  render() {
    // console.log(store);
    return (
      // <Provider store={store}>
        <BrowserRouter>
          <div>
            {/* App Component Has a Child Component called Main*/}
            <Main />
          </div>
        </BrowserRouter>
      // </Provider>
    );
  }
}

export default App;
