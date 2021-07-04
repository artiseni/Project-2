import React, { Component } from 'react'
import Input from './Input'
import Button from './Button'



class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password : ''
        }
    }

    getValue = () => {

    }

    render() {
        return (
            <div className="Form">
                <h3>Form</h3>
                <form>
                    <div>
                        <Input />
                    </div>
                    <div>
                        <Input />
                    </div>
                    <Button />
                </form>
            </div>
        )
    }
}

export default Form