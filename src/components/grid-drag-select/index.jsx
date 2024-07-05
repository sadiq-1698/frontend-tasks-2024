import React, { useCallback, useState } from "react";
import "./styles.css";

const GridSelectDrag = ({ rows, cols }) => {
  const [selected, setSelected] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (boxNum) => {
    setSelected([boxNum]);
    setIsDragging(true);
  };

  const handleMouseEnter = useCallback(
    (boxNum) => {
      const startRow = Math.floor((selected[0] - 1) / cols) + 1;
      const startCol = ((selected[0] - 1) % cols) + 1;

      const endRow = Math.floor((boxNum - 1) / cols) + 1;
      const endCol = ((boxNum - 1) % cols) + 1;

      const minRow = Math.min(startRow, endRow);
      const maxRow = Math.max(startRow, endRow);

      const minCol = Math.min(startCol, endCol);
      const maxCol = Math.max(startCol, endCol);

      const draggedOverBoxes = new Set();

      for (let i = minRow; i <= maxRow; i++) {
        for (let j = minCol; j <= maxCol; j++) {
          draggedOverBoxes.add((i - 1) * cols + j);
        }
      }

      setSelected((prev) => [prev[0], ...draggedOverBoxes]);
    },
    [selected, cols]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
    setSelected([]);
  };

  return (
    <div
      onMouseUp={handleMouseUp}
      className="grid-drag-wrapper"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {[...Array.from({ length: rows * cols })].map((_, idx) => {
        const isSelected = selected.includes(idx + 1);
        return (
          <div
            key={rows * cols - idx}
            onMouseDown={() => handleMouseDown(idx + 1)}
            className={`grid-drag-box ${isSelected ? "selected" : ""}`}
            onMouseEnter={() => isDragging && handleMouseEnter(idx + 1)}
          >
            {idx + 1}
          </div>
        );
      })}
    </div>
  );
};

export default GridSelectDrag;
