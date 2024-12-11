import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


export function Appbar(){

    const [currentUser, setCurrentUser] = useState({})
    
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/currentUser", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => {
            setCurrentUser(response.data.user)
        })
    }, [])

    const [isDropDownOpen, setIsDropDownOpen] = useState(false)

    const toggleDropdown = () => {
        setIsDropDownOpen(prevState => !prevState);
    };

    return(
        <div className="flex justify-between bg-slate-200 shadow h-14">
            <div className="ml-8 flex flex-col justify-center h-full text-slate-700">
                TransactiFlow
            </div>
            <div className="flex justify-around">
                <div className="flex flex-col justify-center h-full mr-0 font-medium text-slate-700">
                    Hello
                </div>
                <div className="flex justify-center mr-4 relative">
                    <div className="flex flex-col justify-center h-full">
                    
                        <button onClick={toggleDropdown} 
                            className="bg-slate-200 text-slate-700 hover:text-black focus:text-black focus:outline-none font-semibold rounded-lg text-md px-3 py-2.5 text-center inline-flex items-center" 
                            type="button">
                            {currentUser.firstname} {currentUser.lastname}
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>


                        {/*  dropdown */}

                        <div 
                            className={`z-10 ${isDropDownOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-16 right-0`}>
                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div>{currentUser.firstname} {currentUser.lastname}</div>
                            <div className="font-medium truncate">{currentUser.username}</div>
                            </div>
                            <div className="py-2">
                            <Link to={"/updateProfile"} 
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                    Update Profile
                            </Link>
                            <Link to={"/signin"} 
                                onClick={() => {
                                    localStorage.removeItem("token")
                                }}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                    Sign out
                            </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}