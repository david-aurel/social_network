import React from "react";
import axios from "./axios";
import ProfilePic from "./profilePic";
import Upload from "./uploader";
import Profile from "./profile";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
    }
    async componentDidMount() {
        const { data } = await axios.get("/user");
        this.setState(data);
    }
    toggleUpload() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }
    setProfilePicUrl(url) {
        this.setState({
            url: url
        });
    }
    render() {
        return (
            <div>
                <nav>
                    <div className="logo">
                        <img src="icons/logo.svg" />
                    </div>
                    <ProfilePic
                        className="profilePicIcon"
                        url={this.state.url}
                        first={this.state.first}
                        last={this.state.last}
                        toggleUpload={() => this.toggleUpload()}
                    />
                </nav>
                {this.state.uploaderIsVisible && (
                    <Upload
                        setProfilePicUrl={url => this.setProfilePicUrl(url)}
                        toggleUpload={() => this.toggleUpload()}
                    />
                )}
                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    profilePic={
                        <ProfilePic
                            className="profilePic"
                            id={this.state.id}
                            first={this.state.first}
                            last={this.state.last}
                            url={this.state.url}
                            toggleUpload={() => this.toggleUpload()}
                        />
                    }
                    bio={this.state.bio}
                />
            </div>
        );
    }
}
