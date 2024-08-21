import "./styles.css";
import { useEffect, useState } from "react";

// 15x15 grid [Done]
// Snake should be controlled with cursor keys (or WASD if you prefer)
// Snake should start with a length of 3 [Done]
// One apple at a time should appear in a random position on the grid. When collected, it should increase the score by one, increase the snake length by one, and change to another random position
// Display a score for how many apples have been collected
// If the snake head collides with the rest of the body, the game should end
// If the snake head collides with the borders, the game should end

const SNAKE_GRID = [
  ...Array.from({ length: 15 }, () => new Array(15).fill("")),
];
const INITIAL_SNAKE_COORDINATES = [
  [0, 1],
  [0, 2],
  [0, 3],
];
const DIRECTIONS = [
  {
    direction: 38, //top
    opposite: 40, // bottom
  },
  {
    direction: 39, //right
    opposite: 37, // left
  },
  {
    direction: 40, // bottom
    opposite: 38, //top
  },
  {
    direction: 37, // left
    opposite: 39, //right
  },
];

const SnakeGame = () => {
  const [direction, setDirection] = useState(DIRECTIONS[3]);
  const [snakeCoords, setSnakeCoords] = useState(INITIAL_SNAKE_COORDINATES);

  const isSnakeCoord = (x, y) => {
    return snakeCoords.some(([a, b]) => a === x && b === y);
  };

  const handleKeyDown = (e) => {
    if (!DIRECTIONS.map((el) => el.direction).includes(e.keyCode)) return;

    if (direction.opposite === e.keyCode || direction.direction === e.keyCode) {
      return;
    }

    setDirection(DIRECTIONS.find((el) => el.direction === e.keyCode));
  };

  useEffect(() => {
    // setSnakeCoords((prev) => )
    // let snakeCoordsCopy = [...snakeCoords];
    // const head = snakeCoordsCopy[0];
    // let newHead;
    // snakeCoordsCopy.pop();
    // if (direction.direction === DIRECTIONS[0].direction) {
    //   newHead = [head[0] - 1, head[1]];
    // } else if (direction.direction === DIRECTIONS[1].direction) {
    //   newHead = [head[0], head[1] + 1];
    // } else if (direction.direction === DIRECTIONS[2].direction) {
    //   newHead = [head[0] + 1, head[1]];
    // } else if (direction.direction === DIRECTIONS[3].direction) {
    //   newHead = [head[0], head[1] - 1];
    // }
    // snakeCoordsCopy = [newHead, ...snakeCoordsCopy];
    // setSnakeCoords([...snakeCoordsCopy]);
  }, [direction]);

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyDown={handleKeyDown}
      className="snake-game-wrapper"
    >
      {SNAKE_GRID.map((row, rowIdx) => {
        return (
          <div className="snake-game-grid">
            {row.map((col, colIdx) => {
              const bgClass = isSnakeCoord(rowIdx, colIdx) ? " snake" : "";
              return <div className={`box ${bgClass}`}></div>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default SnakeGame;
