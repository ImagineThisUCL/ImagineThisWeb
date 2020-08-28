import React, {Component, Fragment} from 'react'
import Card from 'react-bootstrap/Card'
import '../css/WireframeCard.css'

class WireframeCard extends Component{
    render() {
        return(
            <Fragment>
                {!this.props.selected &&
                    <Card>
                        <Card.Img src={this.props.image}/>
                        <Card.Body>
                            <Card.Title>{this.props.title}</Card.Title>
                        </Card.Body>
                    </Card>
                }
                {this.props.selected  &&
                    <Card className='card-selected'>
                        <Card.Img src={this.props.image}/>
                        <Card.Body className='card-body-selected'>
                            <Card.Title>{this.props.title}</Card.Title>
                        </Card.Body>
                    </Card>
                }
            </Fragment>
        )
    }
}

export default WireframeCard;
