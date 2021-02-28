import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import axios from "axios";
import Navigation from "../components/Navigation";
import CommentBox from "../components/comments/CommentBox";
import QRTab from "../components/project-tabs/QRTab";
import DownloadTab from "../components/project-tabs/DownloadTab";
import { LOCAL_HOST } from "../consts";
import "../css/projectpage.css";
import { AuthenticateHomePage } from "./AuthenticateHomePage";

export class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectID: this.props.match.params.projectID,
      projectName: "",
      projectExists: false, //Page refreshes, so loses state, should be null
    };
  }

  componentDidMount() {
    this.getProjectDetails();
  }

  getProjectDetails() {
    axios
      .get(`${LOCAL_HOST}/api/v1/projects/${this.state.projectID}`)
      .then((res) => {
        // If the projectID exists in the database
        this.setState({
          projectName: res.data.projectName,
          projectExists: true,
        });
      })
      .catch((err) => {
        // If the projectID does not exist
        console.log({ err });
        this.setState({ projectExists: false });
      });
  }

  render() {
    const { projectName, projectExists, projectID } = this.state;
    if (projectExists) {
      return (
        <>
          <Navigation />

          <div className="container">
            <div className="feedback-header">
              <h3>
                Project:
                {projectName}
              </h3>
            </div>
            <Tabs defaultActiveKey="feedback" id="uncontrolled-tab-example">
              <Tab eventKey="feedback" title="Feedback">
                <CommentBox />
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

    return (
      <>
        <AuthenticateHomePage
          projectExists={projectExists}
          projectID={projectID}
        />
      </>
    );
  }
}

export default ProjectPage;
