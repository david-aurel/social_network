import React from "react";
import axios from "./axios";

export default function upload({
    setProfilePicUrl,
    toggleUpload,
    uploaderIsVisible
}) {
    async function uploadImage(e) {
        toggleUpload();
        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        const { data } = await axios.post(`/uploadProfilePic/`, formData);
        setProfilePicUrl(data.imageUrl);
    }
    return (
        <div
            className={`edit-profile ${
                uploaderIsVisible ? "modal-animation" : undefined
            }`}
        >
            <button onClick={toggleUpload} className="cancel-button">
                cancel
            </button>

            <div className="edit-profile-content">
                <div className="edit-profile-pic">
                    <img src="/icons/camera-icon.svg" />
                </div>
                <div className="edit-bio">
                    <textarea placeholder="Bio..."></textarea>
                </div>
            </div>
            <button className="done-button">Done</button>
            <input type="file" onChange={e => uploadImage(e)} />
        </div>
    );
}
