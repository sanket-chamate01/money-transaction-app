
export function InputBox({label, placeholder}){
    return(
        <div>
            <div className="text-sm text-left py-2 font-medium">
                {label}
            </div>
            <input type="text" placeholder={placeholder}/>
        </div>
    )
}