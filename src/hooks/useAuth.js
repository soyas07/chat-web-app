import { useContext } from 'react'
import GlobalContext from '../context/GlobalContext';
import axios from 'axios';

const useAuth = () => {
    const { url } = useContext(GlobalContext);

    const authorize = async() => {
        try {
            const response = await axios(`${url.auth}/api/v1/auth`, { withCredentials: true });
            const data = await response.data;
            if (response.status == 200) {
                if (data.message == 'ok') {

                } else {
                    throw new Error('Something went wrong');
                }
            }
        } catch (error) {
            throw new Error('Something went wrong');
        }
    }
    
    return { authorize }
}

export default useAuth