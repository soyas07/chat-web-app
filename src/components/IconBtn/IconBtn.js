import React from 'react'
import styled from 'styled-components'

const IconBtnWrapper = styled.div`
    border-radius: 9px;
    background-color: ${prop => (!prop.bg) ? '#0288d1' : prop.bg};
    padding: 6px;
    width: 16px;
    height: 16px;
    position: ${prop => (!prop.position) ? 'static' : prop.position};
    right: 10px; /* Adjust as necessary */
    display: flex;
    justify-content: center;
    align-items: center;
    top: 62%;
    transform: ${prop => (!prop.transform) ? 'translateY(-50%) translateX(-30%)' : prop.transform};
    cursor: pointer;
    transition: border 0.3s ease;
    border: 1px solid rgba(0,0,0,0);

    &:hover {
        border: 1px solid rgba(255, 255, 255, 0.3);
    }
`;

const IconBtn = ({ icon, position, bg, transform, onClick }) => {
    return (
        <IconBtnWrapper position={position} bg={bg} transform={transform} onClick={onClick}>
            <img width="100%" height="100%" src={icon} className='plane-btn' alt="icon" />
        </IconBtnWrapper>
    )
}

export default IconBtn;
