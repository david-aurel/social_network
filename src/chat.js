import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";

export default function Chat() {
    const chatMessages = useSelector(state => state.msgs);
    console.log("chatMessages:", chatMessages);

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("new chat message", e.target.value);
            e.target.value = "";
        }
    };

    const elemRef = useRef();

    useEffect(() => {
        let { scrollHeight, clientHeight } = elemRef.current;
        elemRef.current.scrollTop = scrollHeight - clientHeight;
    }, []);

    return (
        <div className="chat">
            <h1>CHATROOM!</h1>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map(message => (
                        <p key={message.id}>{message.msg}</p>
                    ))}
            </div>
            <textarea
                placeholder="add your message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
