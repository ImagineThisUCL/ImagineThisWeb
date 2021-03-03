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
      // projectID: this.props.match.params.projectID,
      projectID: "",
      projectName: "",
    };
  }

  componentDidMount() {
    // init local state with global state
    const [context, dispatch] = this.context;
    this.setState({projectID: context.projectID, projectName: context.projectName})
  }

  componentDidUpdate(prevProps) {
    const [context, dispatch] = this.context;
    if (this.props.match.params.projectID !== prevProps.match.params.projectID) {
      // the url param mismatched, update the local state
      this.setState({projectID: this.props.match.params.projectID, projectName: context.projectName})
    }
  }

  render() {
    return (
      <>
        <Navigation history={this.props.history} />

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
  }
}
