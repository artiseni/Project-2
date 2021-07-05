import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import Api from '../data-api/fetchData'


const Login = () => {

    const history = useHistory()
    const [passData, newData] = useState({
        email: '',
        password : ''
    })

    const textChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        newData({ ...passData, [name]: value })
        
    }

    const resultHandler = (data) => {
        // error request handler
        if (data.type === 'cors') {
            data.json().then(result => {
                result = result.message
                alert(result)    
            })
        } else {
            // no error
            // console.log(data) // api response
            history.push({
                pathname: '/home',
                state : data
            })
        }
    }

    const btnData = async () => {
        const api = new Api(`http://localhost:5000/login`, passData)
        const data = await api.postData()
        console.log(data)
        resultHandler(data)
        // console.log(passData) request to api
    } 

    return (

        <div className="App">
            <h1>Login |</h1>
            <Input type="email" name="email" data={textChange} value={passData.email} />
            <br/><br/>
            <Input type="password" name="password" data={textChange} value={passData.password} />
            <br /><br />
            <Button className="login" text="Login" data={btnData}/>
        </div>
        
    )
}

export default Login