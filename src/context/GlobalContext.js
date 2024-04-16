import React, { createContext } from 'react'

const GlobalContext = createContext();

export const GlobalProvider= ({ children }) => {
    // setting up environmental variables
    let url = {};

    if (process.env.NODE_ENV == 'production') {
        url = {
            auth: 'https://' + process.env.REACT_APP_PROD_API_GATEWAY
        }
    } else {
        url = {
            auth: 'http://' + process.env.REACT_APP_DEV_API_GATEWAY
        }
    }

    return (
        <GlobalContext.Provider 
            value={{ 
                url,
            }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContext