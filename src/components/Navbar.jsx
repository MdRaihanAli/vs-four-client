import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {

    const navItem = <>
        <li className='font-bold'><Link to='/'>All People</Link></li>
        <li className='font-bold'><Link to='addPeople'>Add People</Link></li>

    </>


    return (
        <div className='bg-base-300'>
            <div className='max-w-7xl mx-auto'>
                <div className="navbar bg-base-300">
                    <div className="navbar-start ">
                        <div className="dropdown ">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3  z-50 p-2 shadow bg-base-100 rounded-box w-52">
                                {navItem}
                            </ul>
                        </div>
                        <div>

                            <a className="ms-5 normal-case font-extrabold text-4xl">VS-4</a>
                            <a className="mx-5 font-extrabold text-white text-4xl">STAFF STATUSS</a>
                        </div>
                    </div>
                    <div className="navbar-end hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navItem}
                        </ul>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Navbar