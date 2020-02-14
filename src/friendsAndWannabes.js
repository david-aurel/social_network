import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as action from "./actions";

export default function UseFriendsAndWannabes() {
    const dispatch = useDispatch();
    const friends = useSelector(
        state =>
            state.friendsWannabes &&
            state.friendsWannabes.filter(user => user.accepted)
    );
    const wannabes = useSelector(
        state =>
            state.friendsWannabes &&
            state.friendsWannabes.filter(user => !user.accepted)
    );

    useEffect(() => {
        (async () => {
            dispatch(action.receiveFriendsAndWannabes());
        })();
    }, []);
    function wannabesContent() {
        if (wannabes.length) {
            return (
                <div className="wannabes">
                    <p className="title">{wannabes.length} Friend Requests</p>

                    <div className="wannabe-profiles-wrapper">
                        {wannabes.map(wannabe => (
                            <div key={wannabe.id} className="wannabe-profile">
                                <Link to={`/user/${wannabe.id}`}>
                                    <div className="wannabe-profile-pic">
                                        <img src={wannabe.url} />
                                    </div>
                                </Link>
                                <div className="profile-buttons">
                                    <button
                                        className="small-accept-button"
                                        onClick={e =>
                                            dispatch(
                                                action.acceptFriendRequest(
                                                    wannabe.id
                                                )
                                            )
                                        }
                                    >
                                        accept
                                    </button>
                                    <button
                                        className="small-delete-button"
                                        onClick={e =>
                                            dispatch(
                                                action.endFriendship(wannabe.id)
                                            )
                                        }
                                    >
                                        delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    }

    function friendsContent() {
        if (friends.length) {
            return (
                <div className="friends">
                    <p className="title">{friends.length} Friends</p>
                    {friends &&
                        friends.map(friend => (
                            <div key={friend.id} className="friends-profile">
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
                                <button
                                    className="remove-friends-button"
                                    onClick={e =>
                                        dispatch(
                                            action.endFriendship(friend.id)
                                        )
                                    }
                                >
                                    remove
                                </button>
                            </div>
                        ))}
                </div>
            );
        } else {
            return (
                <div className="friends">
                    <p className="title">No friends yet</p>
                </div>
            );
        }
    }
    return (
        <div className="faw-wrapper">
            {wannabes && wannabesContent()}

            {friends && friendsContent()}
        </div>
    );
}
