interface AdminButtonProps {
  showAdminButton: boolean;
  onClick: () => void;
}

export const AdminButton = ({ showAdminButton, onClick }: AdminButtonProps) => {
  return (
    <div
      className={`transition-all duration-500 ease-in-out transform ${
        showAdminButton ? "scale-100 opacity-100" : "scale-95 opacity-0 absolute"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full h-[60px] bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-full transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] animate-pulse"
      >
        <span>Enter my link hub</span>
      </button>
    </div>
  );
};
