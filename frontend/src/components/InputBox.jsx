
export function InputBox({label, placeholder, onChange}){
    return(
        <div>
            <div className="text-sm text-left py-2 font-medium">
                {label}
            </div>
            <input onChange={onChange} type="text" placeholder={placeholder} className="w-full border-slate-200 border rounded px-2 py-1"/>
        </div>
    )
}