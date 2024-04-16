import React from 'react'
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Test = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    const [receiver, setReceiver] = useState('');
    const [name, setName] = useState('');
    const [textMessage, setTextMessage] = useState('');

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
                console.log(socket.id);

                socket.on('privateMessage', ({ from, to, message }) => {
                    console.log(message)
                    setMessages((prevMessages) => [...prevMessages, { from, to, message }]);
                });
            });
        }
    }, [socket]);


    const startChat = () => {
        const data = {
            from: socket.id,
            to: receiver,
            message: textMessage
        };
        socket.emit("send", data);
    }

    function leave () {
        socket.disconnect();
    }

    const createChat = () => {
        socket.emit('createChat', { topic: name, from: socket.id, to: receiver, consumerGroup: name });
    }

    return (
        <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name' />
            <br/>
            <button onClick={leave}>Leave</button>
            <input 
                type="text" 
                value={receiver} 
                onChange={(e) => setReceiver(e.target.value)} 
                placeholder="Recipient's Socket ID" 
            /><br/><br/>
            <input type="text" value={textMessage} onChange={e => setTextMessage(e.target.value)} placeholder='enter your message' />
            <br/><br/>
            <button onClick={startChat}>send message</button>
            <button onClick={createChat}>open chat</button>
            <div>
                <h1>Received Messages:</h1>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <strong>From: {msg.from}</strong>
                            <p>{msg.message}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Test