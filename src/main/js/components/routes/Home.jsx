import React from "react";
import { Link } from "react-router";

const Home = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/admin'>Admin</Link></li>
                    <li><Link to='/tutor'>Tutor</Link></li>
                    <li><Link to='/student'>Student</Link></li>
                </ul>
            </nav>
            <span>Home</span>
        </div>
    )
};

export default Home
