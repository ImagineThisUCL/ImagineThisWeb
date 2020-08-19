import React, {Component, Fragment,} from 'react'
import Navigation from "../components/Navigation"
import "../css/authenticatehomepage.css"
import {Tab, Tabs} from 'react-bootstrap'
import Cookies from "universal-cookie"
import $ from 'jquery'

export class OauthCallBackPage extends Component {
    constructor(props) {
        super(props)
        let currentURL = window.location.search
        let params = new URLSearchParams(currentURL)
        let code = params.get('code')
        console.log(code)
        if (code === null) {
            window.location.href = 'http://localhost:3000'
        }

        let state = params.get('state')
        this.state = {
            code: code,
            projectID: '',
            accessToken: undefined,
            projectIDError: true,
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
                    console.log('error')
                    console.log(err)
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
            let result = false
            let responseData = null
            $.ajax({
                type: "GET",
                url: 'http://localhost:8080/authToken',
                dataType: "json",
                async: false,
                data:{
                    'accessToken': this.state.accessToken,
                    'projectID': this.state.projectID,
                    'authType': 'oauth2Token'
                },
                success: function (data){
                    result = true
                    responseData = data
                    console.log(data)
                },
                error: function (xhr, status, err) {
                    console.log('error')
                }
            })
            if(result){
                const cookies = new Cookies()
                cookies.set('accessToken', this.state.accessToken, {path: '/'})
                cookies.set('projectID', this.state.projectID, {path: '/'})
                cookies.set('authType', 'oauth2Token', {path: '/'})
                this.props.history.push({
                    pathname: '/wireframes',
                    state:{
                        projectName:responseData.projectName,
                        wireframeList: responseData.wireframeList
                    }
                })
            }else{
                $(".error_message").css('display','block')
            }
        }

    }


    render() {
        return (
            <Fragment>
                <Navigation/>
                <div className="auth-form">
                    <Tabs defaultActiveKey="auth-token" id="uncontrolled-tab-example">
                        <Tab eventKey="auth-token" title="Access Project with ID">
                            <p className="auth-form-item">Please enter your Figma project ID, Project ID is the string between [file\] and [your project name] in your Figma project URL</p>
                            <input
                                className={'form-control auth-form-item ' + (this.state.projectIDError ? 'is-invalid' : '')}
                                placeholder="Enter your Figma project ID" onChange={this.handleChangeProjectID}/>
                            <button className='btn btn-primary auth-form-item'
                                    onClick={(e) => this.getFigmaProject()}>Submit
                            </button>
                            <p className="auth-form-item error_message">*The project ID is not correct, please try again</p>
                        </Tab>
                    </Tabs>
                </div>
            </Fragment>
        )
    }
}

export default OauthCallBackPage