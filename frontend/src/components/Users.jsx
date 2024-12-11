import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Button } from "./Button"
import { useEffect, useState } from "react"

export const Users = () => {
    const [users, setUsers] = useState([])

    const [filter, setFilter] = useState("")

    const token = localStorage.getItem("token")

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, 
            { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then(response => {
            setUsers(response.data.users)
        })
    }, [filter, users])

    return(
        <div>
            <div className="font-bold text-lg mt-6">
                Users
            </div>
            <div className="my-2">
                <input className="border rounded border-slate-200 px-2 py-1 w-full"
                    onChange={(e) => {
                        setFilter(e.target.value)
                    }} type="text" placeholder="Search Users......"></input>
            </div>
            <div>
                {users.map(user => <User user={user} />)}
            </div>
        </div>
    )
}

function User({user}){
    const navigate = useNavigate()

    return(
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center mt-5 mr-2 ml-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstname[0].toUpperCase()}
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col justify-center h-full">
                        {user.firstname} {user.lastname}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center h-full mb-3">
                <Button label={"Send Money"} onClick={() => {
                    navigate("/send?id=" + user._id + "&name=" + user.firstname)
                }}></Button>
            </div>
        </div>
    )
}