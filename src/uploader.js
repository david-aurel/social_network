import React from "react";
import axios from "./axios";

export default function upload({
    setProfilePicUrl,
    toggleUpload,
    uploaderIsVisible,
    setBio,
    bio
}) {
    let newBio = "";

    async function uploadImage(e) {
        toggleUpload();
        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        const { data } = await axios.post(`/uploadProfilePic/`, formData);
        setProfilePicUrl(data.imageUrl);
    }
    async function handleSubmit() {
        if (newBio) {
            await axios.post("/updateBio", { bio: newBio });
            setBio(newBio);
            toggleUpload();
        }
    }
    function handleChange(e) {
        newBio = e.target.value;
    }
    return (
        <div
            className={`edit-profile ${
                uploaderIsVisible ? "modal-animation" : undefined
            }`}
        >
            <p onClick={toggleUpload} className="cancel-button">
                cancel
            </p>

            <div className="edit-profile-content">
                <label htmlFor="file">
                    <div className="edit-profile-pic">
                        <img src="/icons/camera-icon.svg" />
                    </div>
                </label>

                <div className="edit-bio">
                    <textarea
                        onChange={e => {
                            handleChange(e);
                        }}
                        placeholder="Bio.."
                    ></textarea>
                </div>
                <input
                    name="file"
                    id="file"
                    type="file"
                    onChange={e => uploadImage(e)}
                    className="inputfile"
                />
            </div>
            <button
                onClick={() => {
                    handleSubmit();
                }}
                className="done-button"
            >
                Done
            </button>
        </div>
    );
}
