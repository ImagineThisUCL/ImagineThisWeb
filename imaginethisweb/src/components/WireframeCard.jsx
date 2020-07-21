import React, {Component,} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class WireframeCard extends Component{

    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>
                <Card style = {{width: '18rem'}}>
                    <Card.Img varint="top" src={this.props.image}/>
                    <Card.Body>
                        <Card.Title>{this.props.title}</Card.Title>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default WireframeCard;
