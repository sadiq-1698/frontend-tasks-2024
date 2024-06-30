import GridSelect from ".";

const GRID = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const GridSelectComponent = () => {
  return (
    <>
      <p style={{ marginBottom: "10px" }}>Grid Select</p>
      <GridSelect grid={GRID} />
    </>
  );
};

export default GridSelectComponent;
