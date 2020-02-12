import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
                    <p className="wannabes-title">
                        {wannabes.length} Friend Requests
                    </p>

                    <div className="wannabe-profiles-wrapper">
                        {wannabes.map(wannabe => (
                            <div key={wannabe.id} className="wannabe-profile">
                                <div className="wannabe-profile-pic">
                                    <img src={wannabe.url} />
                                </div>
                                <div className="profile-buttons">
                                    <button
                                        className="accept-button"
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
                                        className="delete-button"
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
    return (
        <>
            {wannabes && wannabesContent()}
            <p>your friends:</p>
            {friends &&
                friends.map(friend => (
                    <div key={friend.id} className="profile">
                        <div className="profilePic">
                            <img src={friend.url} />
                        </div>
                        <div className="profileNameAndBio">
                            <p>{`${friend.first} ${friend.last}`}</p>
                            <button
                                onClick={e =>
                                    dispatch(action.endFriendship(friend.id))
                                }
                            >
                                end friendship
                            </button>
                        </div>
                    </div>
                ))}
        </>
    );
}
