import { api } from "@/api";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Messages } from "./Messages";
import { Switch } from "@/components/ui/switch";

interface Message {
  id: string;
  title: string;
  message: string;
  isPrivate: boolean;
  created_at: Date;
  userName: string;
}

export function PrivateMessages() {
  const [privateMessages, setPrivateMessages] = useState<Message[]>([]);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [cookie] = useCookies(["token"]);
  const token = cookie["token"];

  useEffect(() => {
    const getMessages = async () => {
      const response = await api.get("/mymessages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAllMessages(response.data);
      setPrivateMessages(
        response.data.filter((message: Message) => message.isPrivate)
      );
    };
    getMessages();
  }, []);

  function isPrivateActivated(isPrivate: boolean) {
    if (isPrivate) {
      if (privateMessages.length == 0) {
        return (
          <h1 className="text-white text-4xl text-center mt-10">
            Você não tem mensagens privadas
          </h1>
        );
      }
      return privateMessages.map((msg) => (
        <Messages
          key={msg.id}
          title={msg.title}
          message={msg.message}
          userName={msg.userName}
          created_at={msg.created_at}
        />
      ));
    }
    return allMessages.map((msg) => (
      <Messages
        key={msg.id}
        title={msg.title}
        message={msg.message}
        userName={msg.userName}
        created_at={msg.created_at}
      />
    ));
  }

  return (
    <>
      <div className="px-5 flex items-center gap-4">
        <Switch
          id="private-messages"
          className="data-[state=unchecked]:bg-slate-500 data-[state=checked]:bg-slate-200"
          onCheckedChange={(e) => setIsPrivate(e)}
        />
        <label className="text-white " htmlFor="private-messages">
          Only private messages
        </label>
      </div>
      {allMessages.length == 0 ? (
        <h1 className="text-white text-4xl text-center mt-10">
          Sem mensagens no momento
        </h1>
      ) : (
        isPrivateActivated(isPrivate)
      )}
    </>
  );
}
