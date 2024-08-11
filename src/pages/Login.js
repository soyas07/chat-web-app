import React, { useContext, useState, useEffect } from 'react'
import { Alert, Button, CircularProgress, Fade, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import GlobalContext from '../context/GlobalContext';
import { Link, useNavigate } from 'react-router-dom';

import { Container, GlassContainer, Wrapper } from '../components/Containers/Containers';
import useAuth from '../hooks/useAuth'; 
import Loader from '../components/Loader/Loader';
import logo from '../assets/icon-logo.png';
import logger from '../utils/logger';

const Login = () => {
    const { url } = useContext(GlobalContext);
    const { authorize } = useAuth();
    // local state to handle error and form input
    const [status, setStatus] = useState({
        success: false,
        error: false
    });
    const [errorStatus, setErrorStatus] = useState({
        email: false,
        password: false
    });
    const [errorText, setErrorText] = useState({
        email: '',
        password: '',
    });
    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState({
        submit: false,
        auth: true
    });

    // react router to redirect
    const navigate = useNavigate();

    // use effects hooks
    useEffect(() => {
        logger.info('Checking Authentication...');
        const checkAuth = async() => {
            try {
                setIsLoading(prevStat => ({
                    ...prevStat,
                    auth: true
                }));
                await authorize();
                // redirect to dashboard
                logger.info('Redirecting to Dashboard');
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } catch (error) {
                setIsLoading(prevStat => ({
                    ...prevStat,
                    auth: false
                }));
                logger.error(error);
            }
        }

        checkAuth();
    }, [])
    

    // event handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));
        // reset the error
        setErrorStatus(prevStat => ({
            ...prevStat,
            [name]: false,
        }));
        setErrorText(prevStat => ({
            ...prevStat,
            [name]: '',
        }));
        setStatus({
            success: '',
            error: ''
        });
    }

    const handleClick = async(e) => {
        try {
            // validate the form
            if (!input.email) {
                setErrorStatus(prevStat => ({
                    ...prevStat,
                    email: true
                }));
                setErrorText(prevStat => ({
                    ...prevStat,
                    email: "Enter your email"
                }));
                return;
            } else if (!input.password) {
                setErrorStatus(prevStat => ({
                    ...prevStat,
                    password: true
                }));
                setErrorText(prevStat => ({
                    ...prevStat,
                    password: "Enter your password"
                }));
                return;
            }

            // set the loading 
            setIsLoading(prevStat => ({
                ...prevStat,
                submit: true
            }));
            const response = await axios.post(`${url.auth}/api/v1/user/login`, 
                {
                    email: input.email,
                    password: input.password,
                }, { withCredentials: true }
            );
            
            const data = await response.data;

            if (response.status == 200) {
                // display the login successfully message
                if (data) {
                    setStatus(prevStat => ({
                        ...prevStat,
                        success: true
                    }));
                    console.log(data);
                    // store the user details
                    localStorage.setItem("user", JSON.stringify(data)); // store in local storage

                    // redirect to dashboard
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                } else if (data.message.status == 403) {
                    setStatus({ success: false, error: 'Incorrect username or password.' });
                } else {
                    setStatus({
                        success: false,
                        error: 'Something went wrong!'
                    })
                }
            }
        } catch (error) {
            console.log(error)
            setStatus({
                success: false,
                error: 'Something went wrong!'
            })
        } finally {
            setIsLoading(prevStat => ({
                ...prevStat,
                submit: false
            }));
        }
    }

    const renewLogin = async(e) => {
        // const response = await axios(`https://api.soyaslimbu.com/api/v1/user/renewToken`, { withCredentials: true });
        const response = await axios(`${url.auth}/api/v1/user/renewToken`, { withCredentials: true });
        
        const data = await response.data;
        if (response.status == 200) {
            // store the token in session storage
        } else if (response.status == 400) {
            // relogin message
            
        }
    }


    if (!isLoading.auth) {
        return (
            <div className='main-container flex-center'>
                <Container>
                    <GlassContainer>
                    <Wrapper>
                        <div style={{display:'flex',justifyContent:'center',alignContent:'center'}}><div style={{width:'120px',height:'105px'}}><img src={logo} name="logo" width="100%" height="100%" /></div></div>
                        <Typography
                            variant='h3' 
                            textAlign='center'
                            marginBottom={6}
                            color='white'
                        >Login</Typography>
                        <TextField
                            required
                            id="outlined-basic"
                            placeholder="Email or Username"
                            variant="outlined"
                            fullWidth
                            error={errorStatus.email}
                            helperText={errorText.email}
                            InputProps={{
                                style:{ 
                                    borderRadius: "25px", 
                                    padding: ".3rem 1rem", 
                                    maxHeight: "50px", 
                                    color:'white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                                },
                            }}
                            sx={{mb: 2}}
                            onChange={handleChange}
                            name='email'
                            type='email'
                        />
                        <TextField
                            required
                            placeholder="Password"
                            variant="outlined"
                            fullWidth
                            error={errorStatus.password}
                            helperText={errorText.password}
                            InputProps={{
                                style:{ 
                                    borderRadius: "25px", 
                                    padding: ".3rem 1rem", 
                                    maxHeight: "50px", 
                                    color:'white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)'
                                },
                                id: 'custom-input'
                            }}
                            name="password"
                            type='password'
                            onChange={handleChange}
                        />
                        <div style={{textAlign:'right', marginBottom:'1.5rem'}}>
                            <Typography variant='caption' style={{fontWeight: '600', color:'white'}}>Forgot Password?</Typography>
                        </div>
                        
                        <Button 
                            variant='contained'
                            sx={{ mb: 2 }}  
                            fullWidth 
                            onClick={handleClick}
                            style={{ minHeight:'40px', borderRadius: '25px', fontSize: '1rem' }}
                        >
                            {!isLoading.submit ? 'Login' : <CircularProgress size={30} style={{color:'white'}}/>}
                        </Button>
                        <div style={{textAlign:'center', marginBottom:'1.5rem'}}>
                            <Typography variant='caption' style={{fontWeight: '600', color:'white'}}>Don't have an account? <span style={{fontSize:'.85rem'}}><Link style={{color:'white'}} to='/signup'>Sign Up</Link></span></Typography>
                        </div>
                        {/* <Button variant='contained' fullWidth onClick={renewLogin}>
                            Re-Login
                        </Button> */}
                        <Fade in={status.success} style={{display:`${status.success ? 'block' : 'none'}`}}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="success">Login Success.</Alert>
                            </Stack>
                        </Fade>
                        <Fade in={status.error} style={{display:`${status.error ? 'block' : 'none'}`}}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error">{status.error}</Alert>
                            </Stack>
                        </Fade>
                    </Wrapper>
                    </GlassContainer>
                </Container>
            </div>
        )
    } else {
        return <Loader />
    }
}

export default Login