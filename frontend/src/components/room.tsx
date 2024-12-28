import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import { ComingMsg } from "./comingMsg";
import { SentMsg } from "./sentMsg";

export const Room: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]); 
  const [newMessage, setNewMessage] = useState<string>(""); 
  const socket = useRef<WebSocket | null>(null); 
  const chatEndRef = useRef<HTMLDivElement | null>(null); 
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "Anonymous";
  const roomName = localStorage.getItem("roomName") || "Room1";
  const action = localStorage.getItem("action"); 

  useEffect(() => {
    if (!action || !roomName) {
      console.error("Room or action not set in localStorage!");
      return;
    }

    socket.current = new WebSocket("wss://chit-chat-no5o.onrender.com");

    socket.current.onopen = () => {
      const message: WebSocketMessage = { type: action, roomName };
      const userPayload: WebSocketMessage = {type: "set_username", username};
      socket.current?.send(JSON.stringify(userPayload));
      socket.current?.send(JSON.stringify(message));
    };

    socket.current.onmessage = (event: MessageEvent) => {
      const data: WebSocketMessage = JSON.parse(event.data);

      if (data.type === "message") {
        setMessages((prev) => [
          ...prev,
          { sender: data.sender || "Unknown", message: data.message || "" },
        ]);
      }
    };

    return () => {
      socket.current?.close();
    };
  }, [action, roomName, username]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() && socket.current) {
      const message: WebSocketMessage = {
        type: "send_message",
        roomName,
        message: newMessage,
        sender: username,
      };
      socket.current.send(JSON.stringify(message));

     
      setNewMessage(""); 
    }
  };

  return (
    <div className="lg:grid lg:grid-cols-2">
      
      <div className="hidden lg:block bg-black border-r-2 border-sky-50 sticky top-0 h-screen">
  <div className="flex flex-col items-center justify-center h-full">
    <h1 className="text-6xl text-sky-50 font-semibold mb-6">Chit Chat</h1>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-20 text-black bg-sky-50 rounded-full p-2 m-1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      />
    </svg>
    <p className="text-lg font-mono font-medium text-slate-200 bg-slate-700 tracking-widest p-2 rounded-md mt-6">
      Stay Connected...
    </p>
  </div>
</div>


      
      <div className="flex flex-col">
        <div className="sticky top-0 bg-black rounded border-b-2 border-sky-50 p-1 z-10">
          <div className="flex justify-between">
            <div className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-12 text-black bg-sky-50 rounded-full p-2 m-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
            </div>

            <div className="flex items-center">
              <h3 className="text-xl font-semibold text-sky-50">{roomName}</h3>
            </div>

            <div className="flex items-center mr-2">
              <button onClick={() => {
                  navigate('/');
              }}
                className="text-black bg-sky-50 text-md font-medium rounded-full py-2 px-6">
                Exit
              </button>
            </div>
          </div>
        </div>

        
        <div className="bg-black min-h-[84dvh] pt-2 max-w-screen overflow-y-auto px-3">
          {messages.map((msg, index) =>
            msg.sender === username ? (
              <SentMsg key={index} sender={msg.sender[0].toUpperCase()} message={msg.message} />
            ) : (
              <ComingMsg key={index} sender={msg.sender[0].toUpperCase()} message={msg.message} />
            )
          )}
          
          <div ref={chatEndRef} />
        </div>

        
        <div className="sticky bottom-0 z-10 bg-black p-2 flex">
          <input
            onKeyDown={(e)=>{
              if(e.key == "Enter"){
              sendMessage();
            }}}
            className="border-2 border-sky-50 bg-black p-1 w-[80dvw] rounded-lg text-sky-50"
            placeholder="Write the message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="text-center mx-4 border-2 border-sky-50 p-2 rounded-md"
            onClick={sendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6 text-sky-50"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

interface Message {
  sender: string;
  message: string;
}

interface WebSocketMessage {
  type: string;
  roomName?: string;
  sender?: string;
  message?: string;
  username?: string;
}
