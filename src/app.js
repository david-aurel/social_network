import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import ProfilePic from "./profilePic";
import Upload from "./uploader";
import Profile from "./profile";
import OtherProfile from "./otherProfile";
import Users from "./findPeople";
import UseFriendsAndWannabes from "./friendsAndWannabes";
import HotOrNot from "./hotornot";
import Chat from "./chat";

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
                {/* Uploader */}

                <Upload
                    setProfilePicUrl={url => this.setProfilePicUrl(url)}
                    toggleUpload={() => this.toggleUpload()}
                    uploaderIsVisible={this.state.uploaderIsVisible}
                    setBio={bio => this.setBio(bio)}
                />

                {/* dimmed background */}
                <div
                    className={
                        this.state.uploaderIsVisible
                            ? "dimmed-background"
                            : undefined
                    }
                ></div>
                {/* Header */}
                <div className="header">
                    <h4>social network</h4>
                </div>

                {/* Own Profile */}
                <Route
                    exact
                    path="/"
                    render={() => (
                        <>
                            <div
                                className="burger-icon"
                                onClick={() => {
                                    this.toggleUpload();
                                }}
                            >
                                <img src="/icons/burger-icon.svg" />
                            </div>
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
                                toggleUpload={() => this.toggleUpload()}
                            />
                            <UseFriendsAndWannabes />
                        </>
                    )}
                />

                {/* Other Profile */}
                <Route
                    path="/user/:id"
                    render={props => (
                        <OtherProfile
                            key={props.match.url}
                            match={props.match}
                            history={props.history}
                        />
                    )}
                />

                {/* Find People */}
                <Route path="/users" component={Users} />

                {/* Friends and Wannabes */}
                <Route path="/friends" component={UseFriendsAndWannabes} />

                {/* Hot or not */}
                <Route path="/hotornot" component={HotOrNot} />

                {/* Chat */}
                <Route path="/chat" component={Chat} />

                {/* Nav */}
                <nav>
                    <div>
                        <Link to="/chat">
                            <img src="/icons/chat-icon.svg" />
                        </Link>
                    </div>
                    <div className="findPeople">
                        <Link to="/users">
                            <img src="/icons/search-icon.svg" />
                        </Link>
                    </div>
                    <ProfilePic
                        className="profilePicIcon"
                        first={this.state.first}
                        last={this.state.last}
                        toggleUpload={() => this.toggleUpload()}
                        url={this.state.url}
                    />
                </nav>
            </BrowserRouter>
        );
    }
}
