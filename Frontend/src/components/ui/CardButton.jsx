export default function CardButton({ title, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="min-h-[25vh] px-6 w-full max-w-xs flex flex-col items-center justify-center gap-3 bg-light shadow-md rounded-xl border border-gray-200 "
    >
      <div className="text-4xl">{icon}</div>
      <div className="text-lg font-semibold text-text-700">{title}</div>
    </button>
  );
}
