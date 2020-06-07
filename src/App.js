import React, {useCallback} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Header from './components/Header';
import Menu from './components/Sidebar';
import {BrowserRouter as Router,} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";

function App() {
    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated, false, true);
    const header = Header(isAuthenticated);
    const menu = Menu(isAuthenticated, true);

      return (
          <AuthContext.Provider value={{
              token, login, logout, userId, isAuthenticated
          }}>
                <div className="App">
                    <Router>
                        {header}
                        {menu}
                        <div>
                            {routes}
                        </div>
                    </Router>
                </div>
          </AuthContext.Provider>
      );
}

export default App;
