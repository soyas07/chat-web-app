import styled from '@emotion/styled'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #8782ED, #9E9AE6, #B6B2E0);
`;

export const Wrapper = styled.div`
    max-width: 400px;
    padding: 2rem;
    background-color: #fff;
    border-radius: 25px; /* Add border-radius for smooth curve */
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px; /* Add box shadow */
`;
