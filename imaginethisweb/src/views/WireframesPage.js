import React, {Component} from "react"
import Navigation from "../components/Navigation"
import WireframeCard from "../components/WireframeCard"
import NHSLogo from "../images/nhs.jpeg"
import '../css/wireframespage.css'

import Button from 'react-bootstrap/Button'

export class WireframesPage extends Component{
    constructor(props) {
        super(props)
        if(this.props.history.location.state.wireframeList === undefined){
            window.location.href = 'http://localhost:3000'
        }
        this.state = {
            projectName : this.props.history.location.state.projectName,
            wireframeList : this.props.history.location.state.wireframeList,
            selected:[]
        }
        this.onChangeHandle = this.onChangeHandle.bind(this);
        this.toConvertPage = this.toConvertPage.bind(this);
        this.addToSelected = this.addToSelected.bind(this);
        this.deleteFromSelected = this.deleteFromSelected.bind(this);
    }

    toConvertPage() {
        this.props.history.push({
            pathname: '/convert',
            state:{
                selected:this.state.selected
            }
        })
    }

    addToSelected(chosenID) {
      let list = this.state.wireframeList;
      let chosenOne = list.filter(element => element.id == chosenID);
      let newelement = chosenOne[0]
      this.setState({
          selected:[...this.state.selected, newelement]
      });
    }

    deleteFromSelected(chosenID) {
      let toFilter = this.state.selected;
      let selectOnce = toFilter.filter(element => element.id != chosenID);
      this.setState({
          selected:selectOnce
      });
    }

    onChangeHandle(id) {
        let list = this.state.wireframeList;
        let exist = this.state.selected;
        if(exist.length == 0){
            console.log("select 1",id);
            this.addToSelected(id);
        }else{
            let selectOnce = exist.filter(element => element.id == id);
            if(selectOnce.length == 0){
                console.log("select 2",id);
                this.addToSelected(id);
            }else{
                console.log("delete",id);
                this.deleteFromSelected(id)
            }
        }
        console.log("Selected NOW:", this.state.selected)
    }

    render() {
        return(
            <div>
                <Navigation/>
                <Button className='redirect-Convert' onClick={(e) => this.toConvertPage()}>
                    Convert to code
                </Button>
                <div className={'card-container row'}>
                    {this.state.wireframeList.map((item, index) => (
                        <div className={'col-12 col-sm-6 col-lg-4 col-xl-3 card-wrapper'} key={index}>
                            <WireframeCard
                                title={item.name}
                                image = {item.imageURL}
                                id = {item.id}
                            />
                            <input
                                type="checkbox"
                                id={item.id}
                                onChange={() => this.onChangeHandle(item.id)}
                            />Toggle to Choose
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default WireframesPage
