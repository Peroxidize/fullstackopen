const Header = ({ name }) => {
  return (
    <h2>{name}</h2>
  );
}

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
}

const Total = ({ parts }) => {
  const exercises = parts.reduce((accumulator, part) => accumulator + part.exercises, 0);

  return (
    <h4>total of {exercises} exercises</h4>
  );
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total key={course.id} parts={course.parts} />
    </div>
  );

};

export default Course;
