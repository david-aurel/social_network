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
                    <h4>Reset Password</h4>
                    <p>Please enter the email you registered with</p>
                    <input
                        name="email"
                        onChange={e => this.handleChange(e)}
                        placeholder="email"
                    />
                    <button onClick={e => this.checkEmail()}>submit</button>
                </div>
            );
        } else if (step == 2) {
            return (
                <div>
                    <p>reset password step 2</p>
                    <button onClick={e => this.changeState(3)}>
                        change to state 3
                    </button>
                </div>
            );
        } else if (step == 3) {
            return (
                <div>
                    <p>reset password step 3</p>
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
    checkEmail() {
        console.log("email checking...");
        axios.post("/reset/start", {
            email: this.state.email
        });
    }
    render() {
        return (
            <div>
                <p>state:{this.state.step}</p>
                {this.showCurrent(this.state.step)}
            </div>
        );
    }
}
