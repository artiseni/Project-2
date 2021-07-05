import React, { useEffect } from 'react'
import { useLocation, Redirect , useHistory } from 'react-router-dom'
import moment from 'moment';
import Button from '../components/Button'
import Api from '../data-api/fetchData'

const Edit = () => {
    const location = useLocation()
    const history = useHistory()
    const dataTime = moment().format('MMMM Do YYYY, h:mm:ss a');

    useEffect(() => {
        console.log(location.state)
    }, [location])


    const updateBtn = async () => {

        const title = document.getElementById('id_title')
        const content = document.getElementById('id_content')
        const contentStr = content.innerHTML
        const titleStr1 = title.innerHTML.replace('<h3>', '')
        const titleStr2 = titleStr1.replace('</h3>', '')
        
        const data = {
            username: location.state.username,
            title : location.state.title,
            content : location.state.content,
            newTitle : titleStr2,
            newContent : contentStr,
            last_update : dataTime 
        }

        console.log(data)

        const api = new Api(`http://localhost:5000/home/edit`, data)
        const res = await api.postData()
        console.log(res)

        history.push({
            pathname: '/home',
            state : res
        })

        // gotoHome(data)
    }

    if (location.state === undefined) {
        return  <Redirect to='/login'/>
    } else {

        const username = location.state.username
        const title = location.state.title
        const content = location.state.content

        return (
            <div className="App">
                <h1>Edit page |</h1>
                <div className="data">
                    <p>By : {username}</p>
                    <div id="id_title" suppressContentEditableWarning={true} contentEditable={true}><h3>{title}</h3></div>
                    <div id="id_content" suppressContentEditableWarning={true} contentEditable={true}>{content}</div>
                    <br/><br/>
                    <Button text="Update" data={updateBtn}/>
                </div>
            </div>
        )
    }

}

export default Edit