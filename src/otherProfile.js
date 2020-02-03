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
        console.log(data.requestedUser, data.ownId);
        if (data.requestedUser) {
            if (data.requestedUser.id != data.ownId) {
                this.setState(data.requestedUser);
            }
        } else {
            this.props.history.push("/");
        }
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
