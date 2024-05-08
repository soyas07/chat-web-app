import styled from '@emotion/styled'
import React, { useContext } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './style.css';
import useHandler from '../../hooks/useHandler';
import GlobalContext from '../../context/GlobalContext';

const SearchBox = ({ marginBottom }) => {
    const { handleChange } = useHandler();
    const { searchValue } = useContext(GlobalContext);

    const Icon = styled.span`
        color: rgba(255, 255, 255, 0.8);
        position: absolute;
        margin-top: .6rem;
        margin-left: .7rem;
    `;

    return (
        <div className='box-container' style={{marginBottom}}>
            <Icon><SearchIcon /></Icon>
            <input className='search-input' type="text" placeholder='Search for...' name='search-box' onChange={handleChange} value={searchValue} />
        </div>
    )
}

export default SearchBox