/* tslint:disable */
import * as React from "react";
import "./styles.css";

import {BoardState} from "../../services/types";

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

export default History;