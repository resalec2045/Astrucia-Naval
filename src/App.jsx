/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import { useState, useEffect } from 'react';
import { GameBoard } from './components/GameBoard';
import { checkShipDestroyed } from './helpers/CheckShipDestroyed';
import { isValidShipPlacement } from './helpers/ValidShipPlacement';
import { convertLetters } from './helpers/ConvertLetters';
import Swal from 'sweetalert2';

export const App = () => {

  const [inputCommand, setInputCommand] = useState();
  const [gameBoard, setGameBoard] = useState(Array.from({ length: 10 }, () => Array(10).fill('-')));
  const [shipsDestroyed, setShipsDestroyed] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeGame();
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
    const row = convertLetters(command[0]);
    const col = command[1];
    const isHit = gameBoard[row-1][col-1] === 'S';
    const newGameBoard = [...gameBoard];
    newGameBoard[row - 1][col - 1] = isHit ? 'X' : 'O';

    if (isHit) {
      const shipDestroyed = checkShipDestroyed(newGameBoard, row - 1, col - 1);
      
      if (shipDestroyed) {
        setShipsDestroyed(shipsDestroyed + 1);
      }
    }

    setGameBoard(newGameBoard);
  }

  const initializeGame = () => {
    let newGameBoard = Array.from({ length: 10 }, () => Array(10).fill('-'));
    setShipsDestroyed(0);
  
    for (let ship = 0; ship < 5; ship++) {
      let shipRow, shipCol, isHorizontal;
  
      do {
        shipRow = getRandomInt(0, 9);
        shipCol = getRandomInt(0, 9);
        isHorizontal = Math.random() < 0.5;
      } while (!isValidShipPlacement(gameBoard, shipRow, shipCol, isHorizontal));
  
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

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <>
      <div className='game-container'>
        <h1>Astucia Naval</h1>
        <div className="game-container__insert">
          <input
            type="text"
            value={inputCommand}
            onChange={(e) => setInputCommand(e.target.value.toUpperCase())}
            placeholder="Enter command (D.1, H.3, C.2...)"
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
