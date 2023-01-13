import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "./AuthContext";
import { db } from "../../firebase";
import { ChatContext } from "./ChatContext";
import addNotification from "react-push-notification";

const Chats = () => {

  const [chats, setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });

    return () => {
      unsub();
    };
  };
    currentUser.uid && getChats()
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({type: "CHANGE_USER", payload: u})
  }


  return (
    <div className="chats">
      {Object.entries(chats)?.map((chat) => (
      <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
      {chats?.unread && (
        <h1 className="unread">New</h1>
      )}
        <img src={chat[1].userInfo.photoURL} alt=""/>
        <div className="userChatInfo">
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
      ))};
    </div>
  );
};

export default Chats;