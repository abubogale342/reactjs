import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './MenuComponents';
import Home from './HomeComponent';
import {Redirect ,Route, Switch, withRouter } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  addComment : (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) }
});

class Main extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes()
  }

  render() { 
    const HomePage = () => {
      return(
        <Home dish = {this.props.dishes.dishes.filter((dish)=> dish.featured)[0]} 
          dishesLoading = {this.props.dishes.isLoading}
          dishErrMsg = {this.props.dishes.errMsg}
          leader = {this.props.leaders.filter((lead)=> lead.featured)[0]} 
          promotion = {this.props.promotions.filter((promo)=> promo.featured)[0]} 
            />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail dish = {this.props.dishes.dishes.filter(dish=>dish.id === parseInt(match.params.dishId,10))[0]} 
          isLoading = {this.props.dishes.isLoading}
          errMsg = {this.props.dishes.errMsg}
          comments = {this.props.comments.filter(comm=>comm.dishId === parseInt(match.params.dishId,10))}
          addComment = {this.props.addComment}
            />
      );
    }

    return ( 
      <Switch>
        <Route path='/home' component={HomePage} />
        <Route exact path='/menu' component={()=><Menu dishes = {this.props.dishes} />} />
        <Route path='/menu/:dishId' component={DishWithId} />
        <Route exact path='/contactus' component = {() => <Contact 
            resetFeedbackForm = {this.props.resetFeedbackForm} />
        } />
        <Route exact path='/aboutus' component={()=><About leaders = {this.props.leaders} />} />
        <Redirect to='/home' component = {Home} />
      </Switch>
     );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));