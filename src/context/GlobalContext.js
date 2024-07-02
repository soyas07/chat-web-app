import React, { createContext, useState } from 'react'
import sample from '../assets/profile-pic.png';

const GlobalContext = createContext();

export const GlobalProvider= ({ children }) => {
    // setting up environmental variables
    let url = {};

    console.log(process.env.NODE_ENV)
    console.log("REACT_APP_ENV: " + process.env.REACT_APP_ENV)
    if (process.env.NODE_ENV == 'production' || process.env.REACT_APP_ENV == 'production') {
        url = {
            auth: 'https://' + process.env.REACT_APP_PROD_API_GATEWAY
        }
    } else {
        url = {
            auth: 'http://' + process.env.REACT_APP_DEV_API_GATEWAY
        }
    }
    console.log(url)

    const [searchValue, setSearchValue] = useState('');
    const [friendLists, setFriendLists] = useState([
        {
            icon: sample,
            username: 'John Doe',
            message: 'Hey buddy! what r u doing tonight...',
            notification: '4',
            time: '9:57 AM'
        },
        {
            username: 'Alan Smith',
            message: 'Hey buddy! what r u doing tonight...',
            time: '9:57 AM'
        },
        {
            username: 'John Wick',
            message: 'Hey buddy! what r u doing tonight...',
            notification: '2',
            time: '9:57 AM'
        }
    ]);

    return (
        <GlobalContext.Provider 
            value={{ 
                url,
                searchValue, 
                setSearchValue,
                friendLists,
                setFriendLists,
            }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContext