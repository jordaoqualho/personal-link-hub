import { FormEvent, RefObject } from "react";

interface ChatInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
}

export const ChatInput = ({ prompt, setPrompt, handleSubmit, isLoading, inputRef }: ChatInputProps) => {
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        ref={inputRef}
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Write your message here"
        className="flex-1 p-5 px-8 rounded-full outline-none bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:ring-inset transition-all shadow-lg shadow-gray-800/20"
        disabled={isLoading}
      />
      <button
        type="submit"
        className={`bg-indigo-500 text-white p-2 px-6 rounded-full transition-all outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset flex items-center justify-center shadow-lg shadow-indigo-500/20 ${
          isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-600 hover:scale-[1.02] active:scale-[0.98]"
        }`}
        disabled={isLoading}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </button>
    </form>
  );
};
