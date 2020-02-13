import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function UseFriendButton({ id }) {
    const [buttonText, setButtonText] = useState("");
    const buttonTextArr = [
        "Add Friend",
        "Cancel request",
        "accept",
        "End friendship",
        "delete"
    ];
    useEffect(() => {
        (async () => {
            if (id) {
                const { data } = await axios.get(`/friends-status/${id}`);
                console.log("data:", data);

                if (!data.rows) {
                    setButtonText(buttonTextArr[0]);
                } else if (!data.rows.accepted) {
                    if (data.rows.sender_id == data.ownId) {
                        setButtonText(buttonTextArr[1]);
                    } else {
                        setButtonText(buttonTextArr[2]);
                    }
                } else if (data.rows.accepted) {
                    setButtonText(buttonTextArr[3]);
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
            buttonText == buttonTextArr[3] ||
            buttonText == buttonTextArr[4]
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
            } else if (buttonText == buttonTextArr[3] || buttonTextArr[4]) {
                setButtonText(buttonTextArr[0]);
            }
        }
    }

    if (buttonText == buttonTextArr[2]) {
        return (
            <div className="profile-button-wrapper">
                <button
                    className="accept-button double-button"
                    onClick={handleSubmit}
                >
                    {buttonTextArr[2]}
                </button>
                <button
                    className="delete-button double-button"
                    onClick={async () => {
                        const { data } = await axios.post(
                            `/end-friendship/${id}`
                        );
                        if (data == "OK") {
                            setButtonText(buttonTextArr[0]);
                        }
                    }}
                >
                    {buttonTextArr[4]}
                </button>
            </div>
        );
    } else {
        return (
            <div className="profile-button-wrapper">
                <button className="single-button" onClick={handleSubmit}>
                    {buttonText}
                </button>
            </div>
        );
    }
}
