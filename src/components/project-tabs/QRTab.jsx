import React, { Component } from "react";
import QRCode from "qrcode.react";
import "../../css/project-tabs/QRtab.css";
import "react-bootstrap";

class QRTab extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="container d-none d-xl-block d-lg-block d-xl-none d-xl-block d-md-block d-lg-none">
          <div id="qr-div">
            <a href="exp://exp.host/@imaginethis/testing-application-imaginethis">
              <QRCode className="qrcode" style={{ height: "150px", width: "150px", margin: "0px" }} value="exp://exp.host/@imaginethis/testing-application-imaginethis" />
            </a>
          </div>
          {/* this is the instruction for the PC device */}
          <div id="instruction-div" className="">
            <h3 className="qrtab-title">QR Code  Instructions</h3>
            {/* <p>In order to successfully run the prototype, please do the following steps</p> */}
            <ol className="pc-ordered-list">
              <p>To run this prototype on your device, do the following steps:</p>

              <li>
                Install the "
                <a href="https://expo.io/tools">Expo Go</a>
                " app on your mobile device.
              </li>
              {/* <li>After opening the App, select the "Scan QR Code" option on the top of the sceen</li> */}
              <li>Open your device's built-in camera app and point it at the QR code on this page</li>
              <li>A notification will appear saying to open the build in Expo. Click on this.</li>
              <li>The expo app should then open and the prototype should begin to run on your device.</li>
              <p>
                <br />
                Please check for other related details：
                {' '}
                <a href="https://expo.io/">expo.io</a>
              </p>
            </ol>
          </div>

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
              <li>Login into the "Expo Go" application</li>
              <li>Click the QR code at the bottom of the screen. This should open the expo app</li>
              <li>The prototype will then begin running on your device</li>
            </ol>
            <p className="mobile-ordered-p mobile-ordered-list">

              Please check for other related details：
              {' '}
              <a href="https://expo.io/">expo.io</a>
            </p>
          </div>
          <div className="mobile-qr">
            <a href="exp://exp.host/@imaginethis/testing-application-imaginethis">
              <QRCode className=" qrcode" style={{ height: "100px", width: "100px", margin: "0px" }} value="exp://exp.host/@imaginethis/testing-application-imaginethis" />
            </a>
          </div>
        </div>
      </div>

    );
  }
}

export default QRTab;
