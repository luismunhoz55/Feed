import { useEffect, useState } from "react";
import { CreateMessage } from "./components/CreateMessage";
import { Messages } from "./components/Messages";
import { api } from "./api";

interface Message {
  id: string;
  title: string;
  message: string;
  created_at: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      const response = await api.get("/messages");

      setMessages(response.data);
    };
    getMessages();
  }, []);

  return (
    <div className="w-[960px] mx-auto">
      <CreateMessage />

      <h1 className="text-slate-200 font-bold text-4xl mx-5 my-8">Feed</h1>

      {messages.map((msg) => (
        <Messages key={msg.id} title={msg.title} message={msg.message} />
      ))}
    </div>
  );
}

export default App;
