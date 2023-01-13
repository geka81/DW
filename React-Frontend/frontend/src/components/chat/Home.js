import React from 'react';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import FBNotifications from "./FBNotifications";

const Home = () => {
    return (
        <div className="home">
            <div className="container">
                <Sidebar />
                <Chat />
                <FBNotifications />
            </div>
        </div>
    )
}

export default Home;