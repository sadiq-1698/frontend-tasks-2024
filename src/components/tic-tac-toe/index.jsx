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
    const isDiagonalCheck = (grid) => {
      return (
        (grid[0][0] === grid[1][1] &&
          grid[0][0] === grid[2][2] &&
          grid[0][0] !== -1) ||
        (grid[0][2] === grid[1][1] &&
          grid[0][2] === grid[2][0] &&
          grid[0][2] !== -1)
      );
    };

    const isHorizontalCheck = (grid) => {
      for (let i = 0; i < grid.length; i++) {
        const valCheck = grid[i][0];
        if (valCheck === -1) continue;
        for (let j = 1; j < grid.length; j++) {
          if (grid[i][j] !== valCheck) break;
          if (j === grid.length - 1) {
            console.log("came here");
            return true;
          }
        }
      }
      return false;
    };

    const isVerticalCheck = (grid) => {
      for (let i = 0; i < grid.length; i++) {
        const valCheck = grid[0][i];
        for (let j = 1; j < grid.length; j++) {
          if (valCheck !== grid[i][j]) break;
          if (i === grid.length - 1) return true;
        }
      }
      return false;
    };

    if (
      isDiagonalCheck(gameGrid) ||
      isHorizontalCheck(gameGrid)
      //  ||
      //   isVerticalCheck(gameGrid)
    ) {
      setGameWin(true);
    }
  }, [gameGrid]);

  console.log(gameGrid);

  return (
    <div className="t3-grid-wrapper">
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
                      {/* {"[" + rowIdx + "]" + "[" + colIdx + "]"} */}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div>
        {gameWin ? (isPlayerOne ? "Player 2 Won" : "Player 1 Won") : ""}
      </div>
    </div>
  );
};

export default TicTacToe;
