import React from 'react'
import logo from '../../assets/logo.png';
import styled from '@emotion/styled'

const Loader = () => {
    const LogoContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    `;

    const Logo = styled.div`
        max-width: 400px;
        max-height: 700px;
    `;

    return (
        <LogoContainer>
            <Logo>
                <img src={logo} width="100%" height="100%" name="logo" />
            </Logo>
        </LogoContainer>
    )
}

export default Loader