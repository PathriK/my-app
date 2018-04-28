import * as React from "react";
import "./styles.css";

interface ISquareProps {
  value: string
  onClick(e: React.MouseEvent<HTMLElement>): void,  
}

const Square: React.SFC<ISquareProps> = props => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;