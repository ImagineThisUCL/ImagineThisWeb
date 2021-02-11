import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { AuthenticateHomePage } from "./views/AuthenticateHomePage";
import { OauthCallBackPage } from "./views/OauthCallBackPage";
import { CommentsPage } from "./views/CommentsPage";
import { WireframesPage } from "./views/WireframesPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={AuthenticateHomePage} />
          <Route exact path="/auth" component={OauthCallBackPage} />
          <Route exact path="/wireframes" component={WireframesPage} />
          <Route exact path="/comments/:projectID" component={CommentsPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
