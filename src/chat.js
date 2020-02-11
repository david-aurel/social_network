import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";

export default function Chat() {
    const chatMessages = useSelector(state => state.chatMessages);
    console.log("chatMessages:", chatMessages);

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("My amazing chat message", e.target.value);
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
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
            </div>
            <textarea
                placeholder="add your message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
