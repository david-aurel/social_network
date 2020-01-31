import React from "react";
import BioEditor from "./bioEditor";

export default function Profile({ first, last, profilePic, bio, setBio }) {
    return (
        <div className="profile">
            {profilePic}
            <div className="profileNameAndBio">
                <p>{`${first} ${last}`}</p>
                <BioEditor bio={bio} setBio={setBio} />
            </div>
        </div>
    );
}
