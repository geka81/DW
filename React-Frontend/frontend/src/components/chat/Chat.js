import React, { useContext } from "react";
import Cam from "../../static/chat/cam.png";
import Add from "../../static/chat/add.png";
import More from "../../static/chat/more.png";
import Messages from "./Messages";
import Input from "./Input";
import Login from "./Login";
import { ChatContext } from "./ChatContext";


const Chat = () => {
  const {data} = useContext(ChatContext)

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <div className="chatIcons">
            <img src={Cam} alt="" width="25"/>
            <img src={Add} alt="" width="25"/>
            <img src={More} alt="" width="25"/>
          </div>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;