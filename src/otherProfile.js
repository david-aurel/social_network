import React, { Component, useState, useEffect } from "react";
import axios from "./axios";
import UseFriendButton from "./friendButton";

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
    }
    render() {
        return (
            <>
                <div className="profile">
                    <div className="profilePic">
                        <img src={this.state.url} />
                    </div>
                    <div className="profileNameAndBio">
                        <p>{`${this.state.first} ${this.state.last}`}</p>
                        <p>{this.state.bio}</p>
                    </div>
                </div>
                <UseFriendButton id={this.state.id} />
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
