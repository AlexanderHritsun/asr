import React from "react";
import {Switch, Route} from 'react-router-dom'
import AddPost from "./pages/Posts/AddPost";
import Help from "./pages/Help";
import OneService from "./pages/Services/OneService";
import Services from "./pages/Services";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Redirect from "react-router-dom/es/Redirect";
import EditUser from "./pages/Users/EditUser";

export const useRoutes = (isAuthenticated, isModer, isAdmin) => {
    if(isAuthenticated && isAdmin) {
        return (
            <Switch>
                <Route path="/users/:id/edit">
                    <EditUser />
                </Route>
                <Route path="/posts/create">
                    <AddPost />
                </Route>
                <Route path="/support">
                    <Help />
                </Route>
                <Route path="/services/:id">
                    <OneService />
                </Route>
                <Route path="/services">
                    <Services />
                </Route>

                <Route path="/users">
                    <Users />
                </Route>

                <Route path="/">
                    <Home />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    } else if (isAuthenticated && isModer) {
        return (
            <Switch>
                <Route path="/services/create">
                    <AddPost />
                </Route>
                <Route path="/support">
                    <Help />
                </Route>
                <Route path="/services/:id">
                    <OneService />
                </Route>
                <Route path="/services">
                    <Services />
                </Route>

                <Route path="/">
                    <Home />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/support">
                <Help />
            </Route>
            <Route path="/services/:id">
                <OneService />
            </Route>
            <Route path="/services">
                <Services />
            </Route>
            <Route path="/registration">
                <Register />
            </Route>
            <Route path="/login">
                <Login />
            </Route>

            <Route path="/">
                <Home />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}