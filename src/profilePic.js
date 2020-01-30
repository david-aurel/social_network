import React from "react";

export default function ProfilePic({ url, first, last, toggleUpload }) {
    return (
        <div className="profilePic" onClick={toggleUpload}>
            {url ? (
                <img src={url} alt={`${first} ${last}`} />
            ) : (
                <img src="icons/defaultProfilePic.svg" />
            )}
        </div>
    );
}
