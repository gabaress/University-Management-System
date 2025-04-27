import React, { useState } from 'react';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="/">University API</a>
            </div>
            <div className="navbar-links">
                <div className="dropdown">
                    <a href="#" onClick={toggleDropdown} className="dropdown-toggle">
                        Degrees
                    </a>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <ul>
                                <li>
                                    <a href="/degrees">All Degrees</a>
                                </li>
                                <li>
                                    <a href="/create_degree">Create Degree</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="dropdown">
                    <a href="#" onClick={toggleDropdown} className="dropdown-toggle">
                        Cohorts
                    </a>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <ul>
                                <li>
                                    <a href="/cohorts">All Cohorts</a>
                                </li>
                                <li>
                                    <a href="/create_cohort">Create Cohort</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="dropdown">
                    <a href="#" onClick={toggleDropdown} className="dropdown-toggle">
                        Modules
                    </a>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <ul>
                                <li>
                                    <a href="/modules">All Modules</a>
                                </li>
                                <li>
                                    <a href="/create_module">Create Module</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <a href="/create_student">Create Student</a>
            </div>
        </nav>
    );
};

export default Navbar;