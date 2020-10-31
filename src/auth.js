import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export const Login = wrapInAuthForm(LoginForm, "/login");
export const Registration = wrapInAuthForm(RegistrationForm, "/register");

function wrapInAuthForm(Component, url) {
    return class AuthForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
            this.url = url;
        }
        handleInput(e) {
            // gather value from changed form field
            this.setState({
                [e.target.name]: e.target.value,
            });
        }
        handleSubmit() {
            // make POST request to this.url and handle response
            axios.post(this.url, this.state).then(({ data }) => {
                if (data.success) {
                    //it worked!
                    location.replace("/");
                } else {
                    //failure!

                    this.setState({
                        error: true,
                    });
                }
            });
        }
        render() {
            return (
                <Component
                    error={this.state.error}
                    handleInput={(e) => this.handleInput(e)}
                    handleSubmit={(e) => this.handleSubmit(e)}
                />
            );
        }
    };
}

function LoginForm({ handleInput, handleSubmit, error }) {
    return (
        <div className="login">
            <h2>Login</h2>
            {error && (
                <div className="error">
                    something went wrong, please try again.
                </div>
            )}
            <input
                name="email"
                onChange={handleInput}
                type="email"
                placeholder="email"
            />
            <input
                name="pass"
                onChange={handleInput}
                type="password"
                placeholder="pass"
            />
            <button onClick={handleSubmit}>Log in</button>
            <Link to="/">No account? Sign up</Link>
            <Link id="forgot-password" to="/reset">
                Forgot password?
            </Link>
        </div>
    );
}

function RegistrationForm({ handleInput, handleSubmit, error }) {
    return (
        <div className="registration">
            <h2>Sign up</h2>
            {error && (
                <div className="error">
                    something went wrong, please try again.
                </div>
            )}
            <div className="single-input-registration">
                <input
                    name="first"
                    onChange={handleInput}
                    placeholder="first name"
                />
                <input
                    name="last"
                    onChange={handleInput}
                    placeholder="last name"
                />
            </div>
            <input
                name="email"
                onChange={handleInput}
                type="email"
                placeholder="email"
            />
            <input
                name="pass"
                onChange={handleInput}
                type="password"
                placeholder="password"
            />
            <button onClick={handleSubmit}>Submit</button>
            <p className="or-tag">OR</p>
            <Link to="/login">Log in</Link>
        </div>
    );
}
