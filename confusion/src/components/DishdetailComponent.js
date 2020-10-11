import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, CardTitle, Button, FormGroup, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Control, Errors, LocalForm } from 'react-redux-form';
import Loading from './LoadingComponent'
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isModalOpen: false
         }
    }

    toggleModal =()=>{
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin = (values) =>{  
        this.toggleModal(); 
        this.props.addComment(this.props.dishId, values.rating, values.name, values.message);
    }

    render() { 
        return ( 
            <React.Fragment>
                <Button outline onClick={this.toggleModal}><span className='fa fa-pencil fa-lg'></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleLogin(values)}>
                            <div className='form-group'>
                                <Label htmlFor='rating' >Rating</Label>
                                <FormGroup>
                                    <Control.select model='.rating' name='rating'
                                        className="form-control" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                    </Control.select>
                                </FormGroup>
                            </div>
                            <div className='form-group'>
                                <Label htmlFor='name' >Your Name</Label>
                                <FormGroup>
                                    <Control.text model='.name' name='name' id='name' 
                                    placeholder='Your Name'
                                    className='form-control'
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                        />
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                                </FormGroup>
                            </div>
                            <div className='form-group'>
                                <Label htmlFor='message'>message</Label>
                                <FormGroup>
                                    <Control.textarea model='.message' name='message' id='message'
                                    rows='6' 
                                    className="form-control" />
                                </FormGroup>
                            </div>
                            <div className='form-group'>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
         );
    }
}

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

function RenderComments({comments, addComment, dishId}){
    if(comments == null){
        return(<div></div>)
    }

    const comm = comments.map(com => {
        return(
            <div className="container" key = {com.dishId}>
                <ul className = 'list-unstyled'>
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
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>
    );
}

const DishDetail = (props)=>{
    const dish = props.dish;
    const comment = props.comments;
    if(props.dishesLoading){
        return(
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        )
    }
    else if(props.dishErrMsg){
        return(
            <div className='container'>
                <div className='row'>
                    <h4>{props.dishErrMsg}</h4>
                </div>
            </div>
        )
    }
    else if(dish == null){
        return (<div></div>)
    }
    return(
        <div className="container">
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className='col-12'>
                <h3>{props.dish.name}</h3>
                <hr />
            </div>
            <div className = "row">
                <RenderDish dish = {dish} />
                <RenderComments 
                    comments = { comment } 
                    addComment = { props.addComment }
                    dishId = { props.dish.id } 
                />
            </div>
        </div>
    );
}

export default DishDetail;