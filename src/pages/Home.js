import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import FriendList from '../components/FriendList/FriendList';
import { GlassContainer, Divider, ProfileIcon, Container, ListContainer } from '../components/Containers/Containers';
import SearchBox from '../components/SearchBox/SearchBox';
import GlobalContext from '../context/GlobalContext';
import useLoader from '../hooks/useLoader';
import Loader from '../components/Loader/Loader';
import ColumnLayout from '../components/Layouts/ColumnLayout';
import MessageBox from '../components/MessageBox/MessageBox';
import defaultProfileIcon from '../assets/profile-pic.png'
import plane from '../assets/plane.svg';
import { Typography } from '@mui/material';
import Slider from '../components/Slider/Slider';
import Profile from '../components/Profile/Profile';
import IconBtn from '../components/IconBtn/IconBtn';
import { io } from 'socket.io-client';
import logger from '../utils/logger';
import useTime from '../hooks/useTime';
import axios from 'axios';

const Home = () => {
    const { authorize } = useAuth();
    const { friendLists, searchValue, url } = useContext(GlobalContext);
    const logoLoader = useLoader();

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState({
        auth: true
    });

    // handles the active friends chat list
    const [activeIndex, setActiveIndex] = useState(0); // Set default active item

    // web socket states handler
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [roomId, setRoomId] = useState('');

    // handles the user login details
    const [user, setUser] = useState({});
    // handles messages
    const [userMessage, setUserMessage] = useState([]);
    const [sender, setSender] = useState({
        name: 'john',
        socket_id: '',
        message: '',
        last_update: '',
    });
    const { getCurrentTime } = useTime();

    // react router to redirect
    const navigate = useNavigate();
    // Reference for scrolling
    const messagesEndRef = useRef(null);
    // Reference for text message clear
    const textareaRef = useRef(null);

    useEffect(() => {
        const checkAuth = async() => {
            try {
                setIsLoading(prevAuth => ({
                    ...prevAuth,
                    auth: true,
                }));
                await authorize();
                setIsLoading(prevAuth => ({
                    ...prevAuth,
                    auth: false,
                }));
                // connect to chat server
                const server = io(url.chatServer);
                setSocket(server);
            } catch (error) {
                setError(true);
                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        }
        
        // Set timer 2 seconds so that it might take time for refres token to renew token
        setTimeout(async () => {
            checkAuth();
            logger.info(`Getting user details from local storage: `);
            logger.info(localStorage.getItem("user"));
            // set the user from local storage
            setUser(localStorage.getItem("user"));
            // load the user details and friend details
            // get the room id 
            const room_id = "66b44fae654fe561a7c7e70a";
            // load the initial chat
            const message = await axios(`${url.chatServer}/api/v1/chats?room_id=${room_id}`);
            message.data.chats.messages.map((msg) => {
                console.log(msg)
                if (msg.sender == 'john')
                    setUserMessage((prevMsg) => [...prevMsg, { from: msg.sender, message: msg.message, last_update: getCurrentTime() }]);
            })
        }, 2000);
    }, []);

    // handles the web socket connection and listen to "incoming messages"
    useEffect(() => {
        if (socket) {
            socket.on("connect", () => {
                // setSender(prevData => ({ ...prevData, socket_id: socket.id }))
                // console.log(socket.id);

                // socket.on('private_message', ({ from, message }) => {
                //     console.log(sender.message)
                //     setMessages((prevMessages) => [...prevMessages, { from, message, last_update: getCurrentTime() }]);
                // });
            });
        }
    }, [socket]);

    // handles the scrolls messages
    useEffect(() => {
        // Scroll to the bottom whenever messages change
        scrollToBottom();
    }, [userMessage]);
    
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    const sendMessage = () => {
        // Clear the textarea value
        if (textareaRef.current) {
            textareaRef.current.value = '';
        }
        setUserMessage((prevMessage) => [...prevMessage, { from: sender.name, message: sender.message, last_update: getCurrentTime() }]);
        // socket.emit("send", sender, receiver, roomId);
    }


    const handleItemClick = (index) => {
        setActiveIndex(index);
        //TODO: change the chat conversation 
    };


    if (!isLoading.auth && !logoLoader)
        return (
            <>
                <div className='main-container'>
                    <div style={{width:'100%',margin:'0 auto',maxWidth:'1500px',padding:'2% 0'}}>
                        <ColumnLayout gap='30px' widths={['21%', '54%', '21%']}>
                            <GlassContainer maxWidth="300px">
                                <SearchBox marginBottom='1rem'/>
                                <Slider />
                                <Divider />
                                {friendLists.filter(friend => (
                                    friend.username.toLowerCase().includes(searchValue.toLowerCase()))
                                )
                                .map((list,index) => (
                                    <React.Fragment key={index}>
                                        <FriendList
                                            icon={list.icon}
                                            username={list.username}
                                            message={list.message}
                                            notification={list.notification}
                                            time={list.time}
                                            active={index===activeIndex}
                                            onClick={() => handleItemClick(index)}
                                        /><br/>
                                    </React.Fragment>
                                ))}
                            </GlassContainer>  
                            <GlassContainer maxHeight="800px" minHeight="700px">
                                <div className='chat-header'>
                                    <div className='chat-header-content'>
                                        <div class="profile-container">
                                            <ProfileIcon height="35px" width="35px"><img width="100%" height="100%" src={defaultProfileIcon} /></ProfileIcon>
                                            <div className='online-status'></div>
                                        </div>
                                        <div style={{display:'flex',flexDirection:'column',marginLeft:'1rem'}}>
                                            <Typography variant='caption' style={{fontWeight: '500',fontSize:'1rem',color:'white'}}>John Doe</Typography>
                                            <Typography 
                                                variant='caption' 
                                                style={{fontWeight: '400',color: 'rgba(255, 255, 255, 0.6)'}}
                                            >
                                                Online
                                            </Typography>
                                        </div>
                                    </div>
                                    <Divider />
                                </div>
                                <div className='chat-container'>
                                    <div className='message-wrapper'>
                                        <MessageBox message={'hey! how r u?'} />
                                        <MessageBox type="friend" message={'hey! how r u?'} />
                                        <MessageBox message={'hey! how r u?'} />
                                        {/* <MessageBox message={'hey! how r u?'} /> */}
                                        <MessageBox message={'hey! how r u?a adfasf'} />
                                        <MessageBox type="friend" message={'hey! how r u? asdf'} />
                                        <MessageBox message={'hey! how r u?'} />
                                        <MessageBox message={'hey! how r u?'} />
                                        <MessageBox type="friend" message={'hey! how r u? asdf'} />
                                        <MessageBox message={'hey! how r u?'} />
                                        <MessageBox message={'hey! how r u?'} />
                                        <MessageBox message={'hey! how r u?'} />
                                        <MessageBox message={'hey! how r u?'} />
                                        <MessageBox message={'hey! how r u?'} />
                                        <MessageBox message={'hey! how r u?'} />
                                        <MessageBox message={'hey! how r u?'} />
                                        <MessageBox message={'hey! how r u?'} />
                                        <MessageBox message={'hey! how r u?'} />
                                        <MessageBox message={'hey! how r u?'} />
                                        <MessageBox message={'hey! how r u?'} />
                                        <MessageBox message={'hey! how r u?'} />
                                        <MessageBox message={'hey! how r u?'} />
                                        {userMessage.map((msg,index) => <MessageBox message={msg.message} key={index} />)}
                                        <div ref={messagesEndRef} />
                                    </div>
                                </div>
                                <div className='chat-header'>
                                    <Divider marginTop="1rem" />
                                    <textarea 
                                        name="message-textbox" 
                                        className='message-textbox' 
                                        onChange={e => setSender(prevData => ({...prevData, message: e.target.value }))} 
                                        ref={textareaRef}
                                    />
                                    <IconBtn icon={plane} position="absolute" onClick={sendMessage} />
                                </div>
                            </GlassContainer>  
                            <GlassContainer>
                                <Profile 
                                    icon={defaultProfileIcon} 
                                    username='John Doe' 
                                    lastSeen='5 min ago' 
                                    email="johndoe@gmail.com" 
                                    phone="+1 323 234 1325" 
                                /> 
                            </GlassContainer>
                        </ColumnLayout>
                    </div>
                </div>
            </>
        )
    else {
        return <Loader />
    }
}

export default Home