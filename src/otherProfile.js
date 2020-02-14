import React, { Component, useState, useEffect } from "react";
import axios from "./axios";
import UseFriendButton from "./friendButton";
import { Link } from "react-router-dom";

export default class OtherProfile extends Component {
    constructor() {
        super();
        this.state = {};
    }

    async componentDidMount() {
        // We want to make a request to the server to get all the info about the requested user...
        let userId = this.props.match.params.id;

        const { data } = await axios.get(`/user/${userId}.json`);
        if (data.requestedUser) {
            if (data.requestedUser.id != data.ownId) {
                this.setState(data.requestedUser);
            } else {
                this.props.history.push("/");
            }
        }
        let { data: friends } = await axios.get(`/friends-of-friend/${userId}`);
        friends = Object.values(friends.friends);
        this.setState({ friends: friends });
    }
    showFriends(friends) {
        console.log(friends);
        return (
            <div className="faw-wrapper">
                <div className="friends">
                    <p className="title">
                        {friends.length > 1
                            ? friends.length + " Friends"
                            : "1 Friend"}
                    </p>
                    {friends.map((friend, idx) => (
                        <div key={idx} className="friends-profile">
                            <Link
                                to={`/user/${friend.id}`}
                                className="friends-profile-pic"
                            >
                                <img src={friend.url} />
                            </Link>
                            <Link
                                to={`/user/${friend.id}`}
                                className="friends-name"
                            >
                                {`${friend.first} ${friend.last}`}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    render() {
        return (
            <>
                <div className="profile">
                    <div className="profilePic">
                        <img src={this.state.url} />
                    </div>
                    <div className="profileNameAndBio">
                        <p className="profileName">{`${this.state.first} ${this.state.last}`}</p>
                        <p>{this.state.bio}</p>
                    </div>
                    <UseFriendButton id={this.state.id} />
                </div>
                {this.state.friends && this.showFriends(this.state.friends)}
            </>
        );
    }
}

// export default function useOtherProfile() {
//     const [userInfo, setUserInfo] = useState({});

//     useEffect(() => {
//         (async () => {
//             let userId = this.props.match.params.id;
//             console.log(this.props);
//         })();
//     }, []);

//     return (
//         <div>OtherProfile as hook</div>
//         // <>
//         //     <div className="profile">
//         //         <div className="profilePic">
//         //             <img src={userInfo.url} />
//         //         </div>
//         //         <div className="profileNameAndBio">
//         //             <p>{`${userInfo.first} ${userInfo.last}`}</p>
//         //             <p>{userInfo.bio}</p>
//         //         </div>
//         //     </div>
//         //     <UseFriendButton
//         //         id={userInfo.id}
//         //     />
//         // </>
//     );
// }
