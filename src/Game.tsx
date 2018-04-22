/* tslint:disable */
import * as React from "react";
import "./Game.css";

interface ISquareProps {
  onClick(e: React.MouseEvent<HTMLElement>): void,
  value: string
}

const Square: React.SFC<ISquareProps> = props => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

interface IBoardProps {
  squares: Square[],
  onClick(i: number): void,
  isNextX: boolean
}

class Board extends React.Component<IBoardProps, object> {
  renderSquare(i: number) {
    return (
      <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
    );
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

type Square = string;
type BoardState = { squares: Square[], isNextX: boolean};

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

// type GameState = Readonly<typeof initialGameState>;

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

interface IHistoryProps {
  history: BoardState[],
  onClick(step: number): void
}

class History extends React.Component<IHistoryProps, object> {
  render() {
    let history = this.props.history;
    return history.map((state, step) => {
      return (<li key={step}>
        <button onClick={() => {this.props.onClick(step)}}>Goto Step{step}</button>
      </li>);
    });
  }
}

function calculateWinner(squares: Square[]) {
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

export default Game;