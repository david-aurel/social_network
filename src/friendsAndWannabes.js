import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "./actions";

export default function UseFriendsAndWannabes() {
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            console.log("friendsAndWannabes");
            dispatch(action.receiveFriendsAndWannabes());
        })();
    });
    return <div>FRIENDS AND WANNABES</div>;
}
