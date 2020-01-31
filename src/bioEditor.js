import React from "react";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
    }
    showCurrent() {
        if (!this.state.edit) {
            return <button onClick={() => this.handleSubmit()}>edit</button>;
        } else {
            return (
                <div>
                    <textarea />
                    <button onClick={() => this.handleSubmit()}>submit</button>
                </div>
            );
        }
    }
    handleSubmit() {
        this.setState({
            edit: !this.state.edit
        });
    }
    render() {
        return (
            <div>
                {this.props.bio && <button>Add Bio</button>}
                {this.showCurrent()}
            </div>
        );
    }
}
