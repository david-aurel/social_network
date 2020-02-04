import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Users() {
    const [mostRecent, setMostRecent] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/mostRecentUsers");
                await setMostRecent(data);
                console.log(data);
            } catch (err) {
                console.log("err in FindPeople Hook:", err);
            }
        })();
    }, []);
    return (
        <div>
            <p>Find people</p>
            <p>Check out who just joined!</p>
            {mostRecent.map((user, idx) => (
                <div key={idx} className="profile">
                    <div className="profilePic">
                        <img src={user.url} />
                    </div>
                    <div className="profileNameAndBio">
                        <p>{`${user.first} ${user.last}`}</p>
                        <p>{user.bio}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
