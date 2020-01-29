import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submit() {
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                pass: this.state.pass
            })
            .then(({ data }) => {
                if (data.success) {
                    //it worked!
                    location.replace("/");
                } else {
                    //failure!
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
            <div className="registration">
                <h4>Register</h4>
                {this.state.error && (
                    <div className="error">
                        something went wrong, please try again.
                    </div>
                )}
                <input
                    name="first"
                    onChange={e => this.handleChange(e)}
                    placeholder="first name"
                />
                <input
                    name="last"
                    onChange={e => this.handleChange(e)}
                    placeholder="last name"
                />
                <input
                    name="email"
                    onChange={e => this.handleChange(e)}
                    type="email"
                    placeholder="email"
                />
                <input
                    name="pass"
                    onChange={e => this.handleChange(e)}
                    type="password"
                    placeholder="password"
                />
                <button onClick={e => this.submit()}>register</button>
                <Link to="/login">Click here to log in</Link>
            </div>
        );
    }
}
