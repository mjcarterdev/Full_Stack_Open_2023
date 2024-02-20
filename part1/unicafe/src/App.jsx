import { useState } from 'react';

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  const average = (good - bad) / (good + neutral + bad);
  const positive = (good / (good + neutral + bad)) * 100;
  return (
    <>
      <h1>Statistics</h1>
      {good + neutral + bad > 0 ? (
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={good + neutral + bad} />
            <StatisticLine
              text='average'
              value={isNaN(average) ? 0 : average}
            />
            <StatisticLine
              text='positive'
              value={isNaN(positive) ? 0 : `${positive}%`}
            />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <br />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
