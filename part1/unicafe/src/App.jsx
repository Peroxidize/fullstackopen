import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100 + "%";


  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <>
      <table>
        <tbody>
          <StatisticsLine text={"good"} value={good} />
          <StatisticsLine text={"neutral"} value={neutral} />
          <StatisticsLine text={"bad"} value={bad} />
          <StatisticsLine text={"total"} value={total} />
          <StatisticsLine text={"average"} value={average} />
          <StatisticsLine text={"positive"} value={positive + " %"} />
        </tbody>
      </table>
    </>
  );
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => {
    return setGood(good + 1);
  }

  const increaseNeutral = () => {
    return setNeutral(neutral + 1);
  }

  const increaseBad = () => {
    return setBad(bad + 1);
  }

  const props = {
    good,
    neutral,
    bad,
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} text="good" />
      <Button onClick={increaseNeutral} text="neutral" />
      <Button onClick={increaseBad} text="bad" />
      <h1>statistics</h1>
      <Statistics {...props} />
    </>
  )
}

export default App
