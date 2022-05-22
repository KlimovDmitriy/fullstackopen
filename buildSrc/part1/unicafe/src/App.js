import { useState } from 'react'
const Button = (props) => {
    return <button onClick={props.handleClick}>{props.name}</button>
}
const StatisticLine = ({ text, value }) => {
    return <tr><td>{text}</td><td>{value} {text === 'positive' ? '%' : ''}</td></tr>
}
const Statistics = (props) => {
    const { good, neutral, bad } = props.points
    const total = good + neutral + bad
    if (total) {
        const average = total ? (good - bad) / total : 0
        const positivePercent = total ? good / total * 100 : 0

        return <div>
            <h2>statistics</h2>
            <table>
                <tbody>
                    <StatisticLine text="Good" value={good} />
                    <StatisticLine text="Neutral" value={neutral} />
                    <StatisticLine text="Bad" value={bad} />
                    <StatisticLine text="all" value={total} />
                    <StatisticLine text="average" value={average} />
                    <StatisticLine text="positive" value={positivePercent} />
                </tbody>
            </table>

        </div>
    }
    else {
        return <div>
            <h2>statistics</h2>
            <p>No feedback given</p>
        </div>
    }
}
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <div>
                <h2>give feedback</h2>
                <Button handleClick={() => setGood(good + 1)} name="good" />
                <Button handleClick={() => setNeutral(neutral + 1)} name="neutral" />
                <Button handleClick={() => setBad(bad + 1)} name="bad" />
            </div>
            <Statistics points={{ good, neutral, bad }} />

        </div>
    )
}

export default App