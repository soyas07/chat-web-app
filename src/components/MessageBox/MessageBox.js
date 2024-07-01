import React from 'react'
import styled from 'styled-components'
import { ProfileIcon } from '../Containers/Containers';
import defaultProfileIcon from '../../assets/profile-pic.png'

const SelfMessageBox = styled.div`
    background-color: rgb(125 143 165 / 62%);
    color: #fff;
    border-radius: 20px 20px 0 20px;
    padding: 5px 15px;
    font-family: 'Roboto';
    font-size: 1rem;
    display: inline-block;
    max-width: 300px;
    line-height: 1;
    word-wrap: break-word;
    margin-left: auto;
    margin-right: 1rem;
`;

const FriendMessageBox = styled.div`
    background-color: rgb(120 108 91 / 51%);
    color: #fff;
    border-radius: 20px 20px 20px 0;
    padding: 5px 15px;
    font-family: 'Roboto';
    font-size: 1rem;
    display: inline-block;
    max-width: 300px;
    line-height: 1.5;
    word-wrap: break-word;
    margin-right: auto;
    margin-left: 5px;
`;

const Box = styled.div`
    display: flex;
    align-items: center;
`;

const MessageBox = ({ message, type='self' }) => {
    if (type == 'self') 
        return <SelfMessageBox>{message}</SelfMessageBox>
    else
        return (
            <Box>
                <ProfileIcon width="27px" height="27px"><img width="100%" height="100%" src={defaultProfileIcon} /></ProfileIcon>
                <FriendMessageBox>
                    {message}
                </FriendMessageBox>
            </Box>
        )
}

export default MessageBox