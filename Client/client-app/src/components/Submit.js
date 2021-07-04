import React, { Component } from 'react'
import Input from './Input'
import Button from './Button'



class Submit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email : '',
            password : ''
        }
    }

    inputValue = () => {
        const data = {
            email : this.state.email,
            password : this.state.password
        }
        console.log(data) // request to api
    }
    
    textChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({ [name]: value})
    }

    render() {
        return (
            <div className="inputForm">
                {/* <h3>{this.state.value}</h3> */}
                <p><Input type="text" data={this.textChange} name="email"/></p>
                <p><Input type="password" data={this.textChange} name="password"/></p>
                <Button data={this.inputValue}/>
            </div>
        )
    }
}

export default Submit