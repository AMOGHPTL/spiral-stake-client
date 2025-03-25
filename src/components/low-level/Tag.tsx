const Tag = ({ text, color }: { text: string; color: string }) => {
  const colors: Record<string, string> = {
    green: "text-green-400 bg-stone-900",
    red: "text-red-500 bg-stone-900",
    gray: "text-neutral-500 bg-zinc-400 bg-opacity-20",
    yellow: "text-yellow-300 bg-stone-800",
  };

  return (
    <div
      className={`px-2.5 py-1 rounded-[33.78px] inline-flex justify-start items-center gap-1.5 ${colors[color]}`}
    >
      <div
        className={`w-[5px] h-[5px] bg-yellow-300 rounded-full outline outline-1 outline-yellow-300 outline-opacity-40`}
      />
      <div className="justify-start text-sm font-normal font-['Outfit']">{text}</div>
    </div>
  );
};

export default Tag;
