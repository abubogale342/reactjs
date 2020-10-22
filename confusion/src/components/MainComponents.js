import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './MenuComponents';
import Home from './HomeComponent';
import {Redirect ,Route, Switch, withRouter } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import { connect } from 'react-redux';
import { postComment, fetchComments, fetchDishes, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  postComment : (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => { dispatch(fetchLeaders()) },
  postFeedback: (feedback) => dispatch(postFeedback(feedback))
});

class Main extends Component {
  
  componentDidMount() {
    this.props.fetchDishes()
    this.props.fetchComments()
    this.props.fetchPromos()
    this.props.fetchLeaders();
  }

  render() { 
    const HomePage = () => {
      return(
        <Home 
          dish = {this.props.dishes.dishes.filter((dish)=> dish.featured)[0]} 
          dishesLoading = {this.props.dishes.isLoading}
          dishErrMsg = {this.props.dishes.errMsg}
          promotion = {this.props.promotions.promotions.filter((promo)=> promo.featured)[0]} 
          promoLoading = {this.props.promotions.isLoading}
          promoErrMsg = {this.props.promotions.errMsg}
          leader = {this.props.leaders.leaders.filter((lead)=> lead.featured)[0]} 
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
        />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail 
          dish = {this.props.dishes.dishes.filter(dish=>dish.id === parseInt(match.params.dishId,10))[0]} 
          isLoading = {this.props.dishes.isLoading}
          errMsg = {this.props.dishes.errMsg}
          comments = {this.props.comments.comments.filter(comm=>comm.dishId === parseInt(match.params.dishId,10))}
          commentsErrMsg = {this.props.comments.errMsg}
          postComment = {this.props.postComment}
        />
      );
    }

    return ( 
      <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                  <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                  <Route path='/menu/:dishId' component={DishWithId} />
                  <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
                  <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
     );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));