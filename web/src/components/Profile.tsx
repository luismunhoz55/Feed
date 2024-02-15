import { useAuth } from "@/hooks/Auth";
import { useEffect, useState } from "react";

interface useAuthProps {
  signOut?: Function;
  getUserData?: Function;
}

export function Profile() {
  const { signOut, getUserData }: useAuthProps = useAuth();
  const [name, setName] = useState();

  useEffect(() => {
    async function getData() {
      const data = await getUserData!();
      setName(data.name);
    }

    getData();
  }, []);

  async function handleSignOut() {
    signOut!();
  }

  return (
    <div className="flex items-center justify-between text-white py-5 px-10 m-5 rounded-lg glassmorphism">
      <h2 className="text-2xl font-bold">{name}</h2>
      <button
        onClick={handleSignOut}
        className="text-slate-100 bg-slate-950 rounded-lg px-5 py-2 hover:text-slate-300 transition-colors font-bold cursor-pointer"
      >
        Log out
      </button>
    </div>
  );
}
