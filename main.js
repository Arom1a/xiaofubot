import { WebSocket } from "ws";
import "dotenv/config";

async function startConversation() {
  const ws = new WebSocket("wss://api.elevenlabs.io/v1/convai/conversation", {
    headers: {
      agent_id: process.env.AGENT_ID,
    },
  });

  ws.on("open", async () => {
    console.log("open");
    ws.send(JSON.stringify({ type: "conversation_initiation_client_data" }));
  });

  ws.on("message", async (event) => {
    console.log("msg");

    console.log(event.toString());
    const data = JSON.parse(event.data);
    console.log(data.type);
  });

  ws.on("close", async () => {
    console.log("close");
  });

  ws.on("error", (err) => {
    console.error("WebSocket error:", err.message);
  });
}

startConversation();
