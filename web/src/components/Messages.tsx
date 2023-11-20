export function Messages(props: {
  title: string;
  message: string;
  userName: string;
}) {
  return (
    <div className="flex flex-col  text-white py-4 px-10 m-5 rounded-lg border-solid border-2 border-slate-600 bg-slate-800 divide-y divide-slate-600">
      <p className="text-sm text-slate-400 pb-2">{props.userName}</p>
      <h2 className="text-2xl mb-4 pt-4 font-bold">{props.title}</h2>
      <p className="pt-4 leading-relaxed break-words">{props.message}</p>
    </div>
  );
}
