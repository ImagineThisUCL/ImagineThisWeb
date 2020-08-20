import React, {Component, Fragment,} from 'react'
import Navigation from "../components/Navigation"
import "../css/authenticatehomepage.css"
import {Tab, Tabs} from 'react-bootstrap'
import Cookies from "universal-cookie"
import $ from 'jquery'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

export class OauthCallBackPage extends Component {
    constructor(props) {
        super(props)
        let currentURL = window.location.search
        let params = new URLSearchParams(currentURL)
        let code = params.get('code')
        if (code === null) {
            window.location.href = 'http://localhost:3000'
        }

        this.state = {
            code: code,
            projectID: '',
            accessToken: undefined,
            projectIDError: false,
            loaderVisible: false,
            errorMessageVisible: false,
        }
        
        this.handleChangeProjectID = this.handleChangeProjectID.bind(this)
        this.getFigmaProject = this.getFigmaProject.bind(this)
    }

    componentDidMount() {
        let accessToken = undefined
        if (this.state.code !== undefined) {
            $.ajax({
                type: "POST",
                url: 'https://www.figma.com/api/oauth/token',
                dataType: "json",
                async: false,
                data: {
                    'client_id': 'HbTuw2lrfAC84htJy0Rtf1',
                    'client_secret': 'ARJJi2cIa7pQLUhN6bJ2d93fWFALfe',
                    'redirect_uri':'http://localhost:3000/auth',
                    'code':this.state.code,
                    'grant_type':'authorization_code'
                },
                success: function (data) {
                    console.log(data)
                    accessToken = data.access_token
                },
                error: function (xhr, status, err) {
                    console.log('error' + err)
                }
            })
        }
        if(accessToken !== undefined){
            this.setState({accessToken: accessToken})
        }
    }

    handleChangeProjectID(event) {
        this.setState({projectID: event.target.value})
    }

    validateForm() {
        let error = false
        if (!(this.state.projectID.length > 0)) {
            this.setState({projectIDError: true})
            error = true
        } else {
            this.setState({projectIDError: false})
        }
        return error
    }

    getFigmaProject(){
        if(!this.validateForm()){
            this.setState({ 
                loaderVisible: true,
                errorMessageVisible: false,
            })
            $.ajax({
                type: "GET",
                url: 'http://localhost:8080/authToken',
                dataType: "json",
                async: true,
                data:{
                    'accessToken': this.state.accessToken,
                    'projectID': this.state.projectID,
                    'authType': 'oauth2Token'
                },
                success: function (data){
                    this.setState({ 
                        loaderVisible: false,
                        errorMessageVisible: false,
                    })
                    console.log(data)
                    const cookies = new Cookies()
                    cookies.set('accessToken', this.state.accessToken, {path: '/'})
                    cookies.set('projectID', this.state.projectID, {path: '/'})
                    cookies.set('authType', 'oauth2Token', {path: '/'})
                    this.props.history.push({
                        pathname: '/wireframes',
                        state: {
                            projectName: data.projectName,
                            wireframeList: data.wireframeList,
                        }
                    })
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log('error' + err)
                    this.setState({ 
                        loaderVisible: false,
                        errorMessageVisible: true,
                        projectIDError: true,
                    })
                }.bind(this)
            })
        }
    }

    render() {
        return (
            <Fragment>
                <Navigation/>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-8 offset-lg-2 text-center">
                            <h3 className="mt-5">You have successfully authenticated!</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-lg-8 offset-lg-2">
                            <div className="auth-form">
                                <Tabs defaultActiveKey="auth-token" id="uncontrolled-tab-example">
                                    <Tab eventKey="auth-token" title="Access Project with ID">
                                        <h5>Please enter your Figma project ID</h5>
                                        <p className="mt-2">Project ID is the string between [file\] and [your project name] in your Figma project URL</p>
                                        <input
                                            className={'form-control mt-4 ' + (this.state.projectIDError ? 'is-invalid' : '')}
                                            placeholder="Enter your Figma project ID" onChange={this.handleChangeProjectID}/>
                                        <button className='btn btn-primary mt-3'
                                                onClick={(e) => this.getFigmaProject()}>Submit
                                        </button>
                                        {this.state.errorMessageVisible &&
                                            <p className="mt-3 error_message">*The project ID is not correct, please try again</p>
                                        }
                                        {this.state.loaderVisible &&
                                            <div className="d-flex justify-content-center">
                                                <Loader
                                                    type="Oval"
                                                    color="#00BFFF"
                                                    width={50}
                                                    height={50}/>
                                            </div>
                                        }
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default OauthCallBackPage