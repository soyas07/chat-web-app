import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

const useHandler = () => {
    const { setSearchValue } = useContext(GlobalContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == 'search-box')
            setSearchValue(value);
    }
    
    return { handleChange }
}

export default useHandler