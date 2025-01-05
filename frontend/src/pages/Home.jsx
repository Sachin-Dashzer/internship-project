import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../store/userStore/index.js";

const App = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();

    const getdata = async () => {
        try {
            const response = await dispatch(getUser());
            const fetchedData = response.payload.data;
            setUsers(fetchedData);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="md:px-24 p-5  md:py-10 font-sans bg-gray-100 min-h-screen">

            <input
                type="text"
                placeholder="Search by name, email..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-3 mb-6 text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <div>
                {filteredUsers.length > 0 ? (
                    <div className="grid gap-4 md:gap-10 md:grid-cols-2 lg:grid-cols-4 mt-4 md:px-5">
                        {filteredUsers.map((user) => (
                            <div
                                key={user._id}
                                className="flex md:flex-col md:text-center items-center md:p-5 p-3 bg-white shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
                            >
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="md:w-28 w-16 md:h-28 h-16 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <h2 className="text-lg mt-2 font-semibold text-gray-900">
                                        {user.name}
                                    </h2>
                                    <p className="text-gray-600 text-sm">{user.email}</p>
                                    <div className=" text-white text-xs mt-3 flex flex-wrap items-center justify-center gap-2">
                                        {user?.hobby?.map((item, index) => (
                                            <span key={index} className="cursor-pointer py-1 px-2 rounded-md bg-blue-400">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                    <button class="cursor-pointer md:px-4 p-2 md:mx-auto md:mt-3 mt-2 flex items-center bg-blue-500 hover:bg-blue-700 active:border active:border-blue-400 rounded-md duration-100">
                                        <span class="md:text-sm text-xs text-slate-100 font-medium">+ Add friend </span>
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-10">
                        No users found. Try searching for a different term.
                    </p>
                )}
            </div>
        </div>

    );
};

export default App;
