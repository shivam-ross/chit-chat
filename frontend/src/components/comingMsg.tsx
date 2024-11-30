type props = {
    sender:string,
    message:string
}

export const ComingMsg = ({sender, message}:props)=>{
    return(
        <div className="flex mt-4">
            <p className="flex justify-center items-center w-10 h-10 text-slate-300 text-md font-sans bg-slate-700 rounded-full my-1 mx-1 font-bold ">{sender}</p>
            <div className="flex justify-start">
                <p className="max-w-60 bg-gray-700 p-2 rounded-lg break-words text-sky-50 font-mono">
                   {message}
                </p>
            </div>
        </div>
    )
}