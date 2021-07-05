import React, { useEffect } from 'react'
import { useLocation , Redirect , useHistory} from 'react-router-dom'
import Button from '../components/Button'
import moment from 'moment'

const Home = () => {

    const location = useLocation()
    const history = useHistory()
    const dataTime = moment().format('MMMM Do YYYY, h:mm:ss a');


    useEffect(() => {
        console.log(location.state)
    }, [location])

    function editEvent(event) {

        const title = event.target.getAttribute('title')
        const content = event.target.getAttribute('content')
        const username = event.target.getAttribute('username')

        const data = {
            title : title,
            content : content,
            username: username,
            last_update : dataTime
        }

        history.push({
            pathname: `/home/edit`,
            state : data
        })

    }

    const addPost = () => {
        history.push({
            pathname: '/home/add',
            state : location.state[0].username
        })
    }

    if (location.state === undefined) {
        return  <Redirect to='/login'/>
    } else {

        const title = location.state[0].title
        const content = location.state[0].content
        const username = location.state[0].username
        
        if (title === null || content === null) {
            return (
                <div className="App">
                    <h1>Home |</h1>
                    <p>Hi, {username}</p>
                    <p onClick={addPost} className="link">Tulis blog</p>
                    <div className="data">
                        <p>Anda belum memposting apapun</p>
                    </div>
                </div>
            ) 
        } else {
            return (
                <div className="App">
                    <h1>Home |</h1>
                    <h3>Hi, {username}</h3>
                    <p onClick={addPost} className="link">Tulis blog</p>
                    <p>Lihat semua postingan</p>
                    {
                        location.state.map(post => 
                            <div className="data" key={post.title}>
                                <p>Oleh : {post.username}</p>
                                <p>last update : {post.last_update}</p>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                                <Button text="Edit" className="btnEdit" title={post.title} content={post.content} username={post.username} data={editEvent}/>
                            </div>
                        )
                    }
                </div>
            ) 
        }
    }
    
}

export default Home