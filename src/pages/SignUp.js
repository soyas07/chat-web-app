import React, { useContext, useState } from 'react'
import { Container, Wrapper } from '../components/Containers/Containers'
import { Alert, Button, Fade, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GlobalContext from '../context/GlobalContext';

const SignUp = () => {
    const { url } = useContext(GlobalContext);
    
    // local state to handle error and form input
    const [status, setStatus] = useState({
        success: false,
        error: ''
    });
    const [errorStatus, setErrorStatus] = useState({
        username: false,
        email: false,
        password: false
    });
    const [errorText, setErrorText] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: '',
    });

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

    const handleClick = async() => {
        // validate the form
        if (!input.username) {
            setErrorStatus(prevStat => ({
                ...prevStat,
                username: true
            }));
            setErrorText(prevStat => ({
                ...prevStat,
                username: "Enter your username"
            }));
            return;
        } else if (!input.email) {
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

        try {
            const response = await axios.post(`${url.auth}/api/v1/user/register`, 
                    {
                        username: input.username,
                        email: input.email,
                        password: input.password,
                        roles: "admin",
                    }, { withCredentials: true }
                );

            const data = await response.data;
            if (response.status == 200) {
                if (data.message.status == 409) {
                    setStatus(prevState => ({
                        ...prevState,
                        error: 'Email already exists!'
                    }));
                } else if (data.message == 'ok') {
                    setStatus({ error: false, success: true });
                }
            }
        } catch (error) {
            console.log(error);
            setStatus(prevState => ({
                ...prevState,
                error: 'Something went wrong!'
            }))
        }
    }

    return (
        <Container>
            <Wrapper>
                <Typography
                    variant='h3' 
                    textAlign='center'
                    marginBottom={6}
                >Sign Up</Typography>
                <TextField
                    required
                    id="outlined-basic"
                    placeholder="Username"
                    variant="outlined"
                    fullWidth
                    error={errorStatus.username}
                    helperText={errorText.username}
                    InputProps={{
                        style:{ borderRadius: "25px", padding: ".3rem 1rem", maxHeight: "50px" }
                    }}
                    sx={{mb: 2}}
                    onChange={handleChange}
                    name='username'
                    type='text'
                />
                <TextField
                    required
                    id="outlined-basic"
                    placeholder="Email"
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
                    placeholder="Create password"
                    variant="outlined"
                    fullWidth
                    error={errorStatus.password}
                    helperText={errorText.password}
                    InputProps={{
                        style:{ borderRadius: "25px", padding: ".3rem 1rem", maxHeight: "50px"}
                    }}
                    name="password"
                    type='password'
                    onChange={handleChange}
                />
                <div style={{marginBottom: "1.5rem"}}></div>
                <Button 
                    variant='contained'
                    sx={{ mb: 2 }}  
                    fullWidth 
                    onClick={handleClick}
                    style={{ minHeight:'40px', borderRadius: '25px', fontSize: '1rem' }}
                >
                    Sign Up
                </Button>
                <div style={{textAlign:'center', marginBottom:'1.5rem'}}>
                    <Typography variant='caption' style={{fontWeight: '600'}}>Already have an account? <span style={{fontSize:'.85rem'}}><Link style={{color:'black'}} to='/login'>Login</Link></span></Typography>
                </div>
                <Fade in={status.success} style={{display:`${status.success ? 'block' : 'none'}`}}>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="success">User created!</Alert>
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

export default SignUp