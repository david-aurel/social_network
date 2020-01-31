import React from "react";
// import ProfilePic from "./profilePic";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    render() {
        return (
            <div className="profile">
                {this.props.profilePic}
                <div className="profileNameAndBio">
                    <p>{`${this.props.first} ${this.props.last}`}</p>
                    <div>BIO</div>
                </div>
            </div>
        );
    }
}
