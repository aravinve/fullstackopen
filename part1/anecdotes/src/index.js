import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const initialData = Array(props.anecdotes.length).fill(0)
  const [votes, setVotes] = useState(initialData)
  const [popularVoteIndex, setPopularVoteIndex] = useState(0)
  

  const handleClick = () => {
    const randomNumber = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(randomNumber)
  }

  const castVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    mostPopular(newVotes)
  }

  const mostPopular = (newVotes) => {
    let max = newVotes[popularVoteIndex];
    newVotes.forEach((vote, index) => {
      if(vote > max){
        max = vote
      }
    })
    setPopularVoteIndex(newVotes.indexOf(max))
  }

  return (
    <>
      <div>
        <h1>Anectode of the day</h1>
        <div>
          {props.anecdotes[selected]}
        </div>
        <br/>
        <div>
          {votes[selected]} Votes
        </div>
        <div>
          <button onClick={handleClick}>Next</button>
          <button onClick={castVote}>Vote</button>
        </div>
      </div>
      <div>
        <h1>Most Popular Anectode</h1>
        <div>
            <>
              <div>
                {props.anecdotes[popularVoteIndex]}
              </div>
              <br/>
              <div>
                {`${votes[popularVoteIndex]} Votes`}
              </div>
            </>
        </div>
      </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById('root')
);
