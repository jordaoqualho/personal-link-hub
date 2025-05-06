"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { GoogleButton } from "@/components/ui/GoogleButton";
import { LoadingDots } from "@/components/ui/LoadingDots";
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
        <div className="scrollbar-hidden overflow-y-auto max-h-[calc(100vh-200px)] space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex flex-col ${message.isUser ? "items-end" : "items-start"}`}>
              <span className={`text-xs mb-1 ${message.isUser ? "text-indigo-300" : "text-gray-400"}`}>
                {message.name}
              </span>
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
          ))}
          {showLoginButton && <GoogleButton />}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-transparent rounded-lg w-full">
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              showAdminButton ? "scale-100 opacity-100" : "scale-95 opacity-0 absolute"
            }`}
          >
            <button
              onClick={handleAdminClick}
              className="w-full h-[60px] bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-full transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] animate-pulse"
            >
              <span>Enter my link hub</span>
            </button>
          </div>
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              !showAdminButton ? "scale-100 opacity-100" : "scale-95 opacity-0 absolute"
            }`}
          >
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
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-indigo-600 hover:scale-[1.02] active:scale-[0.98]"
                }`}
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
