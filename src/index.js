import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./pages/Routes";
import {BrowserRouter as Router} from "react-router-dom";

const App = () => {
  return (
      <div>
        <h3>Welcome</h3>
        <Router>
          <Routes />
        </Router>
      </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

