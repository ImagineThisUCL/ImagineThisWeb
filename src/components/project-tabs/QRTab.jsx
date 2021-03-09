import React, { useContext, useEffect, useState } from "react";
import QRCode from "qrcode.react";
import "../../css/project-tabs/QRtab.css";
import Loader from "react-loader-spinner";
import { Col, Container, Row } from "react-bootstrap";
import moment from 'moment';
import * as Icon from 'react-bootstrap-icons';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import api from "../../api.js";
import Search from "../../assets/Search.svg";

import { FeedbackContext } from "../../contexts/feedback-context";

const QRTab = (props) => {
  // useContext can be used to access global context and dispatch changes
  const [state, dispatch] = useContext(FeedbackContext);

  const sendEmail = () => {
    const id = props.projectID;
    api
      .post(`/api/v1/projects/${id}/publish/invitation`, {
        email: 'fill in',
      })
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    const param = props.projectID;
    api
      .get(`/projects/${param}/conversions`)
      .then((res) => {
        if (res.status == 200 && res.data.length > 0) {
          dispatch({
            type: "SET_CONVERSIONS",
            payload: res.data,
          });
        }
      })
      .catch((err) => { console.log(err); });
  }, [props.projectID]);

  // Sort conversion from latest to oldest (descending order)
  const sortByTimestamp = function (a, b) {
    return b.timestamp - a.timestamp;
  };
  let conversions; let
    lastConversion;
  if (state.conversions.length) {
    // We are only interested in the latest conversion that had run or is running
    const executedStatuses = ["RUNNING", "SUCCEEDED", "FAILED"];
    conversions = state.conversions.filter((el) => executedStatuses.includes(el.publishStatus));
    conversions = conversions.sort(sortByTimestamp);
    lastConversion = conversions[0];
    console.log(`Last conversion ${lastConversion.conversionId} for project ${lastConversion.projectId} has status ${lastConversion.publishStatus}`);
  } else {
    console.log(`No conversions found for project ${state.projectID}`);
  }
  // Delete after testing.
  lastConversion = "asdas";

  // Create QR code link
  const qrCodeLink = `exp://exp.host/@imaginethis/${state.projectID}`;

  // Depending on the status of last conversion show different contents
  if (!lastConversion) {
    return (
      <div className="qr-code-status-tab">
        <Icon.Box color="#005EB8" size={70} />
        <div className="qr-code-status-tab-text-box">
          <h3>Project has not been built or publish has not been triggered.</h3>
          <h5>Please create a new build.</h5>
        </div>
      </div>
    );
  } if (lastConversion.publishStatus == "RUNNING") {
    return (
      <div className="qr-code-status-tab">
        <Loader type="BallTriangle" color="#005EB8" width={100} height={100} />
        <div className="qr-code-status-tab-text-box">
          <h3>We are currently publishing your project! It may take couple minutes...</h3>
          <h5>
            User
            {lastConversion.userName}
            {' '}
            triggered build on
            {moment(lastConversion.timestamp).format("DD/MM/YY HH:mm")}
          </h5>
        </div>
      </div>
    );
  } if (lastConversion.publishStatus == "FAILED") {
    return (
      <div className="qr-code-status-tab">
        <Icon.Bug color="#005EB8" size={70} />
        <div className="qr-code-status-tab-text-box">
          <h3>Oops! Your build failed.</h3>
          <h5>
            User
            {lastConversion.userName}
            {' '}
            triggered build on
            {moment(lastConversion.timestamp).format("DD/MM/YY HH:mm")}
          </h5>
        </div>
      </div>
    );
  }
  // Default successful page
  return (
    <div>
      <div className="container d-none d-xl-block d-lg-block d-xl-none d-xl-block d-md-block d-lg-none">
        <h4 className="">QR Code Instructions</h4>
        {/* <p>In order to successfully run the prototype, please do the following steps</p> */}
        <span>To run this prototype on your device, do the following steps:</span>
        <hr />
        <Container>
          <Row>
            <Col>
              <Form
                // onSubmit={this.handleSubmit} Here RUi
                className="input-group navbar-group"
                style={{ margin: "", width: "50%" }}
              >
                <InputGroup className="input-group-prepend">
                  <FormControl
                      className="form-control navbar-input"
                      aria-describedby="basic-addon1"
                      placeholder="Enter your Expo account email address"
                    />
                  <InputGroup.Append>
                      <Button variant="btn btn-light search-button" type="submit">
                        <img alt="search button" src={Search} />
                      </Button>
                    </InputGroup.Append>
                </InputGroup>
              </Form>
              <ol className="pc-ordered-list">
                <li>
                  Install the "
                    <a href="https://expo.io/tools">Expo Go</a>
                  " app on your mobile device.
                  </li>
                <li>Sign into your Expo account, or create one if you don't already have one.</li>
                <li>
                  Add yourself to the ImagineThis Expo organisation by entering in your account's
                  email via the text box below
                  </li>
                <li>
                  Go to your email and accept the invitation to the organisation.
                  If you are already a member you can skip this step.
                  </li>
                <li>Open your device's built-in camera app and point it at the QR code on this page</li>
                <li>A notification will appear saying to open the build in Expo. Click on this.</li>
                <li>The expo app should then open and the prototype should begin to run on your device.</li>
              </ol>
            </Col>
            <Col xs={3} className="pc-qr-col">
              <a href={qrCodeLink}>
                <QRCode className=" qrcode" style={{ height: "125px", width: "125px", margin: "0px" }} value={qrCodeLink} />
              </a>

              <div style={{ textAlign: "center", marginLeft: "-22%" }}>
                Last build:
                {moment(lastConversion.timestamp).format("DD/MM/YY HH:mm")}
                {' '}
                by
                {lastConversion.userName}
                {' '}
                Anthony Hopkins
              </div>
            </Col>
          </Row>
        </Container>

        {/* this is the instruction for the PC device */}
        {/* <div id="instruction-div" className=""> */}
        {/*  <h4 className="">QR Code Instructions</h4> */}
        {/*  /!* <p>In order to successfully run the prototype, please do the following steps</p> *!/ */}
        {/*  <span>To run this prototype on your device, do the following steps:</span> */}
        {/*  <hr /> */}
        {/*  <Form */}
        {/*    // onSubmit={this.handleSubmit} */}
        {/*    className="input-group navbar-group" */}
        {/*    style={{margin: "",width:"50%"}} */}
        {/*  > */}
        {/*    <InputGroup className="input-group-prepend"> */}
        {/*      <FormControl */}
        {/*        className="form-control navbar-input" */}
        {/*        aria-describedby="basic-addon1" */}
        {/*        placeholder="Enter your Expo account email address" */}
        {/*      /> */}
        {/*      <InputGroup.Append> */}
        {/*        <Button variant="btn btn-light search-button" type="submit"> */}
        {/*          <img alt="search button" src={Search}/> */}
        {/*        </Button> */}
        {/*      </InputGroup.Append> */}
        {/*    </InputGroup> */}
        {/*  </Form> */}
        {/*  <ol className="pc-ordered-list"> */}
        {/*    /!*<p className="pc-ordered-list-p">To run this prototype on your device, do the following steps:</p>*!/ */}
        {/*    <li> */}
        {/*      Install the " */}
        {/*      <a href="https://expo.io/tools">Expo Go</a> */}
        {/*      " app on your mobile device. */}
        {/*    </li> */}
        {/*    <li>Sign into your Expo account, or create one if you don't already have one.</li> */}
        {/*    <li>Add yourself to the ImagineThis Expo organisation by entering in your account's */}
        {/*      email via the text box below</li> */}
        {/*    <li>Go to your email and accept the invitation to the organisation. */}
        {/*      If you are already a member you can skip this step.</li> */}
        {/*    <li>Open your device's built-in camera app and point it at the QR code on this page</li> */}
        {/*    <li>A notification will appear saying to open the build in Expo. Click on this.</li> */}
        {/*    <li>The expo app should then open and the prototype should begin to run on your device.</li> */}
        {/*  </ol> */}
        {/* </div> */}

        {/* <div id="qr-div"> */}
        {/*  <a href={qrCodeLink}> */}
        {/*    <QRCode className="qrcode" style={{ height: "150px", width: "150px", margin: "0px" }} value={qrCodeLink} /> */}
        {/*  </a> */}
        {/*  <div style={{textAlign: "center", marginLeft:"-22%"}}>Last build: {moment(lastConversion.timestamp).format("DD/MM/YY HH:mm")} by {lastConversion.userName}</div> */}
        {/* </div> */}

        {/* <div className="clear" /> */}
      </div>

      <div className="container d-block d-sm-none d-none d-sm-block d-md-none">
        {/* this is the instruction for the mobile device */}
        <div className="mobile_instruction-div">
          <h3 className="mobile-qrtab-title">QR Code Using Instructions</h3>
          <p className="mobile-ordered-p mobile-ordered-list ">
            To run the prototype your device, please do the following steps:
            <br />
          </p>

          <ol className="mobile-ordered-list">

            <li>
              Install the "
              <a href="https://expo.io/tools">Expo Go</a>
              " app on your mobile device.
            </li>
            <li>Sign into your Expo account, or create one if you don't already have one.</li>
            <li>
              Add yourself to the ImagineThis Expo organisation by entering in your account's
              email via the text box below
            </li>
            <li>
              Go to your email and accept the invitation to the organisation.
              If you are already a member you can skip this step.
            </li>
            <li>Open your device's built-in camera app and point it at the QR code on this page</li>
            <li>A notification will appear saying to open the build in Expo. Click on this.</li>
            <li>The expo app should then open and the prototype should begin to run on your device.</li>
          </ol>
          <p className="mobile-ordered-p mobile-ordered-list">

            Please check for other related details：
            {' '}
            <a href="https://expo.io/">expo.io</a>
          </p>
          <Form
              // onSubmit={this.handleSubmit}
            className="input-group navbar-group"
            style={{ margin: "auto", width: "90%" }}
          >
            <InputGroup className="input-group-prepend">
              <FormControl
                style={{ fontSize: "12px" }}
                className="form-control navbar-input"
                aria-describedby="basic-addon1"
                placeholder="Enter Expo Email Address"
              />
              <InputGroup.Append>
                <Button variant="btn btn-light search-button" type="submit">
                  <img alt="search button" src={Search} />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>

        </div>
        <div className="mobile-qr">
          <a href={qrCodeLink}>
            <QRCode
              className=" qrcode"
              style={{
                height: "100px", width: "100px", margin: "0px", marginTop: "10%",
              }}
              value={qrCodeLink}
            />
          </a>
          <div style={{ textAlign: "center", fontSize: "12px" }}>
            Last build:
            {moment(lastConversion.timestamp).format("DD/MM/YY HH:mm")}
            {' '}
            by
            {lastConversion.userName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRTab;
