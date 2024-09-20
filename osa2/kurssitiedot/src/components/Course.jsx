const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => 
    <p>
        <b>Total of {sum} exercises</b>
    </p>

const Part = ({ part }) => 
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) => 
    <>
        {parts.map(part => <Part key={part.id} part={part} />)}
    </>

const Course = ({ course }) => {
    const sum = course.parts.reduce( (a, b) =>
        a + b.exercises, 0)

    return (
        <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={sum} />
        </>
    )
}

export default Course