import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import ProfilePic from "./profilePic";
import Upload from "./uploader";
import Profile from "./profile";
import OtherProfile from "./otherProfile";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
    }
    async componentDidMount() {
        const { data } = await axios.get("/getUser");
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
    setBio(bio) {
        this.setState({
            bio: bio
        });
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    {/* Header */}
                    <nav>
                        <div className="logo">
                            <img src="icons/logo.svg" />
                        </div>
                        <ProfilePic
                            className="profilePicIcon"
                            first={this.state.first}
                            last={this.state.last}
                            toggleUpload={() => this.toggleUpload()}
                        />
                    </nav>

                    {/* Uploader */}
                    {this.state.uploaderIsVisible && (
                        <Upload
                            setProfilePicUrl={url => this.setProfilePicUrl(url)}
                            toggleUpload={() => this.toggleUpload()}
                        />
                    )}

                    {/* Own Profile */}
                    <Route
                        exact
                        path="/"
                        render={() => (
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
                                setBio={bio => this.setBio(bio)}
                            />
                        )}
                    />

                    {/* Other Profile */}
                    <Route path="/user/:id" component={OtherProfile} />
                </div>
            </BrowserRouter>
        );
    }
}
