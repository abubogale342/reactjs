import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap'

class DishDetail extends Component {

    renderDish(dish){
            return(
            <div className = "col-12 col-md-5 m-1">
                <Card>
                    <CardImg width = "100%" src = {dish.image} alt = {dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    renderComments(dish){
        if(dish.comments==null){
            return(<div></div>)
        }
        const comm = dish.comments.map(com => {
            return(
                <div className="container">
                    <ul className = 'list-unstyled' key = {com.id}>
                        <li><p>{com.comment}</p></li>
                        <li><p>-- {com.author},{ new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day : '2-digit'}).format(new Date(Date.parse(com.date)))}</p></li>
                    </ul> 
                </div>
            );
        });
        
        return(
            <div className = "col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {comm}
            </div>
        );
    }

    render() { 
        const dish = this.props.dish;
        if(dish == null){
            return (<div></div>)
        }
        return(
            <div className="container">
                <div className = "row">
                    {this.renderDish(dish)}
                    {this.renderComments(dish)}
                </div>
            </div>
        )
    }
}

export default DishDetail;