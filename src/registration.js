import React from "react";
import axios from 'axios';


export.default class Registration extends React.Component {
    constructor(props) {
        super (props)
        this.state = {}
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit() {
        axios.post('/register', {
            first: this.state.first
        }.then(({data}) => {
            if (data.sucess) {
                //it worked!
                location.replace('/')
            } else {
                //failure!
                this.setState({
                    error: true
                })
            }
        }))
    }
    render(){
        return (
            <div>
                {this.state.error && <div className='error'>Oops!</div>}
                <input name="first" onChange={e => this.handleChange(e)} />
                <input name="last" onChange={e => this.handleChange(e)} />
                <input name="email" onChange={e => this.handleChange(e)} />
                <input name="pass" onChange={e => this.handleChange(e)} />
                <button onClick={e => this.submit()}>register</button>
            </div>
        )
    }
}