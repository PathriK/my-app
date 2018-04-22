/* tslint:disable */
import * as React from "react";
import "./styles.css";

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

export default Square;