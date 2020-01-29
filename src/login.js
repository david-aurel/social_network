import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
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
            .post("/login", {
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
                        err: true
                    });
                }
            });
    }
    render() {
        return (
            <div className="login">
                <h4>Login</h4>
                {this.state.err && (
                    <div className="error">
                        something went wrong, please try again.
                    </div>
                )}
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
                    placeholder="pass"
                />
                <button onClick={e => this.submit(e)}>Log in</button>
                <Link to="/">Register</Link>
                <Link to="/reset">Forgot password?</Link>
            </div>
        );
    }
}
