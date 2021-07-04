import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
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

    // console.log(location.port)
    // const url = `http://localhost:5000/${data}`
    if (data === 'login') {

      history.push(`${data}`)

      // const api = new Api(url)
      // const apidata = await api.postData()
      // console.log(apidata)
      // window.open(`http://localhost:3000/${data}`)
    } else {
      history.push(`${data}`)
      // const api = new Api(url)
      // const apidata = await api.postData()
      // console.log(apidata)
      // window.open(`http://localhost:3000/${data}`)
    }
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
  
  if (state.length === 0) {
    return (
      <div className="App">
        <h1>Data Habis |</h1>
        <Button className="login" text="Login" data={funButton} />
        <Button className="signup" text="SignUp" data={funButton} />
      </div>
    )
  } else {
    return (
      <div className="App">
        <h1>{text} |</h1>
        <Button className="login" text="Login" data={funButton} />
        <Button className="signup" text="SignUp" data={funButton} />
        <p onClick={nextPage}>Next</p>
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

export default Posts