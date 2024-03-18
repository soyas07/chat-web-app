import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';

function App() {
    const [socket, setSocket] = useState(null);
    const [recipientSocketId, setRecipientSocketId] = useState('');
    const [messages, setMessages] = useState([]);

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
            });

            socket.on('privateMessage', ({ senderSocketId, message }) => {
                setMessages((prevMessages) => [...prevMessages, { senderSocketId, message }]);
            });
        }
    }, [socket]);

    const startConversation = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3MTAyMTQ5MzcsImV4cCI6MTcxMDIxNTgzN30.yn23kJI7_aaxJ329ksDYBlPkJJKWp8XWqV2eQ7IFquo");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
            // body: JSON.stringify({
            //     topic: 'one-to-one-chat',
            //     consumerGroup: 'one-to-one-chat'
            // })
        };

        fetch("http://localhost:8080/api/v1/chat", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    const startChat = () => {
        const data = {
            recipientSocketId,
            topic: "this is topic",
            message: "this is message"
        };
        socket.emit("sendMessage", data);
    }

    function leave () {
        socket.disconnect();
    }

    return (
        <div>
            <button onClick={startConversation}>open message</button>
            <button onClick={leave}>Leave</button>
            <input 
                type="text" 
                value={recipientSocketId} 
                onChange={(e) => setRecipientSocketId(e.target.value)} 
                placeholder="Recipient's Socket ID" 
            />
            <button onClick={startChat}>send message</button>
            <div>
            <h1>Received Messages:</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                        <strong>From: {msg.senderSocketId}</strong>
                        <p>{msg.message}</p>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
}

export default App;
