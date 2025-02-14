import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="enterprise-homepage"></div>
            {/* Sticky Header */}
            <header className="header">
                <div className="container header-container">
                    <Link className="logo" to="/">
                        AutoMarket
                    </Link>
                    <nav className="nav">
                        <ul>
                            <li>
                                <Link to="/browse-cars">Browse Cars</Link>
                            </li>
                            <li>
                                <Link to="/find-mechanics">Find Mechanics</Link>
                            </li>
                            {/* <li>
                                <Link to="/sell-your-car">Sell Your Car</Link>
                            </li> */}
                            <li>
                                <Link to="/sign-in">Sign In</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </nav>
    );
};

export default Navbar;
