import React from 'react'
import './slider.css'

const Slider = () => {
    return (
        <div className='toggle-container'>
            <input type="checkbox" id="toggle" class="toggleCheckbox" />
            <label for="toggle" class='toggleContainer'>
                <div>Chat</div>   
                <div>Groups</div>
            </label>
        </div>
    )
}

export default Slider