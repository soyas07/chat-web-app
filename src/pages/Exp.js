import React from 'react'
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useTime from '../hooks/useTime';

const Exp = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState([]);
    const [roomId, setRoomId] = useState('');

    const [receiver, setReceiver] = useState({
        name: '',
        socket_id: '',
        last_update: '',
    });
    const [sender, setSender] = useState({
        name: 'john',
        socket_id: '',
        message: '',
        last_update: '',
    });
    const { getCurrentTime } = useTime();

    useEffect(() => {
        const newSocket = io("http://localhost:8080");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("connect", () => {
                setSender(prevData => ({ ...prevData, socket_id: socket.id }))
                console.log(socket.id);

                socket.on('private_message', ({ from, message }) => {
                    console.log(sender.message)
                    setMessages((prevMessages) => [...prevMessages, { from, message, last_update: getCurrentTime() }]);
                });
            });
        }
    }, [socket]);


    const sendMessage = () => {
        setUserMessage((prevMessage) => [...prevMessage, { from: sender.name, message: sender.message, last_update: getCurrentTime() }]);
        socket.emit("send", sender, receiver, roomId);
    }

    function leave () {
        socket.emit('leaveChat', `${sender.name}-inbox`);
    }

    const createChat = () => {
        socket.emit('createChat', { sender, receiver });
        socket.on('getRoomId', ({ id }) => {
            console.log(`Room Id: ${id}`);
            setRoomId(id);
        })
    }

    return (
        <div>
            <h2>Reciever Details</h2>
            <input 
                type="text" 
                value={receiver.name} 
                onChange={(e) => setReceiver(prevData => ({...prevData, name: e.target.value }))} 
                placeholder="Reciever Name" 
            /><br/>
            <input 
                type="text" 
                value={receiver.socket_id} 
                onChange={(e) => setReceiver(prevData => ({...prevData, socket_id: e.target.value }))} 
                placeholder="Reciever Socket ID" 
            /><br/>
            <br/>

            <h2>Sender Details</h2>
            <input 
                type="text" 
                value={sender.name} 
                onChange={(e) => setSender(prevData => ({...prevData, name: e.target.value, last_update: getCurrentTime() }))} 
                placeholder="Sender Name" 
            /><br/>
            <input 
                type="text" 
                value={sender.socket_id} 
                disabled={true}
                placeholder="Sender Socket ID" 
            /><br/>
            <br/>
            <textarea value={sender.message} onChange={e => setSender(prevData => ({...prevData, message: e.target.value }))} placeholder='enter your message' />
            <br/><br/>
            <button onClick={sendMessage}>send message</button><br/>
            <button onClick={createChat}>open chat</button><br/>
            <button onClick={leave}>Leave</button><br/>
            <div>
                <h1>Sent Messages:</h1>
                <ul>
                    {userMessage.map((msg, index) => (
                        <li key={index}>
                            <strong>From: {msg.from}</strong>
                            <p>Recieved at: {msg.last_update}</p>
                            <p>{msg.message}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h1>Received Messages:</h1>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <strong>From: {msg.from}</strong>
                            <p>Recieved at: {msg.last_update}</p>
                            <p>{msg.message}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Exp