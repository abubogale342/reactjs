import React from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl'

function RenderCard({ item, isLoading, errMsg }){
    if(isLoading){
        return(
            <Loading />
        );
    } else if(errMsg){
        return(
            <h4>{errMsg}</h4>
        )
    }
    else
    return(
        <Card>
            <CardImg src={ baseUrl + item.image } alt={item.name} />
            <CardBody>
                <CardTitle><h5>{ item.name }</h5></CardTitle>
                {item.designation ?<CardSubtitle><h6>{ item.designation }</h6></CardSubtitle> : null} 
                <CardText>{ item.description }</CardText>
            </CardBody>
        </Card>
    )
}

function Home(props) {
    return ( 
            <div className='container'>
                <div className='row align-items-start'>
                    <div className='col-12 col-md m-1'>
                        <RenderCard item = {props.dish} 
                        isLoading = {props.dishesLoading} 
                        errMsg = {props.dishErrMsg}
                        />
                    </div>
                    <div className='col-12 col-md m-1'>
                        <RenderCard item = {props.promotion} 
                            isLoading = {props.promoLoading}
                            errMsg = {props.promoErrMsg}
                        />
                    </div>
                    <div className='col-12 col-md m-1'>
                        <RenderCard item = {props.leader} />
                    </div>
                </div>
            </div>
     );
}
 
export default Home;