import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./index.css";
import Game from './scenes/Game';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Game />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
