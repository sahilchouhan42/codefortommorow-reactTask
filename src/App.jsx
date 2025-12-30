
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [post, setPost] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  const perPage = 6

  useEffect(()=>{
    setTimeout(()=>{
      fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res=>res.json())
      .then(data=>{
        setPost(data);
        setLoading(false)
      })
    }, 5000)
  }, [])

  const deletePost = (id)=>{
    setPost(post.filter(post=>post.id!==id))
  }

  const start = (page-1)* perPage
  const currentPost = post.slice(start, start+perPage)
  const totalPage = Math.ceil(post.length/perPage)

  if(loading) return <h2>Loading...</h2>
  

  return (
    <>
      <div style={{padding: "30px"}}>
        <h2 style={{textAlign: "center"}}>Posts</h2>
        <div style={{display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center"}}>
        {currentPost.map(post=>(
          <div style={{border:"1px solid black", padding:"10px" , marginBottom:"10px", position:"relative", boxSizing: "border-box", width: "300px", backgroundColor:"#c5c9c6"}} key={post.id}>
            <button style={{ position: "absolute", top:10, right: 10, color: "white", backgroundColor: "red"}} onClick={()=>deletePost(post.id)}>Delete</button>
            <img src="designimage.jpeg" alt="" />
            <h4 style={{font: "bold", fontSize:"20px"}}>Title: {post.title}</h4>
            <p>Body: {post.body}</p>
          </div>
        ))}
        </div>

        <div style={{marginTop: "20px", display: "flex", justifyContent: "center"}}>
          <button disabled={page===1} onClick={()=>setPage(page-1)}>Prev</button>
          {[...Array(totalPage)].map((k,i)=>(
            <button style={{margin: "0 5px"}} key={i} onClick={()=>setPage(i+1)}>{i+1}</button>
          ))}

          <button disabled={page===totalPage} onClick={()=>setPage(page+1)}>Next</button>
        </div>
      </div>
    </>
  )
}

export default App
