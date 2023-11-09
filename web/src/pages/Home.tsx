import { useEffect, useState } from "react";
import { CreateMessage } from "../components/CreateMessage";
import { Messages } from "../components/Messages";
import { api } from "../api";

interface Message {
  id: string;
  title: string;
  message: string;
  created_at: Date;
}

export function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      console.log("Taking messages");
      const response = await api.get("/messages");

      setMessages(response.data);
    };
    getMessages();
  }, []);

  return (
    <div className="w-[960px] mx-auto">
      <a href="./pages/Login.tsx">LOGIN</a>
      <CreateMessage />

      <h1 className="text-slate-200 font-bold text-4xl mx-5 my-8">Feed</h1>

      {messages.length == 0 ? (
        <h1 className="text-white text-4xl text-center">
          Sem mensagens no momento
        </h1>
      ) : (
        messages.map((msg) => (
          <Messages key={msg.id} title={msg.title} message={msg.message} />
        ))
      )}
    </div>
  );
}
