import React, { useState, useEffect } from "react";
import axios from "./axios";
import UseFriendButton from "./friendButton";
import { Link } from "react-router-dom";

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
        <div className="search">
            <div>
                <div className="search-bar-wrapper">
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={onChange}
                        className="search-bar"
                    />
                </div>
                <div className="search-container">
                    {searchResults.map((user, idx) => {
                        return (
                            <a href={`/user/${user.id}`} key={idx}>
                                <div className="search-profile" key={idx}>
                                    <div className="search-profile-pic">
                                        <img src={user.url} />
                                    </div>
                                    <div className="search-profileNameAndBio">
                                        <p className="search-name">{`${user.first} ${user.last}`}</p>
                                        <p className="search-bio">{user.bio}</p>
                                    </div>
                                </div>
                            </a>
                        );
                    })}

                    <p className="title">People you might know</p>
                    <div className="pumk-wrapper">
                        {mostRecent.map((user, idx) => {
                            return (
                                <div className="pumk-profile" key={idx}>
                                    <div>
                                        <Link to={`/user/${user.id}`}>
                                            <div className="pumk-profile-pic">
                                                <img src={user.url} />
                                            </div>
                                        </Link>
                                        <Link to={`/user/${user.id}`}>
                                            <div className="pumk-profileNameAndBio">
                                                <p className="pumk-name">{`${user.first} ${user.last}`}</p>
                                                <p className="pumk-bio">
                                                    {user.bio}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                    <UseFriendButton id={user.id} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
