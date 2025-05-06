import { useState } from "react";

export interface Message {
  id: number;
  text: string;
  isUser: boolean;
  isLoading?: boolean;
  name: string;
}

export const useMessageManager = (focusOnInput: () => void) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadingMessage: Message = {
    id: -1,
    text: "",
    isUser: false,
    isLoading: true,
    name: "Assistant",
  };

  const appendMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const replaceLoadingWith = (message: Message) => {
    setMessages((prev) => {
      const filtered = prev.filter((m) => !m.isLoading);
      return [...filtered, message];
    });
  };

  const sendUserMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isUser: true,
      name: "You",
    };

    appendMessage(userMessage);
    return userMessage;
  };

  const sendAssistantMessage = async (text: string): Promise<void> => {
    setIsLoading(true);
    appendMessage(loadingMessage);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const botMessage: Message = {
      id: Date.now() + 1,
      text,
      isUser: false,
      name: "Assistant",
    };

    replaceLoadingWith(botMessage);
    setIsLoading(false);
    focusOnInput();
  };

  return {
    messages,
    isLoading,
    sendUserMessage,
    sendAssistantMessage,
  };
};
