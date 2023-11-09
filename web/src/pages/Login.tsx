import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <form className="flex flex-col gap-5 items-center py-5 px-10  bg-slate-800 border-slate-600 rounded-lg">
        <h2 className="font-bold text-3xl text-white text-center">Login</h2>
        <input
          className="w-full py-2 px-4 text-black rounded-md break-words"
          type="email"
          name="email"
          placeholder="E-mail:"
        />
        <input
          className="w-full py-2 px-4 text-black rounded-md break-words"
          type="password"
          name=""
          placeholder="Password:"
        />
        <input
          className="text-slate-100 bg-slate-950 rounded-lg px-5 py-2 hover:text-slate-300 transition-colors font-bold cursor-pointer"
          type="submit"
          value="Fazer login"
        />
      </form>

      <Link to="/">Voltar</Link>
    </div>
  );
}
