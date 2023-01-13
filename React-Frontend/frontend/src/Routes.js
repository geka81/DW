import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import Header from './components/header';
import Register from './components/auth/register';
import Login from "./components/auth/login";
import Logout from "./components/auth/logout";
import Single from "./components/videos/single";
import Search from './components/videos/search';
import Admin from './Admin';
import Create from './components/admin/create';
import Edit from './components/admin/edit';
import Delete from './components/admin/delete';
import ChatRegister from './components/chat/Register';
import ChatLogin from './components/chat/Login';
import WebPush from './components/videos/webpush';
import Home from './components/chat/Home';
import ContactUs from './components/videos/contact';
import { useContext } from "react";
import { AuthContext } from "./components/chat/AuthContext";


function Routes() {

    const {currentUser} = useContext(AuthContext)
    console.log(currentUser)

    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/admin/create" component={Create} />
                <Route exact path="/admin/edit/:id" component={Edit} />
                <Route exact path="/admin/delete/:id" component={Delete} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/video/:id" component={Single} />
                <Route path="/search" component={Search} />
                <Route path="/webpush" component={WebPush} />
                <Route path="/chat/register" component={ChatRegister} />
                <Route path="/chat/login" component={ChatLogin} />
                <Route path="/chat/home" component={Home} />
                <Route path="/email/contact" component={ContactUs} />
            </Switch>
        </Router>
    )
}

export default Routes;