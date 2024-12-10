import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export function Dashboard(){
    return(
        <div>
            <Appbar></Appbar>
            <div>
                <Balance></Balance>
                <Users></Users>
            </div>
        </div>
    )
}