import Header from "./Header";
import Part from "./Part";

const Course = ({ course }) => {
  const { name, parts } = course;

  const totalExercises = parts.reduce((prev, curr) => {
    return prev + curr.exercises;
  }, 0);


  const renderedParts = parts.map(part => {
    return (
      <Part key={part.id} part={part} />
    );
  });

  return (
    <>
      <Header name={name} />
      {renderedParts}
      <h3>Total exercises: {totalExercises}</h3>
    </>
  );
};

export default Course;

