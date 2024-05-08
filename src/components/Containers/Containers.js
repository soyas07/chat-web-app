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

export const GlassContainer = styled.div`
    /* background-color: rgba(255, 255, 255, 0.05); */
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    backdrop-filter: saturate(180%) blur(17.5px);
    padding:  1rem;
    border-radius: 16px;
    width: ${prop => prop.width};
    height: ${prop => prop.height};
    border: 1px solid rgba(255, 255, 255, 0.3);
    background-color: rgba(0, 0, 0, 0.2);
`;

export const Divider = styled.div`
    height: 1px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    margin-bottom: 1rem;
`;