import React, {useCallback} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Header from './components/Header';
import Menu from './components/Sidebar';
import {BrowserRouter as Router,} from "react-router-dom";
import Routes from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";

function App() {
    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = !!token;

      return (
          <AuthContext.Provider value={{
              token, login, logout, userId, isAuthenticated
          }}>
                <div className="App">
                    <Router>
                        <Header isAuthenticated={isAuthenticated} />
                        <Menu isAuthenticated={isAuthenticated} isAdmin={true} />
                        <div className="content">
                            <Routes isAuthenticated={isAuthenticated} isModer={false} isAdmin={true} />
                        </div>
                    </Router>
                </div>
          </AuthContext.Provider>
      );
}

export default App;
