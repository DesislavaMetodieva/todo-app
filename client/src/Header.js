import React from "react";
import './Header.css';

const Header = () => {
    return (
        <div className="heading">
            <h1>React todo <span className="italic secondary-color">app...</span></h1>
            <h2 className="italic secondary-color">Add your next task below</h2>
        
        </div>
    )
}

export default Header;