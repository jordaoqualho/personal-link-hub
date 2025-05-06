"use client";

import { AdminButton } from "@/components/chat/AdminButton";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { UserAvatarIcon } from "@/components/ui/UserAvatarIcon";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const {
    prompt,
    setPrompt,
    messages,
    isLoading,
    inputRef,
    messagesEndRef,
    handleSubmit,
    showLoginButton,
    showAdminButton,
  } = useChatMessages();

  const handleAdminClick = () => {
    router.push("/admin");
  };

  return (
    <div className="flex flex-col items-center justify-end h-screen bg-gradient-to-b from-gray-900 to-black">
      <Header />
      <UserAvatarIcon />

      <div className="w-full max-w-[600px] px-4 flex flex-col gap-4 mb-5 h-full justify-end">
        <ChatMessages messages={messages} showLoginButton={showLoginButton} messagesEndRef={messagesEndRef} />

        <div className="bg-transparent rounded-lg w-full">
          <AdminButton showAdminButton={showAdminButton} onClick={handleAdminClick} />
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              !showAdminButton ? "scale-100 opacity-100" : "scale-95 opacity-0 absolute"
            }`}
          >
            <ChatInput
              prompt={prompt}
              setPrompt={setPrompt}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              inputRef={inputRef}
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
