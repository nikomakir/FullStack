import { useState } from 'react'

const Header = ({ name }) => <div><h1>{name}</h1></div>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(8).fill(0))
  
  const generateSelected = () => setSelected(Math.floor(Math.random()*8))
  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }
  const getTopAnecdote = () => {
    let greatest = 0
    let indexOfGreatest = 0
    for (let i = 0; i < 8; i++) {
      if (points[i] > greatest) {
        greatest = points[i];
        indexOfGreatest = i;
      }
    }
    return indexOfGreatest
  }
 
  return (
    <div>
      <Header name="Anecdote of the day" />
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <p>
        <Button handleClick={vote} text="vote" />
        <Button handleClick={generateSelected} text="next anecdote" />
      </p>
      <Header name="Anecdote with most votes" />
      {anecdotes[getTopAnecdote()]}
      <p>has {points[getTopAnecdote()]} votes</p>
    </div>
  )
}
export default App