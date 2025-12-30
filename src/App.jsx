"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./App.css"
import {
  fetchPosts,
  deletePost,
  setPage,
  nextPage,
  prevPage,
  selectCurrentPosts,
  selectLoading,
  selectError,
  selectCurrentPage,
  selectTotalPages,
} from "./store/postsSlice"

function App() {
  const dispatch = useDispatch()
  const currentPosts = useSelector(selectCurrentPosts)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const currentPage = useSelector(selectCurrentPage)
  const totalPages = useSelector(selectTotalPages)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleDeletePost = (id) => {
    dispatch(deletePost(id))
  }

  const handlePrevPage = () => {
    dispatch(prevPage())
  }

  const handleNextPage = () => {
    dispatch(nextPage())
  }

  const handleSetPage = (page) => {
    dispatch(setPage(page))
  }

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>Error: {error}</h2>

  return (
    <>
      <div style={{ padding: "30px" }}>
        <h2 style={{ textAlign: "center" }}>Posts</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {currentPosts.map((post) => (
            <div
              style={{
                border: "1px solid black",
                padding: "10px",
                marginBottom: "10px",
                position: "relative",
                boxSizing: "border-box",
                width: "300px",
                backgroundColor: "#c5c9c6",
              }}
              key={post.id}
            >
              <button
                style={{ position: "absolute", top: 10, right: 10, color: "white", backgroundColor: "red" }}
                onClick={() => handleDeletePost(post.id)}
              >
                Delete
              </button>
              <img src="designimage.jpeg" alt="" />
              <h4 style={{ font: "bold", fontSize: "20px" }}>Title: {post.title}</h4>
              <p>Body: {post.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
          <button disabled={currentPage === 1} onClick={handlePrevPage}>
            Prev
          </button>
          {[...Array(totalPages)].map((k, i) => (
            <button style={{ margin: "0 5px" }} key={i} onClick={() => handleSetPage(i + 1)}>
              {i + 1}
            </button>
          ))}
          <button disabled={currentPage === totalPages} onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default App
