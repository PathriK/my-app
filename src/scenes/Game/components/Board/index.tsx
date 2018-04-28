import * as React from "react";
import "./styles.css";

import {User} from "../../services/types";

import Square from "../Square";

interface IBoardProps {
  squares: User[],
  isNextX: boolean
  onClick(i: number): void,  
}

class Board extends React.Component<IBoardProps, object> {
  public render() {
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
    
  private renderSquare(i: number) {
    return (
      <Square value={this.props.squares[i]} onClick={this.props.onClick.bind(this, i)} />
    );
  }
}

export default Board;