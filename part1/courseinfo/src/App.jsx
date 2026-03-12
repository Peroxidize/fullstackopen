const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course.name}</h1>
  );
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
}

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map((part, index) => (
        <Part key={index} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
}

const Total = (props) => {
  const exercises = props.course.parts.reduce((accumulator, part) => accumulator + part.exercises, 0);
  return (
    <p>Number of exercises {exercises}</p>
  );
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      },
    ]
  };

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default App
