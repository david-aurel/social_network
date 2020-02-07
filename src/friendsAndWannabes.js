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

    if (!friends) {
        return <h1>nope</h1>;
    }
    return (
        <>
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

            <p>people that want to be your friends:</p>
            {wannabes &&
                wannabes.map(wannabe => (
                    <div key={wannabe.id} className="profile">
                        <div className="profilePic">
                            <img src={wannabe.url} />
                        </div>
                        <div className="profileNameAndBio">
                            <p>{`${wannabe.first} ${wannabe.last}`}</p>
                            <button
                                onClick={e =>
                                    dispatch(
                                        action.acceptFriendRequest(wannabe.id)
                                    )
                                }
                            >
                                accept friend request
                            </button>
                        </div>
                    </div>
                ))}
        </>
    );
}
