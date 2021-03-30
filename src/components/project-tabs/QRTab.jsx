import React, { useContext, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import "../../css/project-tabs/QRtab.css";
import Loader from "react-loader-spinner";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import moment from "moment";
import * as Icon from "react-bootstrap-icons";
import api, { generationAPI } from "../../api.js";
import { FeedbackContext } from "../../contexts/feedback-context";
import Search from "../../assets/Search.svg";

const QRTab = (props) => {
  // useContext can be used to access global context and dispatch changes
  const [state, dispatch] = useContext(FeedbackContext);
  // this ref is used to get the input value
  const inputEl = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();
    const email = inputEl.current.value;
    const id = props.projectID;
    generationAPI("POST", id, email)
      .then((res) => {
        if (res.data !== "Error") {
          console.log(`Invitation ID: ${res.data}`);
          modalSucces();
        } else {
          modalFail();
        }
      })
      .catch((error) => {
        console.log({ error });
        modalFail();
      });
  };

  const modalSucces = () => {
    dispatch({ type: "SET_SUCCESS_MODAL", payload: true });
    // Hide modal
    setTimeout(() => {
      dispatch({ type: "SET_SUCCESS_MODAL", payload: false });
    }, 3500);
  };

  const modalFail = () => {
    dispatch({ type: "SET_ERROR_MODAL", payload: true });
    // Hide modal
    setTimeout(() => {
      dispatch({ type: "SET_ERROR_MODAL", payload: false });
    }, 3500);
  };

  useEffect(() => {
    const param = props.projectID;
    if (param === "") return;
    api
      .get(`/projects/${param}/conversions`)
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          dispatch({
            type: "SET_CONVERSIONS",
            payload: res.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.projectID]);

  // Sort conversion from latest to oldest (descending order)
  const sortByTimestamp = function (a, b) {
    return b.timestamp - a.timestamp;
  };
  let conversions;
  let lastConversion;
  if (state.conversions.length) {
    // We are only interested in the latest conversion that had run or is running
    const executedStatuses = ["RUNNING", "SUCCEEDED", "FAILED"];
    try {
      conversions = state.conversions.filter((el) =>
        executedStatuses.includes(el.publishStatus)
      );
      conversions = conversions.sort(sortByTimestamp);
      lastConversion = conversions[0];
      console.log(
        `Last conversion ${lastConversion.conversionId} for project ${lastConversion.projectId} has status ${lastConversion.publishStatus}`
      );
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log(`No conversions found for project ${state.projectID}`);
  }

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
  } else if (lastConversion.publishStatus == "RUNNING") {
    return (
      <div className="qr-code-status-tab">
        <Loader type="BallTriangle" color="#005EB8" width={100} height={100} />
        <div className="qr-code-status-tab-text-box">
          <h3>
            We are currently publishing your project! It may take couple
            minutes...
          </h3>
          <h5>
            User {lastConversion.userName} triggered build on{" "}
            {moment(lastConversion.timestamp).format("DD/MM/YY HH:mm")}
          </h5>
        </div>
      </div>
    );
  } else if (lastConversion.publishStatus == "FAILED") {
    return (
      <div className="qr-code-status-tab">
        <Icon.Bug color="#005EB8" size={70} />
        <div className="qr-code-status-tab-text-box">
          <h3>Oops! Your build failed.</h3>
          <h5>
            User {lastConversion.userName} triggered build on{" "}
            {moment(lastConversion.timestamp).format("DD/MM/YY HH:mm")}
          </h5>
        </div>
      </div>
    );
  }
  // Default successful page
  return (
    <div>
      <Container>
        <h4 className="">QR Code Using Instructions</h4>
        <p>
          To run the prototype your device, please do the following steps:
          <br/>
        </p>
        <hr/>
        <Container>
          <Row>
            {/* Instruction column */}
            <Col md={8} sm={12} xs={12}>
              {/* Instruction content row */}
              <Row>
                <ol className="ordered-list">
                  <li>
                    Install the "
                      <a href="https://expo.io/tools">Expo Go</a>
                    " app on your mobile device.
                    </li>
                  <li>Sign into your Expo account, or create one if you don't already have one.</li>
                  <li>
                    Add yourself to the ImagineThis Expo organisation by entering in your account's
                    email via the text box below. If you're already a member, you can skip this step and the next.
                    </li>
                  <li>
                    Go to your email and accept the invitation to the organisation.
                    </li>
                  <li>Open your device's built-in camera app and point it at the QR code on this page.</li>

                  <li>A notification will appear saying to open the build in Expo. Click on this.</li>
                  <li>The expo app should then open and the prototype should begin to run on your device.</li>
                </ol>
              </Row>
              {/* Input field row */}
              <Form onSubmit={sendEmail} >
                <span className="input-email-text">Enter Expo Email Address: </span>
                <Form.Group as={Row} >
                  <Col>
                    <InputGroup className="input-email-group">
                      <FormControl
                        ref={inputEl}
                        aria-describedby="basic-addon1"
                        placeholder="example@example.com"
                        className="input-email-field"
                      />
                      <InputGroup.Append>
                        <Button type="submit" className="input-email-field">
                          Submit
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Col>
                </Form.Group>
              </Form>
            </Col>
            {/* QR Code column */}
            <Col md={4} sm={12} xs={12} className="align-self-center">
              <div className="col-div">
                <a href={qrCodeLink}>
                  <QRCode
                    className="qrcode"
                    value={qrCodeLink}
                  />
                </a>
              </div>
              <div className="mobile-last-built-div" >
                Last build:
                {moment(lastConversion.timestamp).format("DD/MM/YY HH:mm")}
                {' '}
                by
                {lastConversion.userName}
              </div>
              {state.successModal && (
              <div className="d-flex justify-content-center align-items-center loader-background">
                <div className="d-flex align-items-center flex-column loader-wrapper">
                  <h4>Invitation sent successfully!</h4>
                  <p className="lead">Check your email</p>
                  <Icon.CheckCircleFill color="green" size={40} />
                </div>
              </div>
            )}

            {state.errorModal && (
              <div className="d-flex justify-content-center align-items-center loader-background">
                <div className="d-flex align-items-center flex-column loader-wrapper">
                  <h4>Error sending invitation!</h4>
                  <p className="lead">Please try again</p>
                  <Icon.ExclamationCircleFill color="red" size={40} />
                </div>
              </div>
            )}
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  )
};

export default QRTab;
