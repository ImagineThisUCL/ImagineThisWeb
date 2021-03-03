import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import "../css/notfoundpage.css";

export default class NotFoundPage extends Component {
  render() {
    return (
      <>
        <Navigation history={this.props.history} />

        <div className="container container-notfound">
          <div className="row justify-content-center">
            <div className="col-xs-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
              <div className="row justify-content-center">
                <h1 className="text-center">Resource Not Found</h1>
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
                  <Link to="/"> homepage</Link>.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}
