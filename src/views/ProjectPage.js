import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import axios from "axios";
import Navigation from "../components/Navigation";
import CommentBox from "../components/comments/CommentBox";
import QRTab from "../components/project-tabs/QRTab";
import DownloadTab from "../components/project-tabs/DownloadTab";
import { LOCAL_HOST } from "../consts";
import { CommentContextProvider } from "../contexts/comment-context";
import api from "../api";
import "../css/projectpage.css";

export class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = { projectID: this.props.match.params.projectID, projectName: "" };
  }

  componentDidMount() {
    this.getProjectDetails();
  }

  getProjectDetails() {
    api
      .get(`/projects/${this.state.projectID}`)
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
              Project:{' '}
              { this.state.projectName }
            </h3>
          </div>
          <Tabs defaultActiveKey="feedback" id="uncontrolled-tab-example">
            <Tab eventKey="feedback" title="Feedback">
              <CommentContextProvider>
                <CommentBox projectID={this.state.projectID}/>
              </CommentContextProvider>
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

export default ProjectPage;
