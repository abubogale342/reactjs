import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './MenuComponents';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import { COMMENTS } from '../shared/comments';
import Home from './HomeComponent';
import {Redirect ,Route, Switch } from 'react-router-dom'
import Contact from './ContactComponent';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      dishes : DISHES,
      leaders: LEADERS,
      promotions: PROMOTIONS,
      comments: COMMENTS
     };
  }

  render() { 
    const HomePage = () => {
      return(
        <Home dish = {this.state.dishes.filter((dish)=> dish.featured)[0]} 
              leader = {this.state.leaders.filter((lead)=> lead.featured)[0]} 
              promotion = {this.state.promotions.filter((promo)=> promo.featured)[0]} 
        />
      );
    }

    return ( 
      <Switch>
        <Route path='/home' component={HomePage} />
        <Route exact path='/menu' component={()=><Menu dishes = {this.state.dishes} />} />
        <Route exact path='/contactus' component={Contact} />
        <Redirect to='/home' component={Home} /> 
      </Switch>
     );
  }
}
 
export default Main;
