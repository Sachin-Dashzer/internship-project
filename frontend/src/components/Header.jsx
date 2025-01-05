import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../store/authStore/index";

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [menuBox, setMenuBox] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)


    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = 100;
            const scrollTop = window.scrollY;

            if (scrollTop > scrollPos) {
                setIsSticky(true);
                setShowScrollTop(true);
            } else {
                setIsSticky(false);
                setShowScrollTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const logOut = () => {
        dispatch(logoutUser())
    }


    return (
        <div>

            <header
                className={`${isSticky ? "fixed top-0 left-0 w-full z-50 bg-white shadow-md" : ""}`}
            >


                <nav className="flex items-center justify-between px-4 md:px-16 py-4">

                    <div className="flex items-center">
                        <a href="/" className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-gray-800" style={{textTransform : "capitalize"}}>{user?.name}</h1>
                        </a>
                    </div>


                    <ul className="hidden text-md md:flex md:gap-10 text-gray-700 font-medium">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "hover:text-blue-600"
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/friend-list"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "hover:text-blue-600"
                                }
                            >
                                Friend list
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/friend-request"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "hover:text-blue-600"
                                }
                            >
                                Friend Requests
                            </NavLink>
                        </li>
                        <li>
                            <p
                                className="cursor-pointer font-semibold"
                                onClick={logOut}
                            >
                                Logout
                            </p>
                        </li>

                    </ul>


                    <div
                        onClick={() => setMenuBox(true)}
                        className="text-gray-700 text-xl md:hidden cursor-pointer"
                    >

                        <i className="fa-solid fa-bars"></i>
                    </div>
                </nav>
            </header>


            <div
                className={`fixed md:hidden top-0 left-0 w-4/5 h-full bg-white transform ${menuBox ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 z-50`}
            >
                <div className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold ml-2" style={{textTransform : "capitalize"}}>{user?.name}</h1>
                    </div>
                    <button
                        onClick={() => setMenuBox(false)}
                        className="text-xl text-white focus:outline-none"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <ul className="mt-8 space-y-4 px-8">
                    <li>
                        <NavLink
                            onClick={() => setMenuBox(false)}
                            to="/"
                            className="block text-gray-800 text-lg font-medium hover:text-blue-600"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={() => setMenuBox(false)}
                            to="/friend-list"
                            className="block text-gray-800 text-lg font-medium hover:text-blue-600"
                        >
                            Friend List
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={() => setMenuBox(false)}
                            to="/friend-request"
                            className="block text-gray-800 text-lg font-medium hover:text-blue-600"
                        >
                            Friend Requests
                        </NavLink>
                    </li>
                    <li>
                        <p
                            className="cursor-pointer font-semibold"
                            onClick={logOut}
                        >
                            Logout
                        </p>
                    </li>


                </ul>
            </div>


        </div>
    );
};

export default Header;
