import { WebSocketServer, WebSocket } from "ws";

type Room = {
  name: string;
  clients: Set<WebSocket>;
};

const rooms: Map<string, Room> = new Map();
const userNames: Map<WebSocket, string> = new Map(); // Map to track usernames

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket: WebSocket) => {
  console.log("New client connected");

  socket.on("message", (data) => {
    try {
      const { type, roomName, message, username } = JSON.parse(data.toString());

      switch (type) {
        case "set_username":
          if (!username || username.trim() === "") {
            socket.send(JSON.stringify({ type: "error", message: "Username cannot be empty" }));
          } else {
            userNames.set(socket, username.trim());
            socket.send(JSON.stringify({ type: "username_set", username }));
          }
          break;

        case "create_room":
          if (rooms.has(roomName)) {
            socket.send(JSON.stringify({ type: "error", message: "Room already exists" }));
          } else {
            rooms.set(roomName, { name: roomName, clients: new Set([socket]) });
            socket.send(JSON.stringify({ type: "room_created", roomName }));
          }
          break;

        case "join_room":
          if (!rooms.has(roomName)) {
            socket.send(JSON.stringify({ type: "error", message: "Room does not exist" }));
          } else {
            const room = rooms.get(roomName)!;
            room.clients.add(socket);
            socket.send(JSON.stringify({ type: "room_joined", roomName }));
            room.clients.forEach((client) => {
              if (client !== socket) {
                client.send(
                  JSON.stringify({ type: "user_joined", roomName, username: userNames.get(socket) || "Anonymous" })
                );
              }
            });
          }
          break;

        case "send_message":
          if (!rooms.has(roomName)) {
            socket.send(JSON.stringify({ type: "error", message: "Room does not exist" }));
          } else {
            const room = rooms.get(roomName)!;
            const senderName = userNames.get(socket) || "Anonymous";
            room.clients.forEach((client) => {
              client.send(
                JSON.stringify({
                  type: "message",
                  roomName,
                  sender: senderName,
                  message,
                })
              );
            });
          }
          break;

        default:
          socket.send(JSON.stringify({ type: "error", message: "Invalid action" }));
      }
    } catch (error) {
      console.error("Error processing message", error);
      socket.send(JSON.stringify({ type: "error", message: "Invalid message format" }));
    }
  });

  socket.on("close", () => {
    userNames.delete(socket); // Remove user from username map
    rooms.forEach((room) => {
      room.clients.delete(socket);
      if (room.clients.size === 0) {
        rooms.delete(room.name);
      }
    });
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:8080");
