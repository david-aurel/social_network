import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";
import ProfilePic from "./profilePic";
import { Link } from "react-router-dom";

export default function Chat({ id }) {
    const chatMessages = useSelector(state => state.msgs);
    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("chatMessage", e.target.value);

            e.target.value = "";
        }
    };

    const elemRef = useRef();

    useEffect(() => {
        let { scrollHeight, clientHeight } = elemRef.current;
        elemRef.current.scrollTop = scrollHeight - clientHeight;
    }, [chatMessages, id]);

    return (
        <div className="chat">
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((message, idx) => (
                        <div
                            className={`chat-msg ${
                                message.id == id ? "self" : "other"
                            }`}
                            key={idx}
                        >
                            <Link
                                to={`/user/${message.id}`}
                                className="chat-profile-pic"
                            >
                                <img src={message.url} />
                            </Link>
                            <p className="chat-msg-bubble">{message.msg}</p>
                        </div>
                    ))}
            </div>
            <textarea
                className="chat-input"
                placeholder="Message..."
                onKeyDown={keyCheck}
                rows="1"
            ></textarea>
        </div>
    );
}
