import React, {Component} from 'react';
import Main from './components/MainComponents'
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
// import Footer from './FooterComponent'

class App extends Component {
  render() { 
    return ( 
      <Router>
        <div className="App">
          <Header />
          <Main />
          <Footer />
        </div>
      </Router>
     );
  }
}
 
export default App;
