import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "./actions";

export default function UseHotOrNot() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.hotornot);
    let [idx, setIdx] = useState(1);

    useEffect(() => {
        (async () => {
            dispatch(action.receiveHotOrNotUser());
        })();
    }, [idx]);

    if (!user) {
        return null;
    }
    return (
        <>
            {user.length && (
                <div className="hotornot">
                    <div className="profilePic">
                        <img src={user[idx].url} />
                    </div>
                    <div className="profileNameAndBio">
                        <p>{`${user[idx].first} ${user[idx].last}`}</p>
                        <p>{user[idx].bio}</p>
                    </div>
                </div>
            )}
            <button
                onClick={e => {
                    setIdx(idx - 1);
                }}
            >
                prev
            </button>
            <button
                onClick={e => {
                    dispatch(action.sendFriendRequest(user[idx].id));
                }}
            >
                Send Friend Request
            </button>
            <button
                onClick={e => {
                    setIdx(idx + 1);
                }}
            >
                next
            </button>
        </>
    );
}
