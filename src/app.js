import React from "react";
import axios from "./axios";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        const { data } = await axios.post("/user");
        this.setState(data);
    }
    render() {
        return (
            <div>
                <div>APP!</div>
            </div>
        );
    }
}
