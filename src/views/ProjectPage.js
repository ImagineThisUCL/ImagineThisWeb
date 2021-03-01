import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Navigation from "../components/Navigation";
import FeedbackTab from "../components/project-tabs/FeedbackTab";
import QRTab from "../components/project-tabs/QRTab";
import DownloadTab from "../components/project-tabs/DownloadTab";
import { projectAPI } from "../api";
import "../css/projectpage.css";

export default class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = { projectID: this.props.match.params.projectID, projectName: "" };
  }

  componentDidMount() {
    this.getProjectDetails();
  }

  getProjectDetails() {
    projectAPI('GET')
      .then((res) => {
        this.setState({ projectName: res.data.projectName });
      });
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
              { this.state.projectName }
            </h3>
          </div>
          <Tabs defaultActiveKey="feedback" id="uncontrolled-tab-example">
            <Tab eventKey="feedback" title="Feedback">
              <FeedbackTab projectID={this.state.projectID} projectName={this.state.projectName} />
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
  }
}
