import React from "react";
import addNotification from "react-push-notification";
import logo from "../../static/videos/logo.jpg";

function WebPush() {
    const clickToNotify = () => {
        addNotification({
            "title": "You got New Mssage",
            "message": "Check the Chat",
            duration: 4000,
            icon: logo,
            native: true,
            onClick: () => window.location = "localhost:3000/chat",
        });
    }
    return (
        <div>
            <button onClick={clickToNotify}>
                Click to Notificate
            </button>
        </div>
    );
}

export default WebPush;