/* tslint:disable */
import * as React from "react";
import "./styles.css";

import {BoardState} from "./services/types";
import {calculateWinner} from "./services/functions";

import Board from "./components/Board";
import History from "./components/History";

interface IGameState {
  history: BoardState[],
  currentStep: number
}

const initialGameState: IGameState =  {
  history: [
    {
      squares: Array(9).fill(null),
      isNextX: true
    }
  ],
  currentStep: 0,
};

class Game extends React.Component<object, IGameState> {
  readonly state: IGameState = initialGameState;

  handleClick(i: number) {
    let currentStep = this.state.currentStep;
    let history = this.state.history.slice(0, currentStep + 1);    
    let squares = history[currentStep].squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    let isNextX = history[currentStep].isNextX;
    squares[i] = isNextX ? "X" : "O";
    isNextX = !isNextX;
    currentStep = history.length;
    history.push({squares, isNextX});
    this.setState({
      history,
      currentStep
    });
  }

  jumpTo(step: number) {
    this.setState({
      currentStep: step      
    });
  }

  render() {
    let history = this.state.history;
    let currentStep = this.state.currentStep;
    let squares = history[currentStep].squares;
    let isNextX = history[currentStep].isNextX;
    let winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = "Winner:" + winner;
    } else {
      status = "Next Player: " + (isNextX ? "X" : "O");
    }
    
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            onClick={(i) => this.handleClick(i)}
            isNextX={isNextX}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>
            <History history={history} onClick={(step) => {this.jumpTo(step)}} />
            </ol>
        </div>
      </div>
    );
  }
}

export default Game;