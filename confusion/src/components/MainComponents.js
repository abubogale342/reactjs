import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, NavbarBrand } from 'reactstrap'
import Menu from './MenuComponents'
import { DISHES } from '../shared/dishes';
import DishDetail from './DishdetailComponent'


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      dishes : DISHES,
      selectedDish : null
     };
  }

  onDishSelected(dishId){
    this.setState({selectedDish: dishId});
  }

  render() { 
    return ( 
      <div className="Main">
      <Navbar dark color = "primary">
        <div className = 'container'>
          <NavbarBrand href='/'> Ristorante Con Fusion </NavbarBrand>
        </div>
      </Navbar>
      <Menu dishes = {this.state.dishes}
      onClick = {(dishId) => this.onDishSelected(dishId)} />
      <DishDetail dish = {this.state.dishes.filter((dish)=>dish.id === this.state.selectedDish)[0]} />
    </div>
     );
  }
}
 
export default Main;
