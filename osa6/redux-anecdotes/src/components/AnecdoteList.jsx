import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ content, votes , handleVote }) => {
  return (
    <>
      <div>
        {content}
      </div>
      <div>
        has {votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
      <Anecdote key={anecdote.id}
      content={anecdote.content}
      votes={anecdote.votes}
      handleVote={() => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(setNotification(`you voted for '${anecdote.content}'`))
        setTimeout(() => {
          dispatch(setNotification(''))
        }, 5000)
      }}
      />
      )}
    </div>
  )
}

export default AnecdoteList