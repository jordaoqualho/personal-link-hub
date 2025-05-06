"use client";

import { nameResponses, usernameResponses } from "@/utils/autoReplyResponses";
import { getAutoReply } from "@/utils/chatResponses";
import { getRandom } from "@/utils/helpers";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "./useAuth";
import { useDebouncedFocus } from "./useDebouncedFocus";
import { useMessageManager } from "./useMessageManager";
import { useWelcomeMessages } from "./useWelcomeMessages";

export function useChatMessages() {
  const [prompt, setPrompt] = useState("");
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showAdminButton, setShowAdminButton] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, setUser, isSessionProcessed } = useAuth();
  const { setElementRef, focusOnInput } = useDebouncedFocus();
  const { messages, isLoading, sendUserMessage, sendAssistantMessage } = useMessageManager(focusOnInput);
  const { showWelcomeMessages } = useWelcomeMessages(sendAssistantMessage, setShowLoginButton, user, setUser);

  useEffect(() => {
    setElementRef(inputRef.current);
  }, [setElementRef]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    setPrompt("");
    setShowLoginButton(false);

    const { text, nextStep } = getAutoReply(prompt, setUser);
    await sendAssistantMessage(text);

    if (nextStep) {
      await handleNextStep(nextStep);
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
