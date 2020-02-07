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
        <div>
            <p>FRIENDS:</p>
            {friends &&
                friends.map(friend => (
                    <div key={friend.id}>{friend.first}</div>
                ))}

            <p>WANNABES</p>
            {wannabes &&
                wannabes.map(wannabes => (
                    <div key={wannabes.id}>{wannabes.first}</div>
                ))}
        </div>
    );
}
