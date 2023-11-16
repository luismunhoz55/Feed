import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export function Test() {
  const navigate = useNavigate();
  function haha() {
    navigate("/");
    toast("Foda");
  }

  return (
    <>
      <Toaster />
      <button className="text-white text-5xl" onClick={haha}>
        Clique
      </button>
      ;
    </>
  );
}
