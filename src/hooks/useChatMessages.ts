"use client";

import { nameResponses, usernameResponses, welcomeResponses } from "@/utils/autoReplyResponses";
import { getAutoReply } from "@/utils/chatResponses";
import { getRandom } from "@/utils/helpers";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "./useAuth";

export interface Message {
  id: number;
  text: string;
  isUser: boolean;
  isLoading?: boolean;
  name: string;
}

export function useChatMessages() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showAdminButton, setShowAdminButton] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, setUser, isSessionProcessed } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    setPrompt("");
  };

  const sendAssistantMessage = async (text: string) => {
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
    inputRef.current?.focus();
  };

  const handleNextStep = async (nextStep?: "askName" | "askUsername") => {
    if (nextStep === "askName") {
      await sendAssistantMessage(getRandom(nameResponses.firstMessage));
    } else if (nextStep === "askUsername") {
      await sendAssistantMessage(getRandom(usernameResponses.firstMessage));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    sendUserMessage(prompt);
    setShowLoginButton(false);

    const { text, nextStep } = getAutoReply(prompt, setUser);
    await sendAssistantMessage(text);

    if (nextStep) {
      await handleNextStep(nextStep);
    }
  };

  const showWelcomeMessages = async () => {
    if (user?.name) {
      setShowLoginButton(false);
      await sendAssistantMessage(`Awesome! So your name is ${user.name}? Love it.`);

      if (user.email && user.name && !user.username) {
        return sendAssistantMessage(getRandom(usernameResponses.firstMessage));
      }

      if (user.email && user.name && user.username) {
        return sendAssistantMessage("Great! You're all set up. You can now enter your link hub!");
      }

      return sendAssistantMessage(getAutoReply("firstMessage", setUser).text);
    }

    for (let i = 0; i < welcomeResponses.length; i++) {
      const response = welcomeResponses[i];

      await sendAssistantMessage(response);

      if (i === welcomeResponses.length - 1) {
        setShowLoginButton(true);
      }
    }
  };

  useEffect(() => {
    const initializeChat = async () => {
      if (messages.length > 0 || !isSessionProcessed) return;

      const userStr = localStorage.getItem("user");
      const storedUser = userStr ? JSON.parse(userStr) : null;

      if (user && storedUser && user.email === storedUser.email) {
        if (!user.username) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        await showWelcomeMessages();
      } else if (!user && !storedUser) {
        await showWelcomeMessages();
      }
    };

    initializeChat();
  }, [user?.email, user?.name, user?.username, isSessionProcessed]);

  useEffect(() => {
    if (user?.email && user?.name && user?.username) {
      setShowAdminButton(true);
      setShowLoginButton(false);
    }
  }, [user]);

  return {
    prompt,
    setPrompt,
    messages,
    isLoading,
    inputRef,
    messagesEndRef,
    handleSubmit,
    showLoginButton,
    showAdminButton,
  };
}
