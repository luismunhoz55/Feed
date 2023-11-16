import { api } from "@/api";
import { FormEvent } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export function Signup() {
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const user = await api.post("/user/register", {
        name,
        email,
        password,
      });

      if (user) {
        toast("Cadastrado!");
      }

      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center ">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 items-center py-5 px-10  bg-slate-800 border-slate-600 rounded-lg"
      >
        <h2 className="font-bold text-3xl text-white text-center">Sign up</h2>
        <input
          className="w-full py-2 px-4 text-black rounded-md break-words"
          type="text"
          name="name"
          placeholder="Name: "
          required
        />
        <input
          className="w-full py-2 px-4 text-black rounded-md break-words"
          type="email"
          name="email"
          placeholder="E-mail:"
          required
        />
        <input
          className="w-full py-2 px-4 text-black rounded-md break-words"
          type="password"
          name="password"
          placeholder="Password:"
          required
        />
        <input
          className="text-slate-100 bg-slate-950 rounded-lg px-5 py-2 hover:text-slate-300 transition-colors font-bold cursor-pointer"
          type="submit"
          value="Cadastrar"
        />
      </form>
      <button
        onClick={() => navigate("/")}
        className="text-white bg-slate-600 hover:bg-slate-700 rounded-lg px-5 py-2 transition-colors font-bold cursor-pointer"
      >
        Fazer Login
      </button>
    </div>
  );
}
