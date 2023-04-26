import React, { useEffect, useState } from "react";
import socketIoClient from 'socket.io-client';
import UserLogin from "./UserLogin";
import ChatBoxReceiver from "./ChatBoxReceiver";
import ChatBoxSender from "./ChatBoxSender";
import InputText from "./InputText";


export default function ChatContainer() {
    //sets connectction for client to your backend *must be the same backend endpoint*
    let socketio = socketIoClient('http://localhost:4000');

    //all chats recived by client and sent from backend
    const [chats, setChats] = useState([]);
    const [user, setUser] = useState(localStorage.getItem('user'));
    const [avatar, setAvatar] = useState(localStorage.getItem('avatar'));

//  REQUIRES: socketio and socket io client
//  MODIFIES: chats state 
//  EFFECTS: on recieving an event named chat that event will give us a group of chats
//          that is contained within that parcitular socket channel and then we 
//          setChats to that recieved chats
    useEffect(() => {
        socketio.on('chat', recievedChats => {
            setChats(recievedChats);
        })
    })


//  REQUIRES: socketio and socket io client
//  MODIFIES: all other clients' chats
//  EFFECTS: sends an event named chat with the content of chat variable to the backend
//          to be emitted by the backend to all other connected clients
    function sendChatsToBackend(chat) {
        socketio.emit('chat', chat);
    }


//  REQUIRES: socketio and socket io client
//  MODIFIES: all other clients' chats
//  EFFECTS: updates your list of chats and then send your new chat with your username
//          and avatar to the other clients
    function addMessage(chat) {
        const newChat = {...chat, user, avatar};
        setChats([...chats, newChat]);
        sendChatsToBackend([...chats, newChat]);
    }

    function logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('avatar');
        setUser('')
    }

    //maps over chat checking which user sent which chats either sender or reciever
    function ChatsList() {
        return chats.map((chat, index) => {
            if (chat.user === user) {
                return <ChatBoxReceiver key={index} avatar={chat.avatar} user={chat.user} message={chat.message}/>
            } else {
                return <ChatBoxSender key={index} avatar={chat.avatar} user={chat.user} message={chat.message}/>
            }
        })
    }

    return (
            user ? 
            <div>
                <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <h4>{user}</h4>
                    <p onClick={() => logout()}>Log out</p>
                </div>
                <ChatsList />
                <InputText addMessage={addMessage}/>
            </div>
            
            : 
            
            <UserLogin setUser={setUser}/>
    )
}