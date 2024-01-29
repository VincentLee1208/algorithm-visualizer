import React from "react";

import "../styles/Header.css";

const Header = ({onPathfinderClick, onSortingClick}) => {
    const handlePathfinderChange = () => {
        onPathfinderClick();
    };

    const handleSortingChange = () => {
        onSortingClick();
    };

    return (
        <div className='header'>
            <button className='app-select-button' onClick={handlePathfinderChange}>Pathfinder</button>
            <button className='app-select-button' onClick={handleSortingChange}>Sorting</button>
        </div>
    );
};

export default Header;