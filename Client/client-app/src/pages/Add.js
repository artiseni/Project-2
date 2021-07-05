import React from 'react';
import { useLocation } from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import Button from '../components/Button'
import Api from '../data-api/fetchData'
import moment from 'moment';

const Add = () => {

    const location = useLocation()
    const history = useHistory()
    const dataTime = moment().format('MMMM Do YYYY, h:mm:ss a');


    const username = location.state

    const postEvent = async () => {

        const title = document.getElementById('id_post_title').innerHTML
        const content = document.getElementById('id_post_content').innerHTML
        const titleStr = title.replace('<h3>', '')
        const titleStr1 = titleStr.replace('</h3>', '')

        const data = {
            username : username,
            title: titleStr1,
            content: content,
            last_update : dataTime 
        }

        const api = new Api(`http://localhost:5000/home/add`, data)
        const result = await api.postData()

        history.push({
            pathname: '/home',
            state : result
        })
    }

    return (
        <div className="App">
            <h1>Edit page |</h1>
            <div className="data">
                <p>Writer : {username}</p>
                <h3>Titel :</h3>
                <div id="id_post_title" suppressContentEditableWarning={true} contentEditable={true}><h3>Hello!</h3></div>
                <h5>Content :</h5>
                <div id="id_post_content" suppressContentEditableWarning={true} contentEditable={true}>Hello!</div>
                <br/><br/>
                <Button text="Post!" data={postEvent}/>
            </div>
        </div>
    )
}

export default Add