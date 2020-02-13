import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Reset from "./reset";
import { Login, Registration } from "./auth";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <HashRouter>
                <div className="welcome">
                    <div className="header">
                        <h4>social network</h4>
                    </div>
                    <div className="auth-menu">
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Route path="/reset" component={Reset} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}
