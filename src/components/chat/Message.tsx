import { LoadingDots } from "@/components/ui/LoadingDots";
import { Message as MessageType } from "@/hooks/useMessageManager";

interface MessageProps {
  message: MessageType;
}

export const Message = ({ message }: MessageProps) => {
  return (
    <div className={`flex flex-col ${message.isUser ? "items-end" : "items-start"}`}>
      <span className={`text-xs mb-1 ${message.isUser ? "text-indigo-300" : "text-gray-400"}`}>{message.name}</span>
      <div
        className={`max-w-[85%] sm:max-w-[70%] p-4 px-8 ${
          message.isUser
            ? "bg-indigo-500 text-white rounded-full rounded-tr-none shadow-lg shadow-indigo-500/20"
            : "bg-gray-800/50 backdrop-blur-sm text-white rounded-full rounded-tl-none shadow-lg shadow-gray-800/20"
        }`}
      >
        {message.isLoading ? <LoadingDots /> : <p className="text-sm break-words">{message.text}</p>}
      </div>
    </div>
  );
};
