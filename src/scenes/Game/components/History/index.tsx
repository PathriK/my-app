import * as React from "react";
import "./styles.css";

import {IBoardState} from "../../services/types";

interface IHistoryProps {
  history: IBoardState[],
  onClick(step: number): void
}

class History extends React.Component<IHistoryProps, object> {
  public render() {
    const history = this.props.history;
    return history.map((state, step) => {
      return (<li key={step}>
        <button onClick={this.props.onClick.bind(this, step)}>Goto Step{step}</button>
      </li>);
    });
  }
}

export default History;