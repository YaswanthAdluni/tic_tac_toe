

import { useState } from 'react';

function Square({value, onSquareClick}){ // don't forget to place curly brac's it will stop completely showing / rendering on browser.

   // const [value, setValue] = useState(Array(9)).fill(null);

    //function Handle_Click(){
      //   setValue('X');
    //}
return (<button className="square" onClick={onSquareClick}>
      {value}</button>
      );
}

function Board({xIsNext,squares,onPlay}) {
  
  // one single element comma, <button className="square">X</button>;

  function HandleClick(i){
    if (squares[i]|| calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();

    if(xIsNext){
    nextSquares[i] = "X";
    }else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return  (<>
       <div className="status">{status}</div>
       <div className="board-row">
        <Square value={squares[0]} onSquareClick= {() => HandleClick(0)}/>
        <Square value={squares[1]} onSquareClick= {() => HandleClick(1)}/>
        <Square value={squares[2]} onSquareClick= {() => HandleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick= {() => HandleClick(3)}/>
        <Square value={squares[4]} onSquareClick= {() => HandleClick(4)}/>
        <Square value={squares[5]} onSquareClick= {() => HandleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick= {() => HandleClick(6)}/>
        <Square value={squares[7]} onSquareClick= {() => HandleClick(7)}/>
        <Square value={squares[8]} onSquareClick= {() => HandleClick(8)}/>
      </div>
    </>)
}

export default function Game(){
  //const[xIsNext, setXINext] = useState(true);
  const[history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0);
//#const currentSquares = history[history.length -1]
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  

  function HandlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
     setHistory(nextHistory);
     setCurrentMove(nextHistory.length - 1);
    //setHistory([...history, nextSquares]);
     //setXINext(!xIsNext);

  } 

   function jumpTo(nextMove) {
     setCurrentMove(nextMove)
    // setXINext(nextMove % 2 === 0)
    // TODO
  }


  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return(
    <div className= "game">
      <div className = "game_board">
        <Board xIsNext = {xIsNext} squares={currentSquares}  onPlay ={HandlePlay} />
      </div>
      <div className = "game-info"> {moves}  </div>
    </div>
  )

}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

