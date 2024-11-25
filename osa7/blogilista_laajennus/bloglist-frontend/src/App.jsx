import { useState, useEffect } from 'react'
import Home from './components/Home'
import Users from './components/Users'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { useNotificationDispatch } from './createNotificationContext'
import { useQuery } from '@tanstack/react-query'
import { useUser, useUserDispatch } from './createUserContext'
import {
  Routes, Route, Link
} from 'react-router-dom'


const App = () => {
  const user = useUser()
  const userDispatch = useUserDispatch()
  const notificationDispatch = useNotificationDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'set', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data
  blogs.sort((a, b) => b.likes - a.likes)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'set', payload: user })
      setUsername('')
      setPassword('')
    } catch (exception) {
      notificationDispatch({
        type: 'set',
        payload: 'wrong username or password'
      })
      setTimeout(() => {
        notificationDispatch({ type: 'reset' })
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    userDispatch({ type: 'reset' })
    blogService.setToken(null)
    window.localStorage.clear()
    notificationDispatch({
      type: 'set',
      payload: 'logged out'
    })
    setTimeout(() => {
      notificationDispatch({ type: 'reset' })
    }, 5000)
  }

  const padding = {
    paddingRight: 5
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              data-testid="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              data-testid="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Notification />
      <h2>blog app</h2>
      <Routes>
        <Route path='/' element={<Home blogs={blogs} />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
