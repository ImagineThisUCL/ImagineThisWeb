import React, { Component } from "react";
import "../css/authenticatehomepage.css";
import { Tab, Tabs, Alert } from "react-bootstrap";
import $ from "jquery";
import Cookies from "universal-cookie";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Navigation from "../components/Navigation";
import { DOMAIN, BACKEND_ADDRESS, CLIENT_ID } from "../consts";

/*
 * A view handling all authentication
 */
export class AuthenticateHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: "",
      projectID: this.props.projectID ?? "",
      tokenError: false,
      projectIDError: false,
      loaderVisible: false,
      errorMessageVisible: false,
      projectExists: this.props.projectExists,
    };
    this.handleChangeProjectID = this.handleChangeProjectID.bind(this);
    this.handleChangeToken = this.handleChangeToken.bind(this);
    this.getFigmaProject = this.getFigmaProject.bind(this);
    this.oauthRedirect = this.oauthRedirect.bind(this);
  }

  /*
   * OnChange handlers to store input field contents in state
   */
  handleChangeToken(event) {
    this.setState({ accessToken: event.target.value });
  }

  handleChangeProjectID(event) {
    this.setState({ projectID: event.target.value });
  }

  /*
   * Authentication with Access Token and Project ID
   */
  getFigmaProject() {
    if (!this.validateForm()) {
      this.setState({
        loaderVisible: true,
        errorMessageVisible: false,
      });
      $.ajax({
        type: "GET",
        url: `${BACKEND_ADDRESS}/api/v1/projects/${this.state.projectID}/wireframes`,
        dataType: "json",
        async: true,
        data: {
          accessToken: this.state.accessToken,
          authType: "originalToken",
        },
        success: function (data) {
          this.setState({
            loaderVisible: false,
            errorMessageVisible: false,
          });
          const cookies = new Cookies();
          cookies.set("accessToken", this.state.accessToken, { path: "/" });
          cookies.set("projectID", this.state.projectID, { path: "/" });
          cookies.set("authType", "originalToken", { path: "/" });
          this.props.history.push({
            pathname: "/wireframes",
            state: {
              projectName: data.projectName,
              wireframeList: data.wireframes,
            },
          });
        }.bind(this),
        error: function (xhr, status, err) {
          console.log("error");
          this.setState({
            loaderVisible: false,
            errorMessageVisible: true,
            tokenError: true,
            projectIDError: true,
          });
        }.bind(this),
      });
    }
  }

  /*
   * Basic form validation
   */
  validateForm() {
    let error = false;
    if (!(this.state.accessToken.length > 0)) {
      this.setState({ tokenError: true });
      error = true;
    } else {
      this.setState({ tokenError: false });
    }
    if (!(this.state.projectID.length > 0)) {
      this.setState({ projectIDError: true });
      error = true;
    } else {
      this.setState({ projectIDError: false });
    }
    return error;
  }

  /*
   * Authentication with OAuth
   * (Redirect to Figma's OAuth API)
   */
  oauthRedirect() {
    window.location.href = `https://www.figma.com/oauth?client_id=${CLIENT_ID}&redirect_uri=${DOMAIN}/auth&scope=file_read&state=get_token&response_type=code`;
  }

  render() {
    const {
      projectID,
      projectExists,
      tokenError,
      projectIDError,
      errorMessageVisible,
      loaderVisible,
    } = this.state;

    return (
      <>
        <Navigation />
        {/* Alert */}
        {projectExists === false && (
          <Alert variant="danger">
            The project with ID{" "}
            <Alert.Link href="/notfound">{projectID}</Alert.Link> is not in our
            database. Please make sure you have converted it first.
          </Alert>
        )}
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2 text-center">
              <h3 className="mt-5">Welcome to ImagineThis</h3>
              <p className="lead mt-3">
                ImagineThis allows you to <strong>build</strong> and
                <strong> run</strong> mobile applications from Figma prototypes.
                Get started by authenticating with Figma below.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2">
              <div className="auth-form">
                <Tabs
                  defaultActiveKey="auth-token"
                  id="uncontrolled-tab-example"
                >
                  <Tab eventKey="auth-token" title="Authenticate with Token">
                    <h5>Please enter your Figma access token and project ID</h5>
                    <p className="mt-2">
                      <a
                        href="https://www.figma.com/developers/api#access-tokens"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Click here
                      </a>{" "}
                      to learn how to generate your Figma access token and
                      project ID
                    </p>
                    <input
                      className={`form-control mt-4 ${
                        tokenError ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your Figma access token"
                      onChange={this.handleChangeToken}
                      required
                    />
                    <input
                      className={`form-control mt-3 ${
                        projectIDError ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your Figma project ID"
                      onChange={this.handleChangeProjectID}
                      required
                    />
                    <button
                      className="btn btn-primary mt-3"
                      onClick={() => this.getFigmaProject()}
                    >
                      Submit
                    </button>
                    {errorMessageVisible && (
                      <p className="mt-3 error_message">
                        *The token or the project ID is not correct, please try
                        again
                      </p>
                    )}
                    {loaderVisible && (
                      <div className="d-flex justify-content-center">
                        <Loader
                          type="Oval"
                          color="#005EB8"
                          width={50}
                          height={50}
                        />
                      </div>
                    )}
                  </Tab>
                  <Tab eventKey="Oauth2" title="Oauth 2.0 Authentication">
                    <h5>
                      Please log into Figma to get project access authorisation
                    </h5>
                    <p className="mt-2">
                      You will be redirected to Figma's authentication page
                      where you will be able to log in and get access to you
                      project, using the Oauth 2.0 protocol.
                      <a
                        href="https://oauth.net/2/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Click here
                      </a>{" "}
                      to get more detailed information about this authentication
                      method.
                    </p>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => this.oauthRedirect()}
                    >
                      Authenticate with Oauth 2.0
                    </button>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AuthenticateHomePage;
