import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export function Signup(){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    return(
        <div className="bg-slate-300 flex justify-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg text-center w-90 p-2 h-max px-4">
                    <Heading title={"Create an Account"}></Heading>
                    <SubHeading title={"Enter your information to create an account"}></SubHeading>
                    <InputBox label={"First Name"} placeholder={"John"} onChange={e => {
                        setFirstName(e.target.value)
                    }}></InputBox>
                    <InputBox label={"Last Name"} placeholder={"Deer"} onChange={e => {
                        setLastName(e.target.value)
                    }}></InputBox>
                    <InputBox label={"Email"} placeholder={"example@gmail.com"} onChange={e => {
                        setUsername(e.target.value)
                    }}></InputBox>
                    <InputBox label={"Password"} placeholder={"password"} onChange={e => {
                        setPassword(e.target.value)
                    }}></InputBox>
                    <Button label={"Create Account"} onClick={ async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup" , {
                            username: username,
                            firstname: firstName,
                            lastname: lastName,
                            password: password
                        })
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard")
                    }}>   
                    </Button>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>
                </div>
            </div>
        </div>
    )
}