const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <h4>Number of exercises {sum}</h4>;

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  if (parts.length === 0) {
    return null;
  }
  return parts.map((part) => (
    <Part key={part.id} part={{ name: part.name, exercises: part.exercises }} />
  ));
};

const Course = ({ course }) => {
  const { name, parts } = course;
  const sum = parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total sum={sum} />
    </div>
  );
};

export default Course;
