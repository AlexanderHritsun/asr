import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom'
import AddPost from "./pages/Posts/AddPost";
import Help from "./pages/Help";
import ServiceSpecificPage from "./pages/Services/OneService";
import Services from "./pages/Services";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Home from "./pages/Home";
import EditUser from "./pages/Users/EditUser";
import PostSpecificPage from "./pages/Posts/PostPage";
import CreateService from "./pages/Services/createServicePage";


const Routes = ({isAuthenticated, isModer, isAdmin}) => {

    return (
        <Switch>

            {!isAuthenticated && 
                <Route path="/registration">
                    <Register />
                </Route>}
            {!isAuthenticated && 
                <Route path="/login">
                    <Login />
                </Route>}

            {isAuthenticated && 
                <Route path="/posts/create" exact>
                    <AddPost />
                </Route>}

            {isAuthenticated && (isModer || isAdmin) && 
                <Route path="/services/create">
                    <CreateService />
                </Route>}

            {isAuthenticated && isAdmin && 
                <Route path="/users">
                    <Users />
                </Route>}
            {isAuthenticated && isAdmin && 
                <Route path="/users/:id/edit">
                    <EditUser />
                </Route>}

            <Route path="/posts" exact>
                <Home />
            </Route>
            <Route path="/posts/:id">
                <PostSpecificPage />
            </Route>
            <Route path="/support">
                <Help />
            </Route>
            <Route path="/services/:id">
                <ServiceSpecificPage />
            </Route>
            <Route path="/services">
                <Services />
            </Route>

            <Redirect to="/posts" />
        </Switch>
    )
}

export default Routes;