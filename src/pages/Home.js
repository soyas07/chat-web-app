import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import GlobalContext from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { url } = useContext(GlobalContext);
    const [error, setError] = useState(false);

    // react router to redirect
    const navigate = useNavigate();

    useEffect(() => {
        const authorize = async() => {
            try {
                const response = await axios(`${url.auth}/api/v1/auth`, { withCredentials: true });
                const data = await response.data;
                if (response.status == 200) {
                    if (data.message == 'ok') {

                    } else {
                        setError('Something went wrong');
                        setTimeout(() => {
                            navigate("/login");
                        }, 2000);
                    }
                }
            } catch (error) {
                setError('Something went wrong');
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        }

        authorize();
    }, [])
    

    return (
        <div>{!error ? <div>Dashboard</div> : error}</div>
    )
}

export default Home