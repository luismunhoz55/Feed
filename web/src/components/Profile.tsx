import { useAuth } from "@/hooks/Auth";
import { api } from "@/api";

interface SignOut {
  signOut?: Function;
}

export function Profile() {
  const { signOut }: SignOut = useAuth();
  // const name = axios.get('/')

  async function handleSignOut() {
    if (signOut) {
      signOut();
    }
  }

  return (
    <div className="flex items-center justify-between text-white py-5 px-10 m-5 rounded-lg border-solid border-2 border-slate-600 bg-slate-800">
      <h2 className="text-2xl font-bold">Luis</h2>
      <button
        onClick={handleSignOut}
        className="text-slate-100 bg-slate-950 rounded-lg px-5 py-2 hover:text-slate-300 transition-colors font-bold cursor-pointer"
      >
        Log out
      </button>
    </div>
  );
}
