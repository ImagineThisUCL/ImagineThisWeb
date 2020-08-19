import React, {Component, Fragment,} from 'react'
import Navigation from "../components/Navigation"
import "../css/authenticatehomepage.css"
import {Tab, Tabs} from "react-bootstrap"
import $ from 'jquery'
import Cookies from 'universal-cookie'

export class AuthenticateHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: '',
            projectID: '',
            tokenError: true,
            projectIDError: true,
        }

        this.handleChangeProjectID = this.handleChangeProjectID.bind(this)
        this.handleChangeToken = this.handleChangeToken.bind(this)
        this.getFigmaProject = this.getFigmaProject.bind(this)
        this.oauthRedirect = this.oauthRedirect.bind(this)

    }

    handleChangeToken(event) {
        this.setState({accessToken: event.target.value})
    }

    handleChangeProjectID(event) {
        this.setState({projectID: event.target.value})
    }

    validateForm() {
        let error = false;
        if (!(this.state.accessToken.length > 0)) {
            this.setState({tokenError: true})
            error = true
        } else {
            this.setState({tokenError: false})
        }
        if (!(this.state.projectID.length > 0)) {
            this.setState({projectIDError: true})
            error = true
        } else {
            this.setState({projectIDError: false})
        }
        return error
    }

    getFigmaProject() {
        if (!this.validateForm()) {
            let result = false
            let responseData = null
            $.ajax({
                type: "GET",
                url: 'http://localhost:8080/authToken',
                dataType: "json",
                async: false,
                data: {
                    'accessToken': this.state.accessToken,
                    'projectID': this.state.projectID,
                    'authType': 'originalToken'
                },
                success: function (data) {
                    result = true
                    responseData = data
                },
                error: function (xhr, status, err) {
                    console.log('error')
                }

            })
            if (result) {
                $(".error_message").css('display', 'none')
                const cookies = new Cookies()
                cookies.set('accessToken', this.state.accessToken, {path: '/'})
                cookies.set('projectID', this.state.projectID, {path: '/'})
                cookies.set('authType', 'originalToken', {path: '/'})
                this.props.history.push({
                    pathname: '/wireframes',
                    state:{
                        projectName:responseData.projectName,
                        wireframeList: responseData.wireframeList
                    }
                })
            } else {
                $(".error_message").css('display', 'block')
            }
        }
    }

    oauthRedirect() {
        window.location.href = "https://www.figma.com/oauth?client_id=HbTuw2lrfAC84htJy0Rtf1&redirect_uri=http://localhost:3000/auth&scope=file_read&state=get_token&response_type=code"
    }

    render() {
        return (
            <Fragment>
                <Navigation/>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-8 offset-lg-2">
                            <div className="auth-form">
                                <Tabs defaultActiveKey="auth-token" id="uncontrolled-tab-example">
                                    <Tab eventKey="auth-token" title="Authenticate with Token">
                                        <p className="auth-form-item">Please enter your Figma access token and project ID,
                                            see <a href="https://www.figma.com/developers/api#access-tokens" target="_blank" rel="noopener noreferrer">here</a> to learn how to generate your Figma access token and
                                            project ID</p>
                                        <input
                                            className={'form-control auth-form-item ' + (this.state.tokenError ? 'is-invalid' : '')}
                                            placeholder="Enter your Figma access token" onChange={this.handleChangeToken}/>
                                        <input
                                            className={'form-control auth-form-item ' + (this.state.projectIDError ? 'is-invalid' : '')}
                                            placeholder="Enter your Figma project ID" onChange={this.handleChangeProjectID}/>
                                        <button className='btn btn-primary auth-form-item'
                                                onClick={(e) => this.getFigmaProject()}>Submit
                                        </button>
                                        <p className="auth-form-item error_message">*The token or the project ID is not correct,
                                            please try again</p>
                                    </Tab>
                                    <Tab eventKey="Oauth2" title="Oauth 2.0 Authentication">
                                        <p className="auth-form-item">Generate your Figma project access authorization with
                                            Oauth 2.0 protocol, see the detailed information <a href="https://oauth.net/2/" target="_blank" rel="noopener noreferrer">here.</a></p>
                                        <button className='btn btn-primary auth-form-item'
                                                onClick={(e) => this.oauthRedirect()}>Authenticate with Oauth 2.0
                                        </button>
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

export default AuthenticateHomePage
