import "./styles.css";
import { useEffect, useRef, useState } from "react";

// 15x15 grid [Done]
// Snake should be controlled with cursor keys (or WASD if you prefer) [Done]
// Snake should start with a length of 3 [Done]
// One apple at a time should appear in a random position on the grid. [Done]
//  - When collected, it should increase the score by one,
//  - increase the snake length by one,
//  - and change to another random position
// Display a score for how many apples have been collected [Done]
// If the snake head collides with the rest of the body, the game should end [Done]
// If the snake head collides with the borders, the game should end [Done]

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
const handleSnakeDirection = (prev, direction) => {
  let snakeCoordsCopy = [...prev];
  const head = snakeCoordsCopy[0];
  let newHead;

  snakeCoordsCopy.pop();

  if (direction?.direction === DIRECTIONS[0].direction) {
    newHead = [head[0] - 1, head[1]];
  } else if (direction?.direction === DIRECTIONS[1].direction) {
    newHead = [head[0], head[1] + 1];
  } else if (direction?.direction === DIRECTIONS[2].direction) {
    newHead = [head[0] + 1, head[1]];
  } else if (direction?.direction === DIRECTIONS[3].direction) {
    newHead = [head[0], head[1] - 1];
  }

  snakeCoordsCopy = [newHead, ...snakeCoordsCopy];
  return [...snakeCoordsCopy];
};
const handleSnakeLength = (prevDir, coords, setSnakeCoords) => {
  let snakeCoordsCopy = [...coords];
  const tail = snakeCoordsCopy[snakeCoordsCopy.length - 1];
  let newTail;

  if (prevDir?.direction === DIRECTIONS[0].direction) {
    newTail = [tail[0] - 1, tail[1]];
  } else if (prevDir?.direction === DIRECTIONS[1].direction) {
    newTail = [tail[0], tail[1] + 1];
  } else if (prevDir?.direction === DIRECTIONS[2].direction) {
    newTail = [tail[0] + 1, tail[1]];
  } else if (prevDir?.direction === DIRECTIONS[3].direction) {
    newTail = [tail[0], tail[1] - 1];
  }

  snakeCoordsCopy = [...snakeCoordsCopy, newTail];
  setSnakeCoords([...snakeCoordsCopy]);
  return prevDir;
};
const isGameOver = (snakeCoords) => {
  if (
    snakeCoords[0][0] < 0 ||
    snakeCoords[0][0] >= 15 ||
    snakeCoords[0][1] < 0 ||
    snakeCoords[0][1] >= 15 ||
    snakeCoords
      .slice(1)
      .some(([a, b]) => snakeCoords[0][0] === a && snakeCoords[0][1] === b)
  ) {
    return true;
  }
  return false;
};

const SnakeGame = () => {
  const gameRef = useRef();

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [food, setFood] = useState(generateFood());
  const [direction, setDirection] = useState(DIRECTIONS[3]);
  const [snakeCoords, setSnakeCoords] = useState(INITIAL_SNAKE_COORDINATES);

  const restartGame = () => {
    setScore(0);
    setFood(generateFood());
    setDirection(DIRECTIONS[3]);
    setSnakeCoords(INITIAL_SNAKE_COORDINATES);
    setGameOver(false);
    gameRef.current.focus();
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
      setSnakeCoords((prev) => handleSnakeDirection(prev, direction));
    }, 100);
    return () => clearInterval(interval);
  }, [direction]);

  useEffect(() => {
    setFood((prev) => {
      const [snakeHeadX, snakeHeadY] = snakeCoords[0];
      const [foodX, foodY] = prev;

      if (foodX === snakeHeadX && snakeHeadY === foodY) {
        setDirection((prev) =>
          handleSnakeLength(prev, snakeCoords, setSnakeCoords)
        );
        setScore((prev) => prev + 1);
        return generateFood();
      }

      return prev;
    });

    if (isGameOver(snakeCoords)) {
      setGameOver(true);
    }
  }, [snakeCoords]);

  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.focus();
    }
  }, []);

  return (
    <div
      tabIndex={0}
      role="button"
      ref={gameRef}
      onKeyDown={handleKeyDown}
      className="snake-game-wrapper"
    >
      {!gameOver ? (
        <>
          <div>Score: {score}</div>
          {SNAKE_GRID.map((row, rowIdx) => {
            return (
              <div
                className="snake-game-grid"
                key={rowIdx + "-" + (rowIdx - 15)}
              >
                {row.map((_, colIdx) => {
                  const isFood = rowIdx === food[0] && colIdx === food[1];
                  const foodClass = isFood ? "food" : "";

                  const isSnake = snakeCoords.some(
                    ([a, b]) => a === rowIdx && b === colIdx
                  );
                  const snakeClass = isSnake ? "snake" : "";

                  return (
                    <div
                      key={colIdx + "-" + (colIdx - 15)}
                      className={`box ${foodClass} ${snakeClass}`}
                    ></div>
                  );
                })}
              </div>
            );
          })}
        </>
      ) : (
        <div className="game-over-wrapper">
          <h1>Game Over</h1>
          <h3>Your Score: {score}</h3>
          <br />
          <button autoFocus={true} onClick={restartGame}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
