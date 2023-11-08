export function Messages(props: { title: string; message: string }) {
  return (
    <div className="flex flex-col  text-white py-5 px-10 m-5 rounded-lg border-solid border-2 border-slate-600 bg-slate-800 divide-y divide-slate-600">
      <h2 className="text-2xl mb-4">{props.title}</h2>
      <p className="pt-4 leading-relaxed break-words">{props.message}</p>
    </div>
  );
}
