import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            bio: this.props.bio
        };
    }
    showCurrent() {
        if (this.state.edit) {
            return (
                <div>
                    <p>{this.props.bio}</p>
                    <textarea onChange={e => this.handleChange(e)} />
                    <button onClick={() => this.handleSubmit()}>submit</button>
                </div>
            );
        } else {
            if (this.props.bio) {
                return (
                    <div>
                        <p>{this.props.bio}</p>
                        <button onClick={() => this.toggleBio()}>edit</button>
                    </div>
                );
            } else {
                return (
                    <button onClick={() => this.toggleBio()}>add bio</button>
                );
            }
        }
    }
    toggleBio() {
        this.setState({
            edit: !this.state.edit
        });
    }
    handleChange(e) {
        this.setState({
            bio: e.target.value
        });
    }
    async handleSubmit() {
        await axios.post("/updateBio", { bio: this.state.bio });
        this.props.setBio(this.state.bio);
        this.toggleBio();
    }
    render() {
        return <div>{this.showCurrent()}</div>;
    }
}
