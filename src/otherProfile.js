import React, { Component } from "react";
import axios from "./axios";

export default class OtherProfile extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        // We want to make a request to the server to get all the info about the requested user...
    }
    render() {
        return (
            <div>
                <p>Hello from other profile</p>
            </div>
        );
    }
}
