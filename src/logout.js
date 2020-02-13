import React from "react";

export default function Logout({ toggleLogout, logoutIsVisible }) {
    return (
        <div
            className={`logout ${
                logoutIsVisible ? "modal-animation" : undefined
            }`}
        >
            <p onClick={toggleLogout} className="cancel-button">
                cancel
            </p>
            <a href="/logout">
                <button>Log out</button>
            </a>
        </div>
    );
}
