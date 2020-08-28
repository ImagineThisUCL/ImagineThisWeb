import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {AuthenticateHomePage} from "./views/AuthenticateHomePage"
import OauthCallBackPage from "./views/OauthCallBackPage"
import {WireframesPage} from "./views/WireframesPage"
import {CodeConvertPage} from "./views/CodeConvertPage"

import { Route, Switch } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path='/' component={AuthenticateHomePage}/>
                <Route exact path='/auth' component={OauthCallBackPage}/>
                <Route exact path='/wireframes' component={WireframesPage}/>
                <Route exact path='/convert' component={CodeConvertPage}/>
            </Switch>
        </div>
    );
}

export default App;
