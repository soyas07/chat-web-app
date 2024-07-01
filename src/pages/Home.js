import React, { useContext, useEffect, useState } from 'react'
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

const Home = () => {
    const { authorize } = useAuth();
    const { friendLists, searchValue } = useContext(GlobalContext);
    const logoLoader = useLoader();

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState({
        auth: true
    });

    // react router to redirect
    const navigate = useNavigate();

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
            } catch (error) {
                setError(true);
                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        }
        
        // Set timer 2 seconds so that it might take time for refres token to renew token
        setTimeout(() => {
            // checkAuth();
        }, 2000);
    }, []);

    // if (!isLoading.auth && !logoLoader)
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
                                .map((list) => (
                                    <>
                                        <FriendList
                                            icon={list.icon}
                                            username={list.username}
                                            message={list.message}
                                            notification={list.notification}
                                            time={list.time}
                                        /><br/>
                                    </>
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
                                        {/* <MessageBox message={'hey! how r u?'} /> */}
                                        {/* <MessageBox message={'hey! how r u?'} /> */}
                                        {/* <MessageBox message={'hey! how r u?'} /> */}
                                        {/* <MessageBox message={'hey! how r u?'} /> */}
                                        {/* <MessageBox message={'hey! how r u?'} /> */}
                                        {/* <MessageBox message={'hey! how r u?'} /> */}
                                        {/* <MessageBox message={'hey! how r u?'} /> */}
                                        {/* <MessageBox message={'hey! how r u?'} /> */}
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
                                    </div>
                                </div>
                                <div className='chat-header'>
                                    <Divider marginTop="1rem" />
                                    <textarea name="message-textbox" className='message-textbox' />
                                    <div className='send-btn'>
                                        <img width="100%" height="100%" src={plane} className='plane-btn' />
                                    </div>
                                </div>
                            </GlassContainer>  
                            <GlassContainer>
                                Profile 
                            </GlassContainer>
                        </ColumnLayout>
                    </div>
                </div>
            </>
        )
    // else {
    //     return <Loader />
    // }
}

export default Home