import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({text, handler}) => {
  return (
    <button onClick={handler}>
      {text}
    </button>
  )
}

const Header = ({headerText, goodHandler, neutralHandler, badHandler}) => {
  return (
    <>
      <h1>{headerText}</h1>
      <Button text="good" handler={goodHandler} />
      <Button text="neutral" handler={neutralHandler} />
      <Button text="bad" handler={badHandler} />
    </>
  )
}


const Stat = ({text, value}) => {
  return (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
  )
}

const Statistics = ({headerText, good, neutral, bad}) => {
  const sum = good + neutral + bad;
  if(sum > 0){
    return (
      <>
      <h1>{headerText}</h1>
      <table>
        <tbody>
        <Stat text="Good" value={good} />
        <Stat text="Neutral" value={neutral} />
        <Stat text="Bad" value={bad} />
        <Stat text="All" value={good + neutral + bad} />
        <Stat text="Average" value={(good-bad)/(good + neutral + bad)} />
        <Stat text="Positive Percentage" value={(((good)/ (good + neutral + bad)) * 100).toString().concat(" %")} />
        </tbody>
      </table>
      </>
    )
  } else {
    return (
      <p>No Feedback Given</p>
    )
  }
  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandler = () => setGood(good + 1)
  const neutralHandler = () => setNeutral(neutral + 1)
  const badHandler = () => setBad(bad + 1)

  return (
    <div>
      <Header headerText="Give Feedback" goodHandler={goodHandler} neutralHandler={neutralHandler} badHandler={badHandler} />
      <Statistics headerText="Statistics" good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
