import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Navigation from "../components/Navigation";
import FeedbackTab from "../components/project-tabs/FeedbackTab";
import QRTab from "../components/project-tabs/QRTab";
import DownloadTab from "../components/project-tabs/DownloadTab";
import { projectAPI } from "../api";
import "../css/projectpage.css";
import { FeedbackContext } from "../contexts/feedback-context";

export default class ProjectPage extends Component {
  static contextType = FeedbackContext;
  constructor(props) {
    super(props);
    this.state = {
      projectID: this.props.match.params.projectID,
      projectName: "",
    };
  }

  componentDidMount() {
    const [state, dispatch] = this.context;
    this.setState({projectName: state.projectName})
  }

  render() {
    return (
      <>
        <Navigation />

        <div className="container">
          <div className="feedback-header">
            <h3>
              Project:
              {' '}
              {this.state.projectName}
            </h3>
          </div>
          <Tabs defaultActiveKey="feedback" id="uncontrolled-tab-example">
            <Tab eventKey="feedback" title="Feedback">
              <FeedbackTab projectID={this.state.projectID}/>
            </Tab>
            <Tab eventKey="run" title="Run App">
              <QRTab />
            </Tab>
            <Tab eventKey="download" title="Download Code">
              <DownloadTab />
            </Tab>
          </Tabs>
        </div>
      </>
    );
    // if (projectExists) {
    // }

    // this.props.history.push('/', {projectExists, projectID});
    // return null;
    // return (
    //   <>
    //     <AuthenticateHomePage
    //       projectExists={projectExists}
    //       projectID={projectID}
    //     />
    //   </>
    // );
  }
}
