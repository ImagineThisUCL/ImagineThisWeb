import React, { useContext, useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { FeedbackContext } from "../../contexts/feedback-context";
import "../../css/project-tabs/QRtab.css";
import Loader from "react-loader-spinner";
import "react-bootstrap";
import moment from 'moment';
import api from "../../api.js";
import * as Icon from 'react-bootstrap-icons';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Search from "../../assets/Search.svg";


const QRTab = (props) => {
  // useContext can be used to access global context and dispatch changes
  const [state, dispatch] = useContext(FeedbackContext);

  useEffect(() => {
    const param = props.projectID;
    api
      .get(`/projects/${param}/conversions`)
      .then((res) => {
        if (res.status == 200 && res.data.length > 0) {
          dispatch({
            type: "SET_CONVERSIONS",
            payload: res.data
          });
        }
      })
      .catch((err) => { console.log(err) })
  }, [props.projectID]);

  // Sort conversion from latest to oldest (descending order)
  const sortByTimestamp = function (a, b) {
    return b.timestamp - a.timestamp;
  };
  let conversions, lastConversion;
  if (!!state.conversions.length) {
    // We are only interested in the latest conversion that had run or is running
    const executedStatuses = ["RUNNING", "SUCCEEDED", "FAILED"];
    conversions = state.conversions.filter((el) => executedStatuses.includes(el.publishStatus));
    conversions = conversions.sort(sortByTimestamp);
    lastConversion = conversions[0];
    console.log(`Last conversion ${lastConversion.conversionId} for project ${lastConversion.projectId} has status ${lastConversion.publishStatus}`);
  } else {
    console.log(`No conversions found for project ${state.projectID}`);
  }
  //Delete after testing.
  lastConversion = "asdas"

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
    )
  } else if (lastConversion.publishStatus == "RUNNING") {
    return (
      <div className="qr-code-status-tab">
        <Loader type="BallTriangle" color="#005EB8" width={100} height={100} />
        <div className="qr-code-status-tab-text-box">
          <h3>We are currently publishing your project! It may take couple minutes...</h3>
          <h5>User {lastConversion.userName} triggered build on {moment(lastConversion.timestamp).format("DD/MM/YY HH:mm")}</h5>
        </div>
      </div>
    )
  } else if (lastConversion.publishStatus == "FAILED") {
    return (
      <div className="qr-code-status-tab">
        <Icon.Bug color="#005EB8" size={70} />
        <div className="qr-code-status-tab-text-box">
          <h3>Oops! Your build failed.</h3>
          <h5>User {lastConversion.userName} triggered build on {moment(lastConversion.timestamp).format("DD/MM/YY HH:mm")}</h5>
        </div>
      </div>
    )
  }
  // Default successful page
  return (
      <div>
        <div className="container d-none d-xl-block d-lg-block d-xl-none d-xl-block d-md-block d-lg-none">
          <div id="qr-div">
            <a href={qrCodeLink}>
              <QRCode className="qrcode" style={{ height: "150px", width: "150px", margin: "0px" }} value={qrCodeLink} />
            </a>
          </div>
          {/* this is the instruction for the PC device */}
          <div id="instruction-div" className="">
            <h3 className="qrtab-title">QR Code Instructions</h3>
            {/* <p>In order to successfully run the prototype, please do the following steps</p> */}
            <ol className="pc-ordered-list">
              <p>To run this prototype on your device, do the following steps:</p>
              <li>
                Install the "
                <a href="https://expo.io/tools">Expo Go</a>
                " app on your mobile device.
              </li>
              {/* <li>After opening the App, select the "Scan QR Code" option on the top of the sceen</li> */}
              {/*<li>Sign into your Expo account, or create one if you don't already have one.</li>*/}
              {/*<li>Add yourself to the ImagineThis Expo organisation by entering in your account's*/}
                {/*email via the text box below</li>*/}
              {/*<li>Go to your email and accept the invitation to the organisation.*/}
              {/*  If you are already a member you can skip this step.</li>*/}
              <li>Open your device's built-in camera app and point it at the QR code on this page</li>
              <li>A notification will appear saying to open the build in Expo. Click on this.</li>
              <li>The expo app should then open and the prototype should begin to run on your device.</li>
            </ol>
            <div style={{textAlign: "center"}}>Last build: {moment(lastConversion.timestamp).format("DD/MM/YY HH:mm")} by {lastConversion.userName}</div>
          </div>

          <Form
            // onSubmit={this.handleSubmit}
            className="input-group navbar-group"
            style={{margin: "auto",width:"50%"}}
          >
            <InputGroup className="input-group-prepend">
              <FormControl
                className="form-control navbar-input"
                aria-describedby="basic-addon1"
                placeholder="Enter your Expo account email address"
              />
              <InputGroup.Append>
                <Button variant="btn btn-light search-button" type="submit">
                  <img alt="search button" src={Search}/>
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>

          <div className="clear" />
        </div>

        <div className="container d-block d-sm-none d-none d-sm-block d-md-none">
          {/* this is the instruction for the mobile device */}
          <div className="mobile_instruction-div">
            <h3 className="mobile-qrtab-title">QR Code Using Instructions</h3>
            <p className="mobile-ordered-p mobile-ordered-list ">
              To run the prototype your device, please do the following steps:
              <br />
              <br />
            </p>
            <p className="mobile-ordered-p mobile-ordered-list mobile-device-name">Android User:</p>

            <ol className="mobile-ordered-list">

              <li>
                Install the "
                <a href="https://expo.io/tools">Expo Go</a>
                " on app on your mobile device
              </li>
              <li>Click the QR code at the bottom of the screen. This should open the expo app</li>
              <li>The prototype will then begin running on your device</li>
            </ol>
            <p className="mobile-ordered-p mobile-ordered-list mobile-device-name">IOS User:</p>
            <ol className="mobile-ordered-list">

              <li>
                Install the "
                <a href="https://expo.io/tools">Expo Go</a>
                " on app on your mobile device
              </li>
              <li>Login into the "Expo Go" application using the following account(Username:imaginethistest   Password:ImagineThisUCL2021)</li>
              <li>Click the QR code at the bottom of the screen. This should open the expo app</li>
              <li>The prototype will then begin running on your device</li>
            </ol>
            <p className="mobile-ordered-p mobile-ordered-list">

              Please check for other related details：
              {' '}
              <a href="https://expo.io/">expo.io</a>
            </p>
            <Form
              // onSubmit={this.handleSubmit}
              className="input-group navbar-group"
              style={{margin: "auto",width:"90%"}}
            >
              <InputGroup className="input-group-prepend">
                <FormControl style={{fontSize:"12px"}}
                             className="form-control navbar-input"
                             aria-describedby="basic-addon1"
                             placeholder="Enter Expo Email Address"
                />
                <InputGroup.Append>
                  <Button variant="btn btn-light search-button" type="submit">
                    <img alt="search button" src={Search}/>
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>

          </div>
          <div className="mobile-qr">
            <a href={qrCodeLink}>
              <QRCode className=" qrcode" style={{ height: "100px", width: "100px", margin: "0px" }} value={qrCodeLink} />
            </a>
          </div>
        </div>
      </div>
  );
}

export default QRTab;
