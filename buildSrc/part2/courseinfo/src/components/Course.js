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
        return <Part name={element.name} count={element.exercises} key={element.id}/>
    });
    return <>
        {content}
    </>
}

const Total = (props) => {
    return <p>
        Total of {props.total}
    </p>
}

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total total={course.parts.reduce((acc: number, el: {}) => acc += el.exercises, 0)} />
        </div>
    )
}

export default Course