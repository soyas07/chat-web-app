import React, { useContext, useState } from 'react'
import { Alert, Button, Fade, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import GlobalContext from '../context/GlobalContext';
import { Link, useNavigate } from 'react-router-dom';

import { Container, Wrapper } from '../components/Containers/Containers';

const Login = () => {
    const { url } = useContext(GlobalContext);
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

    // react router to redirect
    const navigate = useNavigate();

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
            const response = await axios.post(`${url.auth}/api/v1/user/login`, 
                {
                    email: input.email,
                    password: input.password,
                }, { withCredentials: true }
            );
            
            const data = await response.data;
            if (response.status == 200) {
                // display the login successfully message
                if (data.message == 'ok') {
                    setStatus(prevStat => ({
                        ...prevStat,
                        success: true
                    }));
                    console.log(data);

                    // redirect to dashboard
                    // setTimeout(() => {
                    //     navigate("/test");
                    // }, 2000);
                } else if (data.message.status == 401) {
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

    return (
        <Container>
            <Wrapper>
                <Typography
                    variant='h3' 
                    textAlign='center'
                    marginBottom={6}
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
                        style:{ borderRadius: "25px", padding: ".3rem 1rem", maxHeight: "50px" }
                    }}
                    sx={{mb: 2}}
                    onChange={handleChange}
                    name='email'
                    type='email'
                />
                <TextField
                    required
                    id="outlined-basic"
                    placeholder="Password"
                    variant="outlined"
                    fullWidth
                    error={errorStatus.password}
                    helperText={errorText.password}
                    InputProps={{
                        style:{ borderRadius: "25px", padding: ".3rem 1rem", maxHeight: "50px" }
                    }}
                    name="password"
                    type='password'
                    onChange={handleChange}
                />
                <div style={{textAlign:'right', marginBottom:'1.5rem'}}>
                    <Typography variant='caption' style={{fontWeight: '600'}}>Forgot Password?</Typography>
                </div>
                
                <Button 
                    variant='contained'
                    sx={{ mb: 2 }}  
                    fullWidth 
                    onClick={handleClick}
                    style={{ minHeight:'40px', borderRadius: '25px', fontSize: '1rem' }}
                >
                    Login
                </Button>
                <div style={{textAlign:'center', marginBottom:'1.5rem'}}>
                    <Typography variant='caption' style={{fontWeight: '600'}}>Don't have an account? <span style={{fontSize:'.85rem'}}><Link style={{color:'black'}} to='/signup'>Sign Up</Link></span></Typography>
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
        </Container>
    )
}

export default Login