import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

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
        <div>{!isLoading.auth ? <div>Dashboard</div> : <div>Redirecting...</div>}</div>
    )
}

export default Home