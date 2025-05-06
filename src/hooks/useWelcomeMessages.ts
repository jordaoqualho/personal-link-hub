import { usernameResponses, welcomeResponses } from "@/utils/autoReplyResponses";
import { getAutoReply } from "@/utils/chatResponses";
import { getRandom } from "@/utils/helpers";
import { User } from "./useAuth";

export const useWelcomeMessages = (
  sendAssistantMessage: (text: string) => Promise<void>,
  setShowLoginButton: (show: boolean) => void,
  user: User | null,
  setUser: (user: User) => void
) => {
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

  return {
    showWelcomeMessages,
  };
};
