import React, { Component } from "react";
import axios from "./axios";

export default class OtherProfile extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        // We want to make a request to the server to get all the info about the requested user...

        console.log(this.props.match.params.id);

        if (this.props.match.params.id == 6) {
            this.props.history.push("/");
        }
    }
    render() {
        return (
            <div>
                <p>Hello from other profile</p>
            </div>
        );
    }
}
