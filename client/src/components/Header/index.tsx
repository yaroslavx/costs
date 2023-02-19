import React from 'react';
import {useTheme} from "hooks/useTheme";

export const Header = () => {
    const [theme, switchTheme] = useTheme()
    return (
        <header className={`navbar navbar-dark bg-${theme === 'dark' ? 'dark' : 'primary'}`}>
            <div className="container">
                <h1 style={{color: "white"}}>Costs</h1>
                <button onClick={switchTheme} className={`btn btn-${theme}`}>
                    {theme === 'dark' ? 'Go light' : "Go dark"}
                </button>
            </div>
        </header>
    );
}

