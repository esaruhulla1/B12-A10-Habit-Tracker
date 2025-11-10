import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import Header_logo from '../assets/Header-logo.png';
import Header_logo_2 from '../assets/Header-logo-2.png';
import { AuthContext } from '../Context/AuthContext';
const Header = () => {
    const {user} = useContext(AuthContext)
    console.log('the user is', user);
    
    const links = <>
        <li className='underline-offset-3 text-[15px]'><NavLink to="/">Home</NavLink></li>
        <li className='underline-offset-3 text-[15px]'><NavLink to="/habits">Habits</NavLink></li>
        <li className='underline-offset-3 text-[15px]'><NavLink to="/add-habit">Add Habit</NavLink></li>
        <li className='underline-offset-3 text-[15px]'><NavLink to="/my-habit">My Habits</NavLink></li>

    </>
    return (
        <div>
            <div className='bg-base-100 shadow-sm'>
                <div className="navbar  max-w-[1820px]  mx-auto">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                {links}
                            </ul>
                        </div>
                        <div className='flex gap-0 items-center -ml-2'>
                            {/* <img className='max-w-[45px] -mr-4' src={Header_logo} alt="" /> */}
                            {/* <img className='max-w-[60px] -mr-4' src={Header_logo_2} alt="" /> */}
                            <a className="btn btn-ghost text-xl ">
                                {/* <img className='max-w-[45px] -ml-6 pl-1 -mr-2' src={Header_logo} alt="" /> */}
                                <img className='max-w-[60px] -ml-8 -mr-4' src={Header_logo_2} alt="" />
                                Habit Tracker</a>
                        </div>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 space-x-3">
                            {links}
                        </ul>
                    </div>
                    {/* <div className="navbar-end gap-3">
                        <Link to="/login">Login</Link>
                        <Link to="/signup">SignUp</Link>
                    </div> */}
                    <div className="navbar-end gap-5">
                        <Link
                            to="/login"
                            className="text-gray-800 font-semibold text-[14px] hover:text-[#f47000] relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#f47000] hover:after:w-full after:transition-all after:duration-300"
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            className="text-gray-800 font-semibold text-[14px] hover:text-[#f47000] relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#f47000] hover:after:w-full after:transition-all after:duration-300"
                        >
                            Sign Up
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Header;