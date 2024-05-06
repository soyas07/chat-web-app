import styled from '@emotion/styled'
import React from 'react'
import defaultProfileIcon from '../../assets/default_profile.png'
import { Typography } from '@mui/material';
import './test.css';

const FriendList = ({ username, icon, message, notification, time }) => {
    const Container = styled.div`
        /* filter: blur(30px); */
        /* box-shadow: inset 0 0 300px 0px white; */
        backdrop-filter: saturate(180%) blur(17.5px);
        max-width: 270px;
        border: 2px solid rgba(0, 0, 0, 0);
        
        background-color: rgba(255, 255, 255, 0.05);
        padding: 0.5rem 1rem;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
        border-radius: 12px;
        mix-blend-mode: lighten;
        display: flex;
        justify-content: space-between;
        transition: border 0.3s ease;
        &:hover {
            cursor: pointer;
            border: 2px solid rgba(255, 255, 255, 0.3);
        }
    `;

    const ProfileIcon = styled.div`
        border-radius: 100%;
        height: 35px;
        width: 35px;
    `;

    const NotificationBadge = styled.span`
        width: 20px;
        height: 22px;
        background-color: #0288d1;
        display: flex;
        justify-content: center;
        border-radius: 7px;
        align-items: center;
        position: absolute;
        bottom: 1rem;
        right: 1rem;
    `;

    return (
        <Container>
            <ProfileIcon><img width="100%" height="100%" src={icon ? icon : defaultProfileIcon} /></ProfileIcon>
            <div>
                <Typography variant='caption' style={{fontWeight: '600',fontSize:'14px',color:'white'}}>{username}</Typography>
                <p style={{maxWidth:'130px',lineHeight:'1rem'}}>
                    {
                        <Typography 
                            variant='caption' 
                            style={{fontWeight: notification ? '600' : '400',color: notification ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)'}}
                        >
                            {message}
                        </Typography>
                    }
                </p>
            </div>
            <div>
                <Typography variant='caption' style={{fontWeight: '600',color:'white'}}>{time}</Typography>
            </div>
            {notification && <NotificationBadge>
                <Typography variant='caption' style={{color:"white"}}>{parseInt(notification) >=4 ? '4' : notification}</Typography>
            </NotificationBadge>}
        </Container>
    )
}

export default FriendList