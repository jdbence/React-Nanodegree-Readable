/*global location localStorage fetch */
// C9 prevents localhost requests
const api = `//${location.hostname}:8081`
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Authorization': token,
  'Content-Type': 'application/json',
}

export const fetchCategoriesAPI = () => {
  const options = { headers }
  return fetch(`${api}/categories`, options)
    .then(res => res.json())
    .then(res => res.categories)
    .catch(err => console.error(err))
}

export const fetchCommentsAPI = (id) => {
  const options = { headers }
  return fetch(`${api}/posts/${id}/comments`, options)
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const fetchPostsAPI = (category) => {
  const options = { headers }
  return fetch(`${api + (category ? `/${category}` : '')}/posts`, options)
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const createPostAPI = async ({id, timestamp, title, author, body, category}) => {
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      id,
      timestamp,
      title,
      author,
      body,
      category,
      voteScore: 0,
      deleted: false
    })
  }
  try {
    const response = await fetch(`${api}/posts`, options)
    return response.json()
  }
  catch (e) {
    console.error(e)
  }
}

export const updatePostAPI = async ({ id, title, body }) => {
  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      title,
      body
    })
  }
  try {
    const res = await fetch(`${api}/posts/${id}`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}

export const deletePostAPI = async (id) => {
  const options = {
    method: 'DELETE',
    headers
  }
  try {
    const res = await fetch(`${api}/posts/${id}`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}

export const votePostAPI = async ({ id, option }) => {
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      option
    })
  }
  try {
    const res = await fetch(`${api}/posts/${id}`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}

export const createCommentAPI = async ({id, body, author, parentId, timestamp}) => {
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      id,
      body,
      author,
      parentId,
      timestamp,
      voteScore: 0
    })
  }
  try {
    const res = await fetch(`${api}/comments`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}

export const updateCommentAPI = async ({ id, timestamp, body }) => {
  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      timestamp,
      body
    })
  }
  try {
    const res = await fetch(`${api}/comments/${id}`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}

export const deleteCommentAPI = async (id) => {
  const options = {
    method: 'DELETE',
    headers
  }
  try {
    const res = await fetch(`${api}/comments/${id}`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}

export const voteCommentAPI = async ({ id, option }) => {
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      option
    })
  }
  try {
    const res = await fetch(`${api}/comments/${id}`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}