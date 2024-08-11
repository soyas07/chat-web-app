import { Typography } from '@mui/material'
import React from 'react'
import { Divider, ProfileIcon } from '../Containers/Containers'
import styled from 'styled-components'
import emailIcon from '../../assets/email.svg'
import shareIcon from '../../assets/share.svg'
import IconBtn from '../IconBtn/IconBtn'
import phoneIcon from '../../assets/phone.svg'

const Wrapper = styled.div`
    padding: 1.1rem;
`;

const BtnWrapper = styled.div`
    padding: 0.2rem .5rem;
    border-radius: 5px;
    max-width: 90px;
    background-color: rgba(0, 0, 0, 0.3);
    border: 2px solid rgba(0, 0, 0, 0);
    outline: none;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.85rem;
    transition: border 0.3s ease;
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
        filter: invert(100%) brightness(1000%);
    }

    &:hover {
        border: 2px solid rgba(255, 255, 255, 0.3);
    }
`;


const Profile = ({ icon, username, email, phone, lastSeen }) => {
    return (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
            <div>
                <Wrapper>
                    <Typography variant='caption' style={{fontWeight: '500',fontSize:'1rem',color:'white'}}>Profile</Typography>
                </Wrapper>
                <Divider />
                <ProfileIcon height="125px" width="125px"><img width="100%" height="100%" src={icon} /></ProfileIcon>
                <div style={{display:'flex',flexDirection:'column',marginTop:'2rem',marginBottom:'1rem'}}>
                    <Typography variant='caption' style={{fontWeight: '500',fontSize:'1rem',color:'white'}}>{username}</Typography>
                    <Typography 
                        variant='caption' 
                        style={{fontWeight: '400',color: 'rgba(255, 255, 255, 0.8)'}}
                    >
                        {`Last seen: ${lastSeen}`}
                    </Typography>
                </div>
                <div style={{display:'flex',marginBottom:'1rem'}}>
                    <BtnWrapper>
                        <img src={emailIcon} width="20px" height="20px" />
                        <Typography 
                            variant='caption' 
                            style={{fontWeight: '500',color: '#fff',marginLeft:'.3rem'}}
                        >
                            Message
                        </Typography>
                    </BtnWrapper>
                    <BtnWrapper style={{marginLeft:'5px'}}>
                        <img src={shareIcon} width="15px" height="15px" />
                        <Typography 
                            variant='caption' 
                            style={{fontWeight: '500',color: '#fff',marginLeft:'.3rem'}}
                        >
                            Share contact
                        </Typography>
                    </BtnWrapper>
                </div>
                <Divider />
            </div>
            <div style={{display:'flex',flexDirection:'column',alignContent:'center',height:'100px',justifyContent:'space-around',marginLeft:'2rem'}}>
                <div style={{display:'flex',alignItems:'center',marginBottom:'1rem'}}>
                    <IconBtn icon={emailIcon} position='' bg='rgba(0, 0, 0, 0.3)' transform='unset' />
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginLeft:'0.5rem',marginTop:'0.3rem'}}>
                        <Typography 
                            variant='caption' 
                            style={{fontWeight: '400',color: 'rgba(255, 255, 255, 0.8)',display:'block',lineHeight:'0.4'}}
                        >
                            Email address
                        </Typography>
                        <Typography 
                            variant='caption' 
                            style={{fontWeight: '400',color: 'rgba(255, 255, 255, 0.8)'}}
                        >
                            {email}
                        </Typography>
                    </div>
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                    <IconBtn icon={phoneIcon} position='' bg='rgba(0, 0, 0, 0.3)' transform='unset' />
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginLeft:'0.5rem',marginTop:'0.3rem'}}>
                        <Typography 
                            variant='caption' 
                            style={{fontWeight: '400',color: 'rgba(255, 255, 255, 0.8)',display:'block',lineHeight:'0.4'}}
                        >
                            Phone
                        </Typography>
                        <Typography 
                            variant='caption' 
                            style={{fontWeight: '400',color: 'rgba(255, 255, 255, 0.8)'}}
                        >
                            {phone}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile