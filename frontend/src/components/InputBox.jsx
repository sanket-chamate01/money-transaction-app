
export function InputBox({label, placeholder, onChange, value}){
    return(
        <div>
            <div className="text-sm text-left py-2 font-medium">
                {label}
            </div>
            <input onChange={onChange} defaultValue={value} type="text" placeholder={placeholder} className="w-full border-slate-200 border rounded px-2 py-1"/>
        </div>
    )
}