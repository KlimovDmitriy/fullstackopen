const Header = (props) => {
    return <h1>{props.name}</h1>
}

const Part = (props) => {
    return <p>
        {props.name} {props.count}
    </p>
}
const Content = (props) => {
    let content;
    content = props.parts.map(element => {
        return <Part name={element.name} count={element.exercises} key={element.name}/>
    });
    return <>
        {content}
    </>
}

const Total = (props) => {
    return <p>
        Number of exercises {props.total}
    </p>
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total total={course.parts.reduce((acc, el) => acc += el.exercises, 0)} />
        </div>
    )
}

export default App