import { FormEvent } from "react";
import { useAuth } from "@/hooks/Auth";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { Experience } from "@/components/Experience";

interface SignIn {
  signIn?: Function;
}

export function Login() {
  const navigate = useNavigate();
  const { signIn }: SignIn = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get("email");
    const password = formData.get("password");

    toast("Carregando dados...");

    try {
      if (signIn) {
        await signIn({
          email,
          password,
        });
      }
    } catch (error) {
      toast.error("Erro");
    }
  }

  return (
    <div className="w-full h-screen">
      <Experience />
      <Toaster richColors position="bottom-right" />
      <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 items-center py-5 px-10 rounded-lg glassmorphism"
        >
          <h2 className="font-bold text-3xl text-white text-center">Login</h2>
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
            value="Fazer login"
          />
        </form>

        <button
          onClick={() => navigate("/signup")}
          className="text-white bg-slate-600 hover:bg-slate-700 rounded-lg px-5 py-2 transition-colors font-bold cursor-pointer"
        >
          Fazer cadastro
        </button>
      </div>
    </div>
  );
}
