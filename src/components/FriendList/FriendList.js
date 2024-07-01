import styled from '@emotion/styled'
import React from 'react'
import defaultProfileIcon from '../../assets/default_profile.png'
import { Typography } from '@mui/material';
import './test.css';
import { ListContainer, ProfileIcon } from '../Containers/Containers';

const FriendList = ({ username, icon, message, notification, time }) => {
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
        <ListContainer>
            <ProfileIcon height="35px" width="35px"><img width="100%" height="100%" src={icon ? icon : defaultProfileIcon} /></ProfileIcon>
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
        </ListContainer>
    )
}

export default FriendList