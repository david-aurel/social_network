import React from "react";

export default function ProfilePic({
    className,
    url,
    first,
    last,
    toggleUpload
}) {
    return (
        <div className={className} onClick={toggleUpload}>
            {url ? (
                <img src={url} alt={`${first} ${last}`} />
            ) : (
                <div className="default-profile-pic"></div>
            )}
        </div>
    );
}
