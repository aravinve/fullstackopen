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

const Stats = ({headerText, good, neutral, bad}) => {
  return (
    <>
    <h1>{headerText}</h1>
    <p>
      Good {good}
    </p>
    <p>
      Neutral {neutral}
    </p>
    <p>
      Bad {bad}
    </p>
    </>
  )
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
      <Stats headerText="Statistics" good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
