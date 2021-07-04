import {useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import Button from '../components/Button'

const Home = () => {

    const location = useLocation()

    useEffect(() => {
        console.log(location.state)
    }, [location])

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
                    <div className="data">
                        <p>Tulis sesuatu</p>
                    </div>
                </div>
            ) 
        } else {
            return (
                <div className="App">
                    <h1>Home |</h1>
                    <h3>Hi, {location.state[0].username}</h3>
                    <p>Lihat semua postingan</p>
                    {
                        location.state.map(post => 
                            <div className="data" key={post.title}>
                                <p>Oleh : {post.username}</p>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                                <Button text="Edit" />
                            </div>
                        )
                    }
                </div>
            ) 
        }
    }
    
}

export default Home