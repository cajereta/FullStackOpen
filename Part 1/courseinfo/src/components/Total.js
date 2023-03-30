

const Total = ({ parts }) => {
  const [a, b, c] = parts;
  console.log(a, b, c);
  return (
    <>
      <h1>Total</h1>
      {a.exercises + b.exercises + c.exercises}
    </>
  );
};

export default Total;