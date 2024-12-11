import { Link } from "react-router-dom";

export function BottomWarning({label, buttonText, to}){
    return(
        <div className="flex justify-around py-2">
            <div>
                {label}
            </div>
            <Link to={to} className="pointer underline cursor-pointer">
                {buttonText}
            </Link>
        </div>
    )
}