import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import FriendList from '../components/FriendList/FriendList';
import './te.css';
import { GlassContainer } from '../components/Containers/Containers';
import sample from '../assets/profile-pic.png';

const Home = () => {
    const { authorize } = useAuth();
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
            checkAuth();
        }, 2000);
    }, []);

    return (
        <div>{!isLoading.auth ? 
            <>
                <div className='test-container'>
                    <GlassContainer width="300px" height="500px">
                        <FriendList icon={sample} username='John Doe' message='Hey buddy! what r u doing tonight...' notification='4' time='9:57 AM'/><br/>    
                        <FriendList username='John Doe' message='Hey buddy! what r u doing tonight...'  time='9:57 AM'/><br/>    
                        <FriendList username='John Doe' message='Hey buddy! what r u doing tonight...' notification='2' time='9:57 AM'/><br/>    
                    </GlassContainer>    
                </div>
            </>
        : 
            <div>Redirecting...</div>}</div>
    )
}

export default Home