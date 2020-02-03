import React, { Component } from "react";
import axios from "./axios";

export default class OtherProfile extends Component {
    constructor() {
        super();
        this.state = {};
    }

    async componentDidMount() {
        // We want to make a request to the server to get all the info about the requested user...
        let userId = this.props.match.params.id;
        const { data } = await axios.get(`/getOtherUser/${userId}`);
        this.setState(data);
    }
    render() {
        return (
            <div className="profile">
                <div className="profilePic">
                    <img src={this.state.url} />
                </div>
                <div className="profileNameAndBio">
                    <p>{`${this.state.first} ${this.state.last}`}</p>
                    <p>{this.state.bio}</p>
                </div>
            </div>
        );
    }
}
