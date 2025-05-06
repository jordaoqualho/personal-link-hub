import { GoogleButton } from "@/components/ui/GoogleButton";
import { Message as MessageType } from "@/hooks/useMessageManager";
import { RefObject } from "react";
import { Message } from "./Message";

interface ChatMessagesProps {
  messages: MessageType[];
  showLoginButton: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export const ChatMessages = ({ messages, showLoginButton, messagesEndRef }: ChatMessagesProps) => {
  return (
    <div className="scrollbar-hidden overflow-y-auto max-h-[calc(100vh-200px)] space-y-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {showLoginButton && <GoogleButton />}
      <div ref={messagesEndRef} />
    </div>
  );
};
