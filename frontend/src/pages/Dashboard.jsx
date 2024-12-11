import { useEffect, useState } from "react";
import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export function Dashboard(){

    const [balance, setBalance] = useState(0)
    const [id, setId] = useState("")

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => {
            setId(response.data.balance.userId)
            setBalance(response.data.balance.balance)
        })
    }, [balance, id])

    

    return(
        <div>
            <Appbar></Appbar>
            <div className="m-8">
                <Balance value={balance}></Balance>
                <Users></Users>
            </div>
        </div>
    )
}