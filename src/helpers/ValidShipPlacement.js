
export const isValidShipPlacement = (gameBoard,row, col, isHorizontal) => {
    for (let i = 0; i < 4; i++) {
      if (isHorizontal && (col + i >= 9 || gameBoard[row][col + i] === 'S')) {
        return false;
      }
      if (!isHorizontal && (row + i >= 9 || gameBoard[row + i][col] === 'S')) {
        return false;
      }
    }
    return true;
};