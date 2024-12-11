import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export function UpdateProfile(){

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const [currentUser, setCurrentUser] = useState({})
    const [token, setToken] = useState("")
    
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/currentUser", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => {
            setCurrentUser(response.data.user)
        })
    }, [])

    // setFirstName(currentUser.firstname)
    // setLastName(currentUser.lastname)
    // setPassword(currentUser.password)

    return(
        <div className="bg-slate-300 flex justify-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg text-center w-90 p-2 h-max px-4">
                    <Heading title={"Update Profile"}></Heading>
                    <SubHeading title={"Enter information that you want to change"}></SubHeading>
                    <InputBox label={"First Name"} placeholder={"John"} value={currentUser.firstname} onChange={e => {
                        setFirstName(e.target.value)
                    }}></InputBox>
                    <InputBox label={"Last Name"} placeholder={"Deer"} value={currentUser.lastname} onChange={e => {
                        setLastName(e.target.value)
                    }}></InputBox>
                    <InputBox label={"Password"} placeholder={"password"} value={currentUser.password} onChange={e => {
                        setPassword(e.target.value)
                    }}></InputBox>
                    <Button label={"Update"} onClick={ async () => {
                        const response = await axios.put("http://localhost:3000/api/v1/user/update", {
                            firstname: firstName,
                            lastname: lastName,
                            password: password
                        } ,{
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                        localStorage.setItem("token", response.data.token)
                        setToken(response.data.token)
                        alert("Profile Updated Successfully")
                    }}>   
                    </Button>
                    <button onClick={() => {
                        localStorage.setItem("token", token)
                        navigate("/dashboard")
                    }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-gray-800 hover:bg-gray-900 text-white">
                        Return to Dashboard
                    </button>
                </div>
            </div>
        </div>
    )
}