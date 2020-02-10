import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "./actions";

export default function UseHotOrNot() {
    const dispatch = useDispatch();
    const user = useSelector(state => {
        state.user && state.user;
    });

    useEffect(() => {
        (async () => {
            dispatch(action.receiveHotOrNotUser());
        })();
    }, []);

    return (
        <>
            {user && (
                <div className="hotornot">
                    <div className="profilePic">
                        <img src={user.url} />
                    </div>
                    <div className="profileNameAndBio">
                        <p>{`${user.first} ${user.last}`}</p>
                    </div>
                </div>
            )}
        </>
    );
}
