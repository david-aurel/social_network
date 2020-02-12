import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";
import ProfilePic from "./profilePic";

export default function Chat() {
    const chatMessages = useSelector(state => state.msgs);
    console.log("chatMessages:", chatMessages);

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
    }, [chatMessages]);

    return (
        <div className="chat">
            <h1>CHATROOM!</h1>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((message, idx) => (
                        <div className="chat-msg" key={idx}>
                            <ProfilePic
                                className="chatProfilePic"
                                first={message.first}
                                last={message.last}
                                url={message.url}
                            />

                            <span>{`${message.first} ${message.last}:`}</span>
                            <span>{message.msg}</span>
                            <span>{`(${message.created_at})`}</span>
                        </div>
                    ))}
            </div>
            <textarea
                placeholder="add your message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
