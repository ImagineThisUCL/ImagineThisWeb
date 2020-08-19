import React, {Component, Fragment} from "react"
import Navigation from "../components/Navigation"
import WireframeCard from "../components/WireframeCard"
import '../css/wireframespage.css'
import $ from 'jquery'
import Button from 'react-bootstrap/Button'
import Cookies from "universal-cookie"

export class WireframesPage extends Component{
    constructor(props) {
        super(props)
        if(this.props.history.location.state.wireframeList === undefined){
            window.location.href = 'http://localhost:3000'
        }
        const cookie = new Cookies()
        this.state = {
            projectName : this.props.history.location.state.projectName,
            wireframeList : this.props.history.location.state.wireframeList,
            projectID: cookie.get('projectID'),
            accessToken: cookie.get('accessToken'),
            authType: cookie.get('authType'),
            selected:[]
        }
        this.onChangeHandle = this.onChangeHandle.bind(this)
        this.toConvertPage = this.toConvertPage.bind(this)
        this.addToSelected = this.addToSelected.bind(this)
        this.removeSelected = this.removeSelected.bind(this)
    }

    toConvertPage() {
        // this.props.history.push({
        //     pathname: '/convert',
        //     state:{
        //         selected:this.state.selected
        //     }
        // })
        let responseData = undefined;
        $.ajax({
            type: "POST",
            url: 'http://localhost:8080/generatePage',
            contentType: 'application/json',
            dataType: "json",
            async: false,
            data: JSON.stringify({
                'accessToken': this.state.accessToken,
                'projectID': this.state.projectID,
                'authType': this.state.authType,
                'pageList': this.state.selected
            }),
            success: function (data) {
                responseData = data;
            },
            error: function (xhr, status, err) {
                console.log('error');
            }
        })
        if(responseData.isSuccess){
            window.location.href = 'http://localhost:8080/downloadFile?fileName='+responseData.fileName;
        }

    }

    addToSelected(id) {
        this.setState({
            selected:[...this.state.selected, id]
        })
    }

    removeSelected(id) {
        let array = Array.from(this.state.selected)
        let index = array.indexOf(id)
        if (index !== -1) {
            array.splice(index, 1)
            this.setState({selected: array})
        }
    }

    selectAll = () => {
        let array = []
        this.state.wireframeList.forEach(element => {
            array.push(element.id)
        })
        this.setState({ selected: array })
    }

    clearSelected = () => {
        this.setState({ selected: [] })
    }

    onChangeHandle(id) {
        let array = this.state.selected
        if(array.includes(id)){
            this.removeSelected(id)
        } else {
            this.addToSelected(id)
        }
    }

    render() {
        return(
            <Fragment>
                <Navigation/>
                <div className='container-fluid container--margin-bottom'>
                    <div className='row'>
                        <div className='col-12 d-flex flex-column align-items-center'>
                            <h3 className='mt-5 mb-3'>Please select the wireframes that you wish to convert:</h3>
                        </div>
                    </div>
                    <div className='row'>
                    </div>
                    <div className='row'>
                        {this.state.wireframeList.map((item, index) => (
                            <div className={'col-6 col-sm-4 col-lg-3 col-xl-2 pt-4 pb-4 pr-3 pl-3'} key={index}>
                                <div 
                                    className='card-wrapper'
                                    onClick={() => this.onChangeHandle(item.name)}>
                                    <WireframeCard
                                        title={item.name}
                                        image = {item.imageURL}
                                        id = {item.id}
                                        selected={this.state.selected.includes(item.name)}
                                        onChange={() => this.onChangeHandle(item.name)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <nav className="navbar fixed-bottom navbar-light bottom-actionbar">
                    <div>
                        <Button
                            className='mt-1'
                            onClick={() => this.selectAll()}>
                            Select all
                        </Button>
                        <Button
                            className='mt-1 ml-2'
                            onClick={() => this.clearSelected()}>
                            Unselect all
                        </Button>
                    </div>
                    <span className="bottom-actionbar__selected-text">Currently selected: {this.state.selected.length}</span>
                    <Button 
                        className='bottom-actionbar__button-convert mt-1' 
                        onClick={(e) => this.toConvertPage()}
                        disabled={this.state.selected.length === 0}>
                        Convert to code
                    </Button>
                </nav>

            </Fragment>
        )
    }
}

export default WireframesPage
