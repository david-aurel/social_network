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
            <button onClick={toggleUpload}>cancel</button>
            <p>Want to change your image?</p>
            <input type="file" onChange={e => uploadImage(e)} />
        </div>
    );
}
