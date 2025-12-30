import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Async thunk to fetch posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  // Simulate 5 second delay
  await new Promise((resolve) => setTimeout(resolve, 5000))
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  const data = await response.json()
  return data
})

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    currentPage: 1,
    postsPerPage: 6,
  },
  reducers: {
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload)
    },
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
    nextPage: (state) => {
      const totalPages = Math.ceil(state.posts.length / state.postsPerPage)
      if (state.currentPage < totalPages) {
        state.currentPage += 1
      }
    },
    prevPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { deletePost, setPage, nextPage, prevPage } = postsSlice.actions
export default postsSlice.reducer

// Selectors
export const selectAllPosts = (state) => state.posts.posts
export const selectLoading = (state) => state.posts.loading
export const selectError = (state) => state.posts.error
export const selectCurrentPage = (state) => state.posts.currentPage
export const selectPostsPerPage = (state) => state.posts.postsPerPage

export const selectCurrentPosts = (state) => {
  const { posts, currentPage, postsPerPage } = state.posts
  const start = (currentPage - 1) * postsPerPage
  return posts.slice(start, start + postsPerPage)
}

export const selectTotalPages = (state) => {
  const { posts, postsPerPage } = state.posts
  return Math.ceil(posts.length / postsPerPage)
}
