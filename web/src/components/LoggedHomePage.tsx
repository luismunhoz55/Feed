import { useEffect, useState } from "react";
import { CreateMessage } from "./CreateMessage";
import { api } from "@/api";
import { Messages } from "./Messages";

interface Message {
  id: string;
  title: string;
  message: string;
  created_at: Date;
}

export function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      const response = await api.get("/messages");

      setMessages(response.data);
    };
    getMessages();
  }, []);

  return (
    <>
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
    </>
  );
}
