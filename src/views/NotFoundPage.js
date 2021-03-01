import React, { Component } from "react";
import Navigation from "../components/Navigation";
import "../css/notfoundpage.css";

export default class NotFoundPage extends Component {
  render() {
    return (
      <>
        <Navigation />

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xs-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
              <div className="row justify-content-center">
                <h1 className="text-center">Oops! 😭</h1>
              </div>
              <h2 className="text-center">
                We can't seem to find what you're looking for.
              </h2>
              <ul>
                <li>
                  This could be due to an outdated link, the address being typed
                  incorrectly or the project being inexistent in our system.
                </li>
                <li>
                  You can either type the address in again or visit our
                  <a href="/"> homepage</a>.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}
