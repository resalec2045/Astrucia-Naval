
export const checkShipDestroyed = (board, row, col) => {
  
    // Check horizontally
    let horizontalDestroyed = true;
    let colTemp = col;

    while (col < 9 && board[row][colTemp] != '-' && board[row][colTemp] != 'O' && board[row][colTemp] != undefined) {
      colTemp++;
    }
    
    for (let i = 1; i <= 4; i++) {
      if (board[row][colTemp - i] != 'X') {
        horizontalDestroyed = false;
        break;
      }
    }

    // Check verticalmente
    let verticalDestroyed = true;
    let rowTemp = row;

    while (rowTemp < 9 && board[rowTemp][col] != '-' && board[rowTemp][col] != 'O' && board[rowTemp][col] != undefined) {
      rowTemp++;
    }

    for (let i = 1; i <= 4; i++) {
      const rowIndex = rowTemp - i;
      if (rowIndex < 0 || board[rowIndex][col] !== 'X') {
        verticalDestroyed = false;
        break;
      }
    }

    return horizontalDestroyed || verticalDestroyed;
  };  

