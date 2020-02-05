import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function UseFriendButton({ id }) {
    const [buttonText, setButtonText] = useState("");
    const buttonTextArr = [
        "make friend request",
        "cancel friend request",
        "accept friend request",
        "end friendship"
    ];
    useEffect(() => {
        (async () => {
            if (id) {
                const { data } = await axios.get(`/friends-status/${id}`);
                console.log("data:", data);

                if (!data.length) {
                    setButtonText(buttonTextArr[0]);
                } else if (!data.accepted) {
                    setButtonText(buttonTextArr[1]);
                } else {
                    setButtonText(buttonTextArr[2]);
                }
            }
        })();
    }, [id]);
    async function handleSubmit() {
        let url;
        if (buttonText == buttonTextArr[0]) {
            url = "/make-friend-request";
        } else if (
            buttonText == buttonTextArr[1] ||
            buttonText == buttonTextArr[3]
        ) {
            url = "/end-friendship";
        } else if (buttonText == buttonTextArr[2]) {
            url = "/accept-friend-request";
        }

        const { data } = await axios.post(`${url}/${id}`);
        if (data == "OK") {
            if (buttonText == buttonTextArr[0]) {
                setButtonText(buttonTextArr[1]);
            } else if (buttonText == buttonTextArr[1]) {
                setButtonText(buttonTextArr[0]);
            } else if (buttonText == buttonTextArr[2]) {
                setButtonText(buttonTextArr[3]);
            } else if (buttonText == buttonTextArr[3]) {
                setButtonText(buttonTextArr[0]);
            }
        }
    }
    return <button onClick={handleSubmit}>{buttonText}</button>;
}
