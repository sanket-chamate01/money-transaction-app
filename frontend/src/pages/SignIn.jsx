import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export function Signin(){
    return(
        <div className="bg-slate-300 flex justify-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg text-center w-90 p-2 h-max px-4">
                    <Heading title={"Sign in"}></Heading>
                    <SubHeading title={"Enter your information to signin to your account"}></SubHeading>
                    <InputBox label={"Email"} placeholder={"example@gmail.com"}></InputBox>
                    <InputBox label={"Password"} placeholder={"password"}></InputBox>
                    <Button label={"Sign in"}></Button>
                    <BottomWarning label={"Create an account?"} buttonText={"Sign up"} to={"/signup"}></BottomWarning>
                </div>
            </div>
        </div>
    )
}