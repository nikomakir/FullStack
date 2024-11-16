import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseURL, object)
  return response.data
}

const vote = async (id) => {
  const response = await axios.get(`${baseURL}/${id}`)
  const anecdote = response.data
  const votedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  await axios.put(`${baseURL}/${id}`, votedAnecdote)
}

export default { getAll, createNew, vote }
