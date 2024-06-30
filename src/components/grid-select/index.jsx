import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";

const GridBox = ({ handleClick, idx, value }) => {
  return (
    <div
      onClick={() => handleClick(idx)}
      className={`grid-box ${value === 1 ? "active" : ""}`}
    />
  );
};

const MemoizedGridBox = React.memo(GridBox);

const GridSelect = ({ grid }) => {
  const [deSelecting, setDeselecting] = useState(false);
  const [modifiedGrid, setModifiedGrid] = useState(grid.flat(Infinity));
  const [selectOrder, setSelectOrder] = useState(
    modifiedGrid.map((el, idx) => (el === 1 ? idx : null)).filter((el) => el)
  );

  const handleClick = useCallback(
    (idx) => {
      if (deSelecting) return;

      const handleEdgeCases = (prev) => {
        if (prev[idx] === 1) return prev;
        return prev.map((el, index) => (idx === index ? 1 : el));
      };

      setSelectOrder((prevOrder) => [idx, ...prevOrder]);
      setModifiedGrid((prev) => handleEdgeCases(prev));
    },
    [deSelecting]
  );

  useEffect(() => {
    if (selectOrder.length === modifiedGrid.length) setDeselecting(true);
    if (selectOrder.length <= 0) setDeselecting(false);

    if (deSelecting) {
      setTimeout(() => {
        const tempShiftOrder = selectOrder;
        const shiftedIndex = tempShiftOrder.shift();

        setModifiedGrid((prev) =>
          prev.map((el, idx) => (idx === shiftedIndex ? 0 : el))
        );
        setSelectOrder([...tempShiftOrder]);
      }, 500);
    }
  }, [deSelecting, selectOrder, modifiedGrid]);

  return (
    <div
      className="grid-wrapper"
      style={{
        gridTemplateColumns: `repeat(${Math.sqrt(modifiedGrid.length)}, 1fr)`,
      }}
    >
      {modifiedGrid.map((box, idx) => {
        return (
          <MemoizedGridBox
            idx={idx}
            value={box}
            handleClick={handleClick}
            key={modifiedGrid.length - idx}
          />
        );
      })}
    </div>
  );
};

export default GridSelect;
