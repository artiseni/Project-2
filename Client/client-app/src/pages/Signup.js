import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import Api from '../data-api/fetchData'
import Input from '../components/Input'
import Button from '../components/Button'

const SignUp = () => {

    let [passData, newData] = useState({
        username : '',
        email: '',
        password1: '',
        password2: ''
    })
    const history = useHistory()

    const textChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        newData({ ...passData, [name]: value })
        
    }

    const resultHandler = (data) => {
        // error request handler
        if (data.type === 'cors') {
            data.json().then(result => {
                // console.log(result)
                result = result.message
                alert(result)    
            })
        } else {
            history.push({
                pathname: '/home',
                state : data
            })
        }
    }

    const keyChanger = (data) => {
        
        const renameKey = (object, key, newKey) => {

            const clone = object => Object.assign({}, object);

            const cloneObj = clone(object)
            const targetKey = cloneObj[key]
            delete cloneObj[key]
            cloneObj[newKey] = targetKey

            return cloneObj
        }

        data = renameKey(data, 'password1', 'password')
        data = renameKey(data, 'password2', 'password')

        // console.log(data)
        return data
    }

    const btnData = async () => {

        if (passData.username === '' || passData.email === '' || passData.password1 === '' || passData.password2 === '') {
            alert('Data tidak boleh kosong')
        } else if (passData.password1 !== passData.password2) {
            alert('Pasword tidak sama')
        } else {
            const api = new Api(`http://localhost:5000/signup`, keyChanger(passData))
            const data = await api.postData()
            resultHandler(data)
            // console.log(data)
            // console.log(passData) // request to api
        }

    }

    return (
        <div className="App">
            <h1>SignUp |</h1>
            <Input type="text" name="username" data={textChange} value={passData.username} />
            <br/><br/>
            <Input type="email" name="email" data={textChange} value={passData.email} />
            <br/><br/>
            <Input type="password" name="password1" data={textChange} value={passData.password1} />
            <br /><br />
            <Input type="password" name="password2" data={textChange} value={passData.password2} />
            <br /><br />
            <Button className="signup" text="SignUp" data={btnData}/>
        </div>
    )
}

export default SignUp