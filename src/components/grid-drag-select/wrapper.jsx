import GridSelectDrag from ".";

const GridSelectDragComponent = () => {
  return (
    <>
      <p style={{ marginBottom: "10px" }}>Grid Select Drag</p>
      <GridSelectDrag rows={10} cols={10} />
    </>
  );
};

export default GridSelectDragComponent;
