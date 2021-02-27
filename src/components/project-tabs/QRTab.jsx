import React, { Component } from "react";
import QRCode from "qrcode.react";
import "../../css/project-tabs/QRtab.css";
import "react-bootstrap";

class QRTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="container d-none d-xl-block d-lg-block d-xl-none d-xl-block d-md-block d-lg-none">
          <div id="QRdiv">
            <a href="exp://exp.host/@imaginethis/testing-application-imaginethis">
              <QRCode className="QRCode" style={{ height: "150px", width: "150px", margin: "0px" }} value="exp://exp.host/@imaginethis/testing-application-imaginethis" />
            </a>
          </div>
          {/* this is the instruction for the PC device */}
          <div id="instructionDiv" className="">
            <h3 className="QRTab_Title">QR Code  Instructions</h3>
            {/* <p>In order to successfully run the prototype, please do the following steps</p> */}
            <ol className="PC_ordered_list">
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
          <div className="Mobile_instructionDiv">
            <h3 className="Mobile_QRTab_Title">QR Code Using Instructions</h3>
            <p className="mobile_ordered_p mobile_ordered_list">To run the prototype your device, please do the following steps:</p>
            <ol className="mobile_ordered_list">


              <li>
                Install the "
                <a href="https://expo.io/tools">Expo Go</a>
                " on app on your mobile device
              </li>
              <li>Then click on the QR Code on button of this page. This should open the expo app</li>
              <li>The prototype will then begin running on your device</li>
              <p>
                <br />
                Please check for other related details：
                {' '}
                <a href="https://expo.io/">expo.io</a>
              </p>
            </ol>
          </div>
          <div className="Mobile_QR">
            <a href="exp://exp.host/@imaginethis/testing-application-imaginethis">
              <QRCode className=" QRCode" style={{ height: "100px", width: "100px", margin: "0px" }} value="exp://exp.host/@imaginethis/testing-application-imaginethis" />
            </a>
          </div>
        </div>
      </div>

    );
  }
}

export default QRTab;
