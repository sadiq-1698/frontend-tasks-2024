import { useEffect, useState } from "react";
import "./styles.css";

const TIC_TAC_TOE_GRID = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];

const TicTacToe = () => {
  const [gameGrid, setGameGrid] = useState(TIC_TAC_TOE_GRID);
  const [isPlayerOne, setIsPlayerOne] = useState(true);
  const [gameWin, setGameWin] = useState(false);

  const togglePlayerTurn = () => setIsPlayerOne((prev) => !prev);

  const restartGame = () => {
    setGameWin(false);
    setIsPlayerOne(true);
  };

  const handleGridClick = (row, col) => {
    if (gameGrid[row][col] !== -1) return;

    setGameGrid((prev) => {
      let copy = [...prev];
      copy[row][col] = isPlayerOne ? 1 : 0;
      return copy;
    });

    togglePlayerTurn();
  };

  useEffect(() => {
    const checkWin = (grid) => {
      const winCondition = (a, b, c) => a !== -1 && a === b && a === c;

      for (let i = 0; i < 3; i++) {
        if (
          winCondition(grid[i][0], grid[i][1], grid[i][2]) ||
          winCondition(grid[0][i], grid[1][i], grid[2][i])
        ) {
          return true;
        }
      }

      return (
        winCondition(grid[0][0], grid[1][1], grid[2][2]) ||
        winCondition(grid[0][2], grid[1][1], grid[2][0])
      );
    };

    if (checkWin(gameGrid)) {
      setGameWin(true);
    }
  }, [gameGrid]);

  return (
    <div className="t3-grid-wrapper">
      {gameWin ? (
        <div className="game-over-wrapper">
          <h1>{isPlayerOne ? "Player 2 Won" : "Player 1 Won"}</h1>
          <br />
          <button autoFocus={true} onClick={restartGame}>
            Play again
          </button>
        </div>
      ) : (
        <div className="t3-grid">
          {gameGrid.map((row, rowIdx) => {
            return (
              <div className="t3-grid-row">
                {row.map((col, colIdx) => {
                  return (
                    <div
                      className="t3-grid-col"
                      onClick={() => handleGridClick(rowIdx, colIdx)}
                    >
                      <div className="t3-grid-item">
                        {col === 1 ? "✖️" : col === 0 ? "⚫" : ""}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
