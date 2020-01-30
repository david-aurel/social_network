import React from "react";
import axios from "./axios";

export default function upload({ setProfilePicUrl, toggleUpload }) {
    async function uploadImage(e) {
        toggleUpload();
        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        const { data } = await axios.post(`/uploadProfilePic/`, formData);
        setProfilePicUrl(data.imageUrl);
    }
    return (
        <div>
            <p>Want to change your image?</p>
            <input type="file" onChange={e => uploadImage(e)} />
        </div>
    );
}
