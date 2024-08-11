import React from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
    display: grid;
    grid-template-columns: ${props => props.widths.map(width => width).join(' ')};
    gap: ${props => props.gap || '0px'};

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

const ColumnLayout = ({ widths = [], gap = '0px', children }) => {
    return (
        <LayoutContainer widths={widths} gap={gap}>
            {React.Children.map(children, (child, index) =>
                React.cloneElement(child, { key: index })
            )}
        </LayoutContainer>
    );
};

export default ColumnLayout;
