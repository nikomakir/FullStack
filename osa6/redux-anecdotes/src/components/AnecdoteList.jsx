import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state)
  anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {anecdotes.map(anecdote =>
      <Anecdote key={anecdote.id}
      content={anecdote.content}
      votes={anecdote.votes}
      handleVote={() => dispatch(voteAnecdote(anecdote.id))}
      />
      )}
    </div>
  )
}

export default AnecdoteList