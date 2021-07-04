import {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import Api from '../data-api/fetchData'
import Button from '../components/Button'
let url = `http://localhost:5000/`
let count = 0

const Posts = () => {
  
  const text = 'Simple Blog'
  const [state, setState] = useState([])
  const history = useHistory()
  
  useEffect(() => {
    const limitPage = {
      limit : count
    }

    const api = new Api(url + 'posts', limitPage)
    async function fetchData(){
      const data = await api.postData()
      setState(data)
    }
    fetchData()
  }, [])

  const funButton = async (e) => {
    const data = e.target.className
    data === 'login' ? history.push(`${data}`) : history.push(`${data}`)
  }


  const nextPage = async () => {

    count += 4
    const limitPage = {
      limit : count
    }
    const api = new Api(url + 'posts', limitPage)
    const data = await api.postData()
    setState(data)
  }

  const backPage = async () => {
    count-=4
    // console.log(count)
    const limitPage = {
      limit : count
    }
    const api = new Api(url + 'posts', limitPage)
    const data = await api.postData()
    setState(data)

  }

  
  if (state.length === 0) {
    return (
      <div className="App">
        <h1>Data Tidak Ditemukan |</h1>
        <Button className="login" text="Login" data={funButton} />
        <Button className="signup" text="SignUp" data={funButton} />
        <p onClick={backPage} className="link">Back</p>
      </div>
    )
  } else {

    console.log(state.length)

    if (state.length < 4) {
      return (
        <div className="App">
          <h1>{text} |</h1>
          <Button className="login" text="Login" data={funButton} />
          <Button className="signup" text="SignUp" data={funButton} />
          <p onClick={backPage} className="link">Back</p>
          {
            state.map(post => 
              <div className="data" key={post.title}>
                <p>Oleh : {post.username}</p>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
            )
          }
        </div>
      )
    }

    if (count === 0) {
      return (
        <div className="App">
          <h1>{text} |</h1>
          <Button className="login" text="Login" data={funButton} />
          <Button className="signup" text="SignUp" data={funButton} />
          <p onClick={nextPage} className="link">Next</p>
          {
            state.map(post => 
              <div className="data" key={post.title}>
                <p>Oleh : {post.username}</p>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
            )
          }
        </div>
      )
    } else {
      return (
        <div className="App">
          <h1>{text} |</h1>
          <Button className="login" text="Login" data={funButton} />
          <Button className="signup" text="SignUp" data={funButton} />
          <p onClick={nextPage} className="link">Next</p>
          <p onClick={backPage} className="link">Back</p>
          {
            state.map(post => 
              <div className="data" key={post.title}>
                <p>Oleh : {post.username}</p>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
            )
          }
        </div>
      )
    }
  }
}

export default Posts