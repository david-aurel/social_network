import React from "react";
import Registration from "./registration";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Welcome to nice!</h1>
                <Registration />
            </div>
        );
    }
}
