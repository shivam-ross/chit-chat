import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const JoinRoom = () => {
    const navigate = useNavigate();
    const[username, setUsername ] = useState('');
    const[roomName, setRoomName] = useState('');

    
    return (
        <div className="flex justify-center bg-gradient-to-r from-teal-200 from-10% via-cyan-200 via-30% to-sky-200 to-90%">
            <div className="flex flex-col justify-center h-screen">
                <div className=" bg-slate-50 border-2 border-slate-400 p-10 rounded-lg">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-sky-400">Join Room</h1>
                        
                    </div>
                    <div className="mb-6">
                        <h2 className="text-lg font-medium mb-2">Name:</h2>
                        <input onChange={e => setUsername(e.target.value)} className="border-2 rounded-md p-2 " placeholder="enter your name"></input>
                    </div>
                    <div>
                        <h2 className="text-lg font-medium mb-2">Room id:</h2>
                        <input onChange={e => setRoomName(e.target.value)} className="border-2 rounded-md p-2" placeholder="enter room id"></input>
                    </div>
                    <div className="mt-8">
                        <button onClick={async() => {
                            await localStorage.setItem("username", username);
                            await localStorage.setItem("roomName", roomName);
                            await localStorage.setItem("action", "join_room");
                            await navigate('/room');
                        }} className="bg-sky-400 text-slate-50 p-2 max-w-md w-full rounded-md text-lg font-semibold">Enter</button>
                    </div>
                    <div className="text-center mt-4">
                       <span className="font-medium text-slate-400">create room instead? </span> <Link  to={'/create-room'} className="text-md font-bold text-slate-400 hover:text-slate-900 underline">Create</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}