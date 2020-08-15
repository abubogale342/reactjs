import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap'


    function RenderDish({dish}){
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

    function RenderComments({comments}){
        if(comments==null){
            return(<div></div>)
        }
        const comm = comments.map(com => {
            return(
                <div className="container">
                    <ul key = {com.id} className = 'list-unstyled'>
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

    const DishDetail = (props)=>{
        const dish = props.dish;
        if(dish == null){
            return (<div></div>)
        }
        return(
            <div className="container">
                <div className = "row">
                    <RenderDish dish = {dish} />
                    <RenderComments comments = {dish.comments} />
                </div>
            </div>
        );
    }
        
export default DishDetail;