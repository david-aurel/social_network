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
                <label htmlFor="file">
                    <div className="edit-profile-pic">
                        <img src="/icons/camera-icon.svg" />
                    </div>
                </label>

                <div className="edit-bio">
                    <textarea placeholder="Bio..."></textarea>
                </div>
                <input
                    name="file"
                    id="file"
                    type="file"
                    onChange={e => uploadImage(e)}
                    className="inputfile"
                />
            </div>
            <button className="done-button">Done</button>
        </div>
    );
}
