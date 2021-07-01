import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./pages/Routes";
import {BrowserRouter as Router} from "react-router-dom";
import TopBar from "./components/TopBar";
import {CurrentUserProvider} from "./contexts/currentUser";
import CurrentUserChecker from "./components/CurrentUserChecker";

const App = () => {
  return (
      <CurrentUserProvider>
        <CurrentUserChecker>
          <Router>
            <TopBar />
            <Routes />
          </Router>
        </CurrentUserChecker>
      </CurrentUserProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

