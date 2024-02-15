import { Experience } from "@/components/Experience";

export function NotFound() {
  return (
    <>
      <Experience />
      <div className="w-full h-screen flex items-center justify-center gap-5 text-white">
        <h1 className="text-5xl">404</h1>
        <p className="text-2xl">Not found</p>
      </div>
    </>
  );
}
