import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import FriendList from '../components/FriendList/FriendList';
import './te.css';
import { GlassContainer, Divider } from '../components/Containers/Containers';
import SearchBox from '../components/SearchBox/SearchBox';
import GlobalContext from '../context/GlobalContext';
import useHandler from '../hooks/useHandler';

const Home = () => {
    const { authorize } = useAuth();
    const { friendLists, searchValue } = useContext(GlobalContext);

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
        // setTimeout(() => {
        //     checkAuth();
        // }, 2000);
    }, []);

    return (
        // <div>{!isLoading.auth ? 
        //     <>
        //         <div className='test-container'>
        //             <GlassContainer width="300px" height="500px">
        //                 <SearchBox />
        //                 <FriendList icon={sample} username='John Doe' message='Hey buddy! what r u doing tonight...' notification='4' time='9:57 AM'/><br/>    
        //                 <FriendList username='John Doe' message='Hey buddy! what r u doing tonight...'  time='9:57 AM'/><br/>    
        //                 <FriendList username='John Doe' message='Hey buddy! what r u doing tonight...' notification='2' time='9:57 AM'/><br/>    
        //             </GlassContainer>    
        //         </div>
        //     </>
        // : 
        //     <div>Redirecting...</div>}</div>
        <>
            <div className='test-container'>
                <GlassContainer width="300px" height="500px">
                    <SearchBox marginBottom='1rem'/>
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
                    {/* <FriendList icon={sample} username='John Doe' message='Hey buddy! what r u doing tonight...' notification='4' time='9:57 AM'/><br/>    
                    <FriendList username='Alan Smith' message='Hey buddy! what r u doing tonight...'  time='9:57 AM'/><br/>    
                    <FriendList username='John Wick' message='Hey buddy! what r u doing tonight...' notification='2' time='9:57 AM'/><br/>     */}
                </GlassContainer>    
            </div>
        </>
    )
}

export default Home