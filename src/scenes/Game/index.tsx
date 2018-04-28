import * as React from "react";
import "./styles.css";

import {calculateWinner} from "./services/functions";
import {IBoardState} from "./services/types";

import Board from "./components/Board";
import History from "./components/History";

interface IGameState {
  history: IBoardState[],
  currentStep: number
}

const initialGameState: IGameState =  {
  currentStep: 0,
  history: [
    {
      isNextX: true,
      squares: Array(9).fill(null)
    }
  ]  
};

class Game extends React.Component<object, IGameState> {
  public readonly state: IGameState = initialGameState;

  public render() {
    const history = this.state.history;
    const currentStep = this.state.currentStep;
    const squares = history[currentStep].squares;
    const isNextX = history[currentStep].isNextX;
    const winner = calculateWinner(squares);
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
            onClick={this.handleClick}
            isNextX={isNextX}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>
            <History history={history} onClick={this.jumpTo} />
            </ol>
        </div>
      </div>
    );
  }

  private handleClick = (i: number) => {
    let currentStep = this.state.currentStep;
    const history = this.state.history.slice(0, currentStep + 1);    
    const squares = history[currentStep].squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    let isNextX = history[currentStep].isNextX;
    squares[i] = isNextX ? "X" : "O";
    isNextX = !isNextX;
    currentStep = history.length;
    history.push({squares, isNextX});
    this.setState({
      currentStep,
      history  
    });
  }

  private jumpTo = (step: number) => {
    this.setState({
      currentStep: step      
    });
  }
}

export default Game;