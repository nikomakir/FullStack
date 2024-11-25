import Togglable from './Togglable'
import Blogform from './Blogform'
import Blog from './Blog'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../createNotificationContext'
import { useUser } from '../createUserContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'



const Home = ({ blogs }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const user = useUser()
  const blogFormRef = useRef()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (blogObject) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({
        type: 'set',
        payload: `a new blog ${blogObject.title} by ${blogObject.author} added`
      })
      setTimeout(() => {
        notificationDispatch({ type: 'reset' })
      }, 5000)
    },
    onError: () => {
      notificationDispatch({
        type: 'set',
        payload: 'missing title or author'
      })
      setTimeout(() => {
        notificationDispatch({ type: 'reset' })
      }, 5000)
    },
  })

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (likedBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({
        type: 'set',
        payload: `${likedBlog.title} liked!`
      })
      setTimeout(() => {
        notificationDispatch({ type: 'reset' })
      }, 5000)
    },
    onError: () => {
      notificationDispatch({
        type: 'set',
        payload: 'Error updating like'
      })
      setTimeout(() => {
        notificationDispatch({ type: 'reset' })
      }, 5000)
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({
        type: 'set',
        payload: 'blog deleted!'
      })
      setTimeout(() => {
        notificationDispatch({ type: 'reset' })
      }, 5000)
    },
    onError: () => {
      notificationDispatch({
        type: 'set',
        payload:'Error: user and blog do not match!'
      })
      setTimeout(() => {
        notificationDispatch({ type: 'reset' })
      }, 5000)
    }
  })

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    newBlogMutation.mutate(blogObject)
  }

  const likeBlog = async (blog) => {
    const likedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }
    likeBlogMutation.mutate(likedBlog)
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog)
    }
  }

  return (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <Blogform createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => likeBlog(blog)}
          handleDelete={() => deleteBlog(blog)}
          showDelete={user.username === blog.user.username}
        />
      ))}
    </>
  )
}

export default Home
