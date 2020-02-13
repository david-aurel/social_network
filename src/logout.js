import React from "react";

export default function Logout({ toggleLogout, logoutIsVisible }) {
    return (
        <div
            className={`logout ${
                logoutIsVisible ? "modal-animation" : undefined
            }`}
        >
            <a href="/logout">Log out</a>
        </div>
    );
}
