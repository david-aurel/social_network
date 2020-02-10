import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Users() {
    const [mostRecent, setMostRecent] = useState([]);
    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        if (!input) {
            (async () => {
                setSearchResults([]);
                try {
                    const { data } = await axios.get("/mostRecentUsers");
                    setMostRecent(data);
                } catch (err) {
                    console.log("err in mostRecentUsers Users-Hook:", err);
                }
            })();
        } else if (input.replace(/\s/g, "").length) {
            let abort;
            (async () => {
                try {
                    const { data } = await axios.get(
                        `/getUsersBySearch/${input}`
                    );
                    if (!abort) {
                        setSearchResults(data);
                    }
                } catch (err) {
                    console.log("err in SearchUser Users-Hook", err);
                }
            })();
            return () => {
                abort = true;
            };
        }
    }, [input]);
    const onChange = async ({ target }) => {
        setInput(target.value);
    };
    return (
        <div>
            <p>Find people</p>
            {!input && (
                <div>
                    <p>Check out who just joined!</p>
                    {mostRecent.map((user, idx) => {
                        return (
                            <a
                                className="searchResult"
                                href={`/user/${user.id}`}
                                key={idx}
                            >
                                <div className="profile" key={idx}>
                                    <div className="profilePic">
                                        <img src={user.url} />
                                    </div>
                                    <div className="profileNameAndBio">
                                        <p>{`${user.first} ${user.last}`}</p>
                                        <p>{user.bio}</p>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            )}
            <p>Are you looking for someone in particular?</p>
            <input type="text" placeholder="Enter name" onChange={onChange} />
            {searchResults.map((user, idx) => {
                return (
                    <a
                        className="searchResult"
                        href={`/user/${user.id}`}
                        key={idx}
                    >
                        <div className="profile" key={idx}>
                            <div className="profilePic">
                                <img src={user.url} />
                            </div>
                            <div className="profileNameAndBio">
                                <p>{`${user.first} ${user.last}`}</p>
                                <p>{user.bio}</p>
                            </div>
                        </div>
                    </a>
                );
            })}
        </div>
    );
}
