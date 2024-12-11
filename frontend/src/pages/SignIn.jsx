import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios"
import { useState } from "react";

export function Signin(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    return(
        <div className="bg-slate-300 flex justify-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg text-center w-90 p-2 h-max px-4">
                    <Heading title={"Sign in"}></Heading>
                    <SubHeading title={"Enter your information to signin to your account"}></SubHeading>
                    <InputBox label={"Email"} placeholder={"example@gmail.com"} onChange={(e) => {
                        setUsername(e.target.value)
                    }}></InputBox>
                    <InputBox label={"Password"} placeholder={"password"} onChange={(e) => {
                        setPassword(e.target.value)
                    }}></InputBox>
                    <Button label={"Sign in"} onClick={ async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin" , {
                            username: username,
                            password: password
                        })
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard")
                    }}></Button>
                    <BottomWarning label={"Create an account?"} buttonText={"Sign up"} to={"/signup"}></BottomWarning>
                </div>
            </div>
        </div>
    )
}