import React, {Component} from "react"
import Navigation from "../components/Navigation"
import Cookies from "universal-cookie"
import {DOMAIN} from '../consts'

export class CodeConvertPage extends Component{
    constructor(props) {
        super(props);
        const cookies = new Cookies();
        if(this.props.history.location.state.selected === undefined){
            window.location.href = DOMAIN
        }
        this.state = {
            selected : this.props.history.location.state.selected,
            projectID: cookies.get('projectID'),
            accessToken: cookies.get('accessToken'),
            authenticateType: cookies.get('authenticateType')
        }
    }

    render() {
        return(
            <div>
                <Navigation/>
                <div>
                    {this.state.accessToken}
                </div>
                <div>
                    {this.state.projectID}
                </div>
                {this.state.selected.map((wireframe) => (
                    <div>
                    {JSON.stringify(wireframe)}
                    </div>
                ))}
            </div>
        )
    }
}

export default CodeConvertPage
