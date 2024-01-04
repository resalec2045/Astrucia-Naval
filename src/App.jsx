/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import { useState, useEffect } from 'react';
import { GameBoard } from './components/GameBoard';
import Swal from 'sweetalert2';
export const App = () => {

  const [inputCommand, setInputCommand] = useState();
  // eslint-disable-next-line no-unused-vars
  const [gameBoard, setGameBoard] = useState(Array.from({ length: 10 }, () => Array(10).fill('-')));
  // const [shipCount, setShipCount] = useState(5);
  const [shipsDestroyed, setShipsDestroyed] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (shipsDestroyed === 5) {
      Swal.fire({
        title: "Congratulations!",
        text: "Ganaste!",
        icon: "success"
      });
      resetGame();
    } 
    if (shipsDestroyed > 0) {
      Swal.fire({
        title: "Good job!",
        text: "Acabas de undir un barco!",
        icon: "success"
      });
    }
  }, [shipsDestroyed])
  
  
  const resetGame = () => {
    initializeGame();
    setInputCommand('');
  };

  const executeCommand = () => {
    
    const command = inputCommand.split('.');
    const row = command[0];
    const col = command[1];
    const isHit = gameBoard[row-1][col-1] === 'S';
    const newGameBoard = [...gameBoard];
    newGameBoard[row - 1][col - 1] = isHit ? 'X' : 'O';

    if (isHit) {
      // Check if the entire ship is destroyed
      const shipDestroyed = checkShipDestroyed(newGameBoard, row - 1, col - 1);
      
      console.log(shipDestroyed)
      
      if (shipDestroyed) {
        setShipsDestroyed(shipsDestroyed + 1);
      }
    }
  
    setGameBoard(newGameBoard);
    console.log(shipsDestroyed)

  }

  const checkShipDestroyed = (board, row, col) => {
  
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

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  const isValidShipPlacement = (row, col, isHorizontal) => {
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

  const initializeGame = () => {
    let newGameBoard = Array.from({ length: 10 }, () => Array(10).fill('-'));
    setShipsDestroyed(0);
  
    for (let ship = 0; ship < 5; ship++) {
      let shipRow, shipCol, isHorizontal;
  
      do {
        shipRow = getRandomInt(0, 9);
        shipCol = getRandomInt(0, 9);
        isHorizontal = Math.random() < 0.5;
      } while (!isValidShipPlacement(shipRow, shipCol, isHorizontal));
  
      for (let i = 0; i < 4; i++) {
        if (isHorizontal) {
          newGameBoard[shipRow][shipCol + i] = 'S';
        } else {
          newGameBoard[shipRow + i][shipCol] = 'S';
        }
      }
    }

    setGameBoard(newGameBoard);
    setLoading(false);
  };

  return (
    <>
      <div className='game-container'>
        <h1>Astucia Naval</h1>
        <div className="">
          <input
            type="text"
            value={inputCommand}
            onChange={(e) => setInputCommand(e.target.value.toUpperCase())}
            placeholder="Enter command (e.g., D1, H3, C2)"
          />
          <button onClick={executeCommand}>Ejecutar</button>
          <button onClick={resetGame}>Reset</button>
        </div>
        {
          loading ? false : <GameBoard gameBoard={gameBoard} />
        }
      </div>
    </>
  )
};
