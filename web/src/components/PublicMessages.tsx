import { api } from "@/api";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Messages } from "./Messages";

interface Message {
  id: string;
  title: string;
  message: string;
  created_at: Date;
  userName: string;
}

export function PublicMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [cookie] = useCookies(["token"]);
  const token = cookie["token"];

  useEffect(() => {
    const getMessages = async () => {
      const response = await api.get("/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(response.data);
    };
    getMessages();
  }, []);

  return (
    <>
      {messages.length == 0 ? (
        <h1 className="text-white text-4xl text-center">
          Sem mensagens no momento
        </h1>
      ) : (
        messages.map((msg) => (
          <Messages
            key={msg.id}
            title={msg.title}
            message={msg.message}
            userName={msg.userName}
            created_at={msg.created_at}
          />
        ))
      )}
    </>
  );
}
