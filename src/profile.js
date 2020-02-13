import React from "react";

export default function Profile({
    first,
    last,
    profilePic,
    bio,
    setBio,
    toggleUpload
}) {
    return (
        <div className="profile">
            {profilePic}
            <div className="profileNameAndBio">
                <p className="profileName">{`${first} ${last}`}</p>
                <p>{bio}</p>
            </div>
            <button
                onClick={() => {
                    toggleUpload();
                }}
            >
                Edit Profile
            </button>
        </div>
    );
}
