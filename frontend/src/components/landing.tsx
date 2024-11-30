import { useNavigate } from "react-router-dom"

export const Landing = () => {
const navigate = useNavigate();

    return(
        <div className="flex justify-center bg-gradient-to-r from-teal-200 from-10% via-cyan-200 via-30% to-sky-200 to-90%">
            <div className="flex flex-col h-screen justify-center">
                <div className="">
                    <div className="flex flex-col items-center mb-6">
                        <h1 className="text-4xl font-bold text-sky-400 md:text-6xl">Welocome to Chit Chat</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20 text-sky-50 bg-sky-400 border rounded-full p-3 mt-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>

                    </div>
                    <div className="flex flex-col items-center">
                    <button onClick={()=>{
                        navigate('/create-room')
                    }} className="border-2 border-sky-400 rounded-lg bg-slate-50 text-sky-500 py-2 px-6 font-semibold text-lg">Create Room</button>
                    <button onClick={()=>{
                        navigate('/join-room')
                    }} className="text-lg font-semibold bg-sky-400 text-slate-50 rounded-lg py-2 px-8 mt-2">Join Room</button>
                    </div>
                </div>
            </div>
        </div>
    )
}