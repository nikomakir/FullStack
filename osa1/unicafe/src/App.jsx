import { useState } from 'react'

const Header = ({ name }) => <div><h1>{name}</h1></div>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  if (text === "positive") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text} </td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.total} />
      <StatisticLine text="average" value={props.avg} />
      <StatisticLine text="positive" value={props.pos} />
      </tbody>
    </table>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  const increaseBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  let average = (good*1 + bad*(-1)) / (good + neutral + bad)
  let positive = (good / (good + neutral + bad)) * 100

  return (
    <div>
      <Header name="give feedback" />
      <Button handleClick={increaseGood} text="good" />
      <Button handleClick={increaseNeutral} text="neutral" />
      <Button handleClick={increaseBad} text="bad" />
      <Header name="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad}
      total={total} avg={average} pos={positive}/>
    </div>
  )
}

export default App