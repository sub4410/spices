import { useState } from "react"


export function Inputbox({placeholder, label, onchange}){

    return(
        <div className="m-5 mr-20">
            <label className="font-mono font-black text-black dark:text-black" htmlFor="">{label}</label> <br />
            <input onChange = {onchange} placeholder= {placeholder} className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" />
        </div>
    )
}