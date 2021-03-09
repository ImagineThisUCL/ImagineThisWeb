import React, { Component } from "react";

import "../css/wireframespage.css";
import Button from "react-bootstrap/Button";
import Cookies from "universal-cookie";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import {
  CheckCircleFill,
  ArrowCounterclockwise,
  ExclamationCircleFill,
} from "react-bootstrap-icons";
import Navigation from "../components/Navigation";
import WireframeCard from "../components/WireframeCard";
import { DOMAIN, BACKEND_ADDRESS } from "../consts";
import api from "../api";

/*
 * A view showing the thumbnails of Figma frames/artboards available for
 * conversion.
 *
 * Allows the selection of frames and their conversion
 */
export class WireframesPage extends Component {
  constructor(props) {
    super(props);
    if (this.props.history.location.state.wireframeList === undefined) {
      window.location.href = DOMAIN;
    }
    const cookie = new Cookies();
    this.state = {
      projectName: this.props.history.location.state.projectName,
      wireframeList: this.props.history.location.state.wireframeList,
      userID: this.props.history.location.state.userID,
      projectID: cookie.get("projectID"),
      accessToken: cookie.get("accessToken"),
      authType: cookie.get("authType"),
      selected: [],
      loaderVisible: false,
      successModal: false,
      errorModal: false,
      timeMinutes: 0,
      timeSeconds: 0,
    };
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.toConvertPage = this.toConvertPage.bind(this);
    this.addToSelected = this.addToSelected.bind(this);
    this.removeSelected = this.removeSelected.bind(this);
    this.calcTimeEstimate = this.calcTimeEstimate.bind(this);
  }

  /*
   * Unselect all wireframes
   */
  clearSelected() {
    this.setState({ selected: [] });
  }

  /*
   * Handle clicks on wireframes - select/unselect
   */
  onChangeHandle(name) {
    const array = this.state.selected;
    if (array.includes(name)) {
      this.removeSelected(name);
    } else {
      this.addToSelected(name);
    }
  }

  /*
   * Select all wireframes
   */
  selectAll() {
    const array = [];
    this.state.wireframeList.forEach((element) => {
      array.push(element.name);
    });
    this.setState({ selected: array });
  }

  /*
   * Hides notification modal

   */
  hideModal() {
    this.setState({
      successModal: false,
      errorModal: false,
    });
  }

  /*
   * Add the wireframe to the list of selected wireframes
   */
  addToSelected(name) {
    this.setState({
      selected: [...this.state.selected, name],
    });
  }

  /*
   * Send all Figma access data and a list of wireframes to be converted to the backend
   * Request the conversion
   */
  toConvertPage() {
    const { projectID, authType, accessToken, selected, userID } = this.state;

    this.calcTimeEstimate(selected.length);

    this.setState({
      errorModal: false,
      loaderVisible: true,
    });

    api
      .post(
        `${BACKEND_ADDRESS}/api/v1/projects/${projectID}/build?authType=${authType}&accessToken=${accessToken}`,
        { wireframeList: selected, userId: userID, publish: true }
      )
      .then(() => {
        this.setState({
          loaderVisible: false,
          successModal: true,
        });

        setTimeout(() => {
          this.props.history.push({ pathname: `/project/${projectID}` });
          this.setState({ successModal: false });
        }, 2500);
      })
      .catch((err) => {
        this.setState({
          loaderVisible: false,
          errorModal: true,
        });
        console.log({ err });
      });
  }

  /*
   * Remove the wireframe from the list of selected wireframes
   */
  removeSelected(name) {
    const array = Array.from(this.state.selected);
    const index = array.indexOf(name);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ selected: array });
    }
  }

  /*
   * Calculate estimated conversion time
   *
   * (Currently works with average conversion time of 15s per screen)
   */
  calcTimeEstimate(numberOfScreens) {
    const total = numberOfScreens * 15;
    const minutes = (total / 60) >> 0;
    const seconds = total % 60;
    this.setState({
      timeMinutes: minutes,
      timeSeconds: seconds,
    });
  }

  render() {
    return (
      <>
        <Navigation history={this.props.history} />
        <div className="container-fluid container--margin-bottom">
          <div className="row">
            <div className="col-12 d-flex flex-column align-items-center">
              <h3 className="mt-5 mb-3">
                Please select the wireframes that you wish to build:
              </h3>
            </div>
          </div>
          <div className="row" />
          <div className="row">
            {this.state.wireframeList.map((item, index) => (
              <div
                className="col-6 col-sm-4 col-lg-3 col-xl-2 pt-4 pb-4 pr-3 pl-3"
                key={index}
              >
                <div
                  className="card-wrapper"
                  onClick={() => this.onChangeHandle(item.name)}
                >
                  <WireframeCard
                    title={item.name}
                    image={item.imageURL}
                    id={item.id}
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
            <Button className="mt-1" onClick={() => this.selectAll()}>
              Select all
            </Button>
            <Button className="mt-1 ml-2" onClick={() => this.clearSelected()}>
              Unselect all
            </Button>
          </div>
          <span className="bottom-actionbar__selected-text">
            Currently selected: {this.state.selected.length}
          </span>
          <Button
            className="bottom-actionbar__button-convert mt-1"
            onClick={() => this.toConvertPage()}
            disabled={this.state.selected.length === 0}
          >
            Build App
          </Button>
        </nav>
        {this.state.loaderVisible && (
          <div className="d-flex justify-content-center align-items-center loader-background">
            <div className="d-flex align-items-center flex-column loader-wrapper">
              <h4 className="mb-4">We are generating your App template</h4>
              <Loader type="Watch" color="#005EB8" width={50} height={50} />
              <p className="lead mt-4">
                This will take approximately {this.state.timeMinutes} minute(s)
                and {this.state.timeSeconds} seconds.
              </p>
            </div>
          </div>
        )}

        {this.state.successModal && (
          <div className="d-flex justify-content-center align-items-center loader-background">
            <div className="d-flex align-items-center flex-column loader-wrapper">
              <h4>Project built successfully!</h4>
              <p className="lead">You will now be redirected..</p>
              <CheckCircleFill color="green" size={40} />
            </div>
          </div>
        )}

        {this.state.errorModal && (
          <div className="d-flex justify-content-center align-items-center loader-background">
            <div className="d-flex align-items-center flex-column loader-wrapper">
              <h4>Error building project!</h4>
              <p className="lead">
                Please try again <ExclamationCircleFill color="red" />
              </p>
              <div>
                <Button variant="secondary" onClick={() => this.hideModal()}>
                  Close
                </Button>{" "}
                <Button variant="danger" onClick={() => this.toConvertPage()}>
                  Re-try <ArrowCounterclockwise />
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default WireframesPage;
