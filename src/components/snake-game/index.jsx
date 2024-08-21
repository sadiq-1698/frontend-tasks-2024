import "./styles.css";
import { useEffect, useState } from "react";

// 15x15 grid [Done]
// Snake should be controlled with cursor keys (or WASD if you prefer) [Done]
// Snake should start with a length of 3 [Done]
// One apple at a time should appear in a random position on the grid. When collected, it should increase the score by one, increase the snake length by one, and change to another random position
// Display a score for how many apples have been collected [Done]
// If the snake head collides with the rest of the body, the game should end
// If the snake head collides with the borders, the game should end

const SNAKE_GRID = [
  ...Array.from({ length: 15 }, () => new Array(15).fill("")),
];
const INITIAL_SNAKE_COORDINATES = [
  [0, 11],
  [0, 12],
  [0, 13],
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
const generateFood = () => {
  return [
    Math.floor(Math.random() * (15 - 0) + 0),
    Math.floor(Math.random() * (15 - 0) + 0),
  ];
};

const SnakeGame = () => {
  const [score, setScore] = useState(0);
  const [food, setFood] = useState(generateFood());
  const [direction, setDirection] = useState(DIRECTIONS[3]);
  const [snakeCoords, setSnakeCoords] = useState(INITIAL_SNAKE_COORDINATES);

  const isSnakeCoord = (x, y) => {
    return snakeCoords.some(([a, b]) => a === x && b === y);
  };

  const isFoodCoord = (x, y) => {
    return x === food[0] && y === food[1];
  };

  const handleKeyDown = (e) => {
    if (!DIRECTIONS.map((el) => el.direction).includes(e.keyCode)) return;

    if (direction.opposite === e.keyCode || direction.direction === e.keyCode) {
      return;
    }

    setDirection(DIRECTIONS.find((el) => el.direction === e.keyCode));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSnakeCoords((prev) => {
        let snakeCoordsCopy = [...prev];
        const head = snakeCoordsCopy[0];
        let newHead;
        snakeCoordsCopy.pop();
        if (direction.direction === DIRECTIONS[0].direction) {
          newHead = [head[0] - 1, head[1]];
        } else if (direction.direction === DIRECTIONS[1].direction) {
          newHead = [head[0], head[1] + 1];
        } else if (direction.direction === DIRECTIONS[2].direction) {
          newHead = [head[0] + 1, head[1]];
        } else if (direction.direction === DIRECTIONS[3].direction) {
          newHead = [head[0], head[1] - 1];
        }
        snakeCoordsCopy = [newHead, ...snakeCoordsCopy];
        return [...snakeCoordsCopy];
      });
    }, 100);
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyDown={handleKeyDown}
      className="snake-game-wrapper"
    >
      <div>Score: {score}</div>
      {SNAKE_GRID.map((row, rowIdx) => {
        return (
          <div className="snake-game-grid">
            {row.map((col, colIdx) => {
              const isFood = rowIdx === food[0] && colIdx === food[1];
              const foodClass = isFood ? "food" : "";

              const isSnake = snakeCoords.some(
                ([a, b]) => a === rowIdx && b === colIdx
              );
              const snakeClass = isSnake ? "snake" : "";

              return <div className={`box ${foodClass} ${snakeClass}`}></div>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default SnakeGame;
