import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent } from "react";
import { api } from "@/api";
import { useCookies } from "react-cookie";

export function CreateMessage() {
  const [cookie] = useCookies(["token"]);
  const token = cookie["token"];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const title = formData.get("title");
    const message = formData.get("message");
    const isPrivateRequest = formData.get("isPrivate");

    const isPrivate = isPrivateRequest == null ? false : true;

    await api.post(
      "/messages",
      {
        title,
        message,
        isPrivate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    location.reload();
  }

  return (
    <div className="flex justify-between items-center gap-4 py-5 px-10 m-5 mt-6 rounded-lg border-solid border-2 border-slate-600 bg-slate-800">
      <p className="text-white">Crie uma nova mensagem!</p>
      <Dialog>
        <DialogTrigger className="text-slate-100 bg-slate-950 rounded-lg px-5 py-2 hover:text-slate-300 transition-colors font-bold">
          Criar
        </DialogTrigger>
        <DialogContent className="bg-slate-700 text-white border-2 border-slate-600 divide-y divide-slate-500">
          <DialogHeader>
            <DialogTitle>Criar uma nova mensagem</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 items-center pt-5"
          >
            <input
              className="w-full py-2 px-4 text-black rounded-md break-words"
              type="text"
              name="title"
              placeholder="Título:"
              required
            />
            <textarea
              className="w-full h-40 py-2 px-4 text-black rounded-md break-words resize-none"
              name="message"
              placeholder="Mensagem:"
              required
            />
            <div className="flex items-center gap-2">
              <label htmlFor="isPrivate">Privado:</label>
              <input className="rounded-lg" type="checkbox" name="isPrivate" />
            </div>
            <input
              className="text-slate-100 bg-slate-950 rounded-lg px-5 py-2 hover:text-slate-300 transition-colors font-bold cursor-pointer"
              type="submit"
              value="Criar"
            />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
