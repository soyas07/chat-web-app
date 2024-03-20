import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Button, Checkbox, TextField, Typography } from '@mui/material';
import axios from 'axios';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;

const Wrapper = styled.div`
    width: 400px;
    border: 1px solid black;
    padding: 2rem;

    .text {
        margin-bottom: 1.5rem;
    }
`;

const FlexContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleClick = async(e) => {
        try {
            const response = await axios.post(`https://api.soyaslimbu.com/api/v1/user/login`, 
                {
                    email: input.email,
                    password: input.password,
                }, { withCredentials: true }
            );
            
            const data = await response.data;
            if (response.status == 200) {
                // display the login successfully message
                // redirect to dashboard
                console.log(data);
            }
        } catch (error) {
            
        }   
    }

    const renewLogin = async(e) => {
        const response = await axios(`http://localhost:5001/api/v1/renewToken`, { withCredentials: true });
        
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
                    variant='h4' 
                    textAlign='center'
                    marginBottom='1.5rem'
                >Login</Typography>
                <TextField
                    required
                    id="outlined-basic"
                    placeholder="Email or Username"
                    variant="outlined"
                    fullWidth
                    className='text'
                    onChange={handleChange}
                    name='email'
                />
                <TextField
                    required
                    id="outlined-basic"
                    placeholder="Password"
                    variant="outlined"
                    fullWidth
                    name="password"
                    type='password'
                    onChange={handleChange}
                />
                <FlexContainer>
                    <Checkbox />
                    <Typography variant='body1' textAlign='center'>Remember me</Typography>
                </FlexContainer>
                <Typography variant='body1' textAlign='center'>Forgot Password?</Typography>
                <FlexContainer>
                    <Button variant='contained' fullWidth onClick={handleClick}>
                        Login
                    </Button>
                    <Button variant='contained' fullWidth onClick={renewLogin}>
                        Re-Login
                    </Button>
                </FlexContainer>
            </Wrapper>
        </Container>
    )
}

export default Login