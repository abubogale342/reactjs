import React, {Component} from 'react';
import Main from './components/MainComponents'
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import { Provider } from 'react-redux';
import { configureStore } from './redux/confgureStore'
const store = configureStore();

class App extends Component {
  render() { 
    return ( 
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Main />
            <Footer />
          </div>
        </Router>
      </Provider>
     );
  }
}
 
export default App;
