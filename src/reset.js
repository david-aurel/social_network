import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Reset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        };
    }
    showCurrent(step) {
        if (step == 1) {
            return (
                <div>
                    <p>Please enter the email you registered with</p>
                    <input
                        name="email"
                        onChange={e => this.handleChange(e)}
                        placeholder="email"
                    />
                    <button onClick={e => this.sendCode()}>submit</button>
                </div>
            );
        } else if (step == 2) {
            return (
                <div>
                    <div>
                        <p>please enter the code you received</p>
                        <input
                            name="code"
                            onChange={e => this.handleChange(e)}
                            placeholder="code"
                        />
                    </div>
                    <div>
                        <p>please enter a new password</p>
                        <input
                            name="pass"
                            onChange={e => this.handleChange(e)}
                            placeholder="new password"
                        />
                        <button onClick={e => this.setNewPass()}>submit</button>
                    </div>
                </div>
            );
        } else if (step == 3) {
            return (
                <div>
                    <p>Success!</p>
                    <Link to="/login">Log in</Link>
                </div>
            );
        }
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    sendCode() {
        axios
            .post("/reset/start", {
                email: this.state.email
            })
            .then(({ data }) => {
                if (data.success) {
                    this.setState({
                        step: 2,
                        error: false
                    });
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    setNewPass() {
        axios
            .post("/reset/verify", {
                email: this.state.email,
                code: this.state.code,
                pass: this.state.pass
            })
            .then(({ data }) => {
                if (data.success) {
                    this.setState({
                        step: 3,
                        error: false
                    });
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
            <div>
                <h4>Reset Password</h4>
                {this.state.error && (
                    <div className="error">
                        something went wrong, please try again.
                    </div>
                )}
                {this.showCurrent(this.state.step)}
            </div>
        );
    }
}
