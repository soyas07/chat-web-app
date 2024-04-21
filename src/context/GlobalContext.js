import React, { createContext } from 'react'

const GlobalContext = createContext();

export const GlobalProvider= ({ children }) => {
    // setting up environmental variables
    let url = {};

    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV == 'production') {
        url = {
            auth: 'https://' + process.env.REACT_APP_PROD_API_GATEWAY
        }
    } else {
        url = {
            auth: 'http://' + process.env.REACT_APP_DEV_API_GATEWAY
        }
    }
    console.log(url)

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