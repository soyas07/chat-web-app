import styled from '@emotion/styled'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: linear-gradient(135deg, #8782ED, #9E9AE6, #B6B2E0); */
`;

export const Wrapper = styled.div`
    max-width: 390px;
    padding: 2rem;
    /* background-color: #fff; */
    border-radius: 25px; /* Add border-radius for smooth curve */
    /* box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;  */
`;

export const GlassContainer = styled.div`
    /* background-color: rgba(255, 255, 255, 0.05); */
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    backdrop-filter: saturate(180%) blur(17.5px);
    padding:  1rem;
    border-radius: 16px;
    height: ${prop => prop.height};
    max-width: ${prop => prop.maxWidth};
    max-height: ${prop => prop.maxHeight};
    min-height: ${prop => prop.minHeight};
    border: 1px solid rgba(255, 255, 255, 0.3);
    background-color: rgba(0, 0, 0, 0.2);
`;

export const ListContainer = styled.div`
    /* filter: blur(30px); */
    /* box-shadow: inset 0 0 300px 0px white; */
    backdrop-filter: saturate(180%) blur(17.5px);
    max-width: ${prop => (!prop.maxWidth) ? '270px' : prop.maxWidth };
    border: 2px solid rgba(0, 0, 0, 0);

    background-color: rgb(255 255 255 / 27%);
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

export const Divider = styled.div`
    height: 1px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    margin-bottom: 1rem;
    margin-top: ${prop => prop.marginTop};
`;

export const ProfileIcon = styled.div`
    border-radius: ${prop => !(prop.borderRadius) ? '100%' : prop.borderRadius};
    padding: ${prop => prop.padding};
    height: ${prop => prop.height};
    width: ${prop => prop.width};
    background-color: ${prop => prop.backgroundColor};

    &:hover {
        cursor: pointer;
    }
`;