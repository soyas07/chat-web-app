import React from 'react'

const useTime = () => {
    const getCurrentTime = () => {
        const date = new Date();
        
        // Extract year, month, day, hours, minutes
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        // Determine AM/PM suffix
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        // Convert hours from 24-hour time to 12-hour time
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
        const strHours = String(hours).padStart(2, '0');
      
        // Format the date string
        return `${year}-${month}-${day} ${strHours}:${minutes} ${ampm}`;
    }

    return { getCurrentTime }
}

export default useTime