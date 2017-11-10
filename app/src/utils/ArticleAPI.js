/*global location localStorage fetch */
// C9 prevents localhost requests
const api = `//${location.hostname}:8081`
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Authorization': token
}

export const fetchCategories = () => {
  const options = { headers }
  return fetch(`${api}/categories`, options)
    .then(res => res.json())
    .then(res => res.categories)
    .catch(err => console.error(err))
}

export const fetchComments = (id) => {
  const options = { headers }
  return fetch(`${api}/posts/${id}/comments`, options)
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const fetchPosts = (category) => {
  const options = { headers }
  return fetch(`${api + (category||'')}/posts`, options)
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const createPost = async ({id, timestamp, title, author, body, category}) => {
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

export const updatePost = async ({ id, title, body }) => {
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

export const deletePost = async (id) => {
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

export const createComment = async ({id, body, author, parentId, timestamp}) => {
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

export const updateComment = async ({ id, timestamp, body }) => {
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

export const deleteComment = async (id) => {
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