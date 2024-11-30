type props ={
    sender: string,
    message: string
}
export const SentMsg = ({sender, message}:props) => {
    return(
        <div className="flex mt-4 justify-end">
            <p className="flex justify-center items-center w-10 h-10 text-slate-800 text-md font-sans bg-sky-50 rounded-full my-1 mx-1 font-bold ">{sender}</p>
            <div className="flex justify-start">
                <p className="max-w-60 bg-sky-50 p-2 rounded-lg break-words text-black font-mono">
                   {message}
                </p>
            </div>
        </div>
    )
}