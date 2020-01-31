import React from "react";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
    }
    showCurrent() {
        if (this.state.edit) {
            return (
                <div>
                    <textarea />
                    <button onClick={() => this.handleSubmit()}>submit</button>
                </div>
            );
        } else {
            if (this.props.bio) {
                return (
                    <div>
                        <p>{this.props.bio}</p>
                        <button onClick={() => this.handleSubmit()}>
                            edit
                        </button>
                    </div>
                );
            } else {
                return (
                    <button onClick={() => this.handleSubmit()}>add bio</button>
                );
            }
        }
    }
    handleSubmit() {
        this.setState({
            edit: !this.state.edit
        });
    }
    render() {
        return <div>{this.showCurrent()}</div>;
    }
}
