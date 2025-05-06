import { User } from "@/hooks/useAuth";
import {
  emailResponses,
  inappropriateInputResponses,
  inappropriateWords,
  nameResponses,
  questionKeywords,
  questionRedirectResponses,
  usernameResponses,
  vagueInputResponses,
} from "./autoReplyResponses";
import { getRandom, validateEmail, validateName, validateUsername } from "./helpers";

export function getAutoReply(
  input: string,
  setUser: (user: User) => void
): { text: string; nextStep?: "askName" | "askUsername" } {
  const lower = input.toLowerCase();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (questionKeywords.some((k) => lower.includes(k))) {
    return { text: getRandom(questionRedirectResponses) };
  }

  if (inappropriateWords.some((word) => lower.includes(word))) {
    return { text: getRandom(inappropriateInputResponses) };
  }

  if (lower.trim() === "" || lower.length < 2) {
    return { text: getRandom(vagueInputResponses) };
  }

  if (!user?.email) {
    if (input === "firstMessage") {
      return { text: getRandom(emailResponses.firstMessage) };
    }

    if (validateEmail(input)) {
      const updatedUser = { ...user, email: input };
      setUser(updatedUser);
      return { text: getRandom(emailResponses.validationSuccess), nextStep: "askName" };
    }

    return { text: getRandom(emailResponses.validationError) };
  }

  if (!user?.name) {
    if (input === "firstMessage") {
      return { text: getRandom(nameResponses.firstMessage) };
    }

    if (validateName(input)) {
      const updatedUser = { ...user, name: input };
      setUser(updatedUser);
      return { text: getRandom(nameResponses.validationSuccess).replace("{name}", input), nextStep: "askUsername" };
    }

    return { text: getRandom(nameResponses.validationError) };
  }

  if (!user?.username) {
    if (input === "firstMessage") {
      return { text: getRandom(usernameResponses.firstMessage) };
    }

    if (validateUsername(input)) {
      const updatedUser = { ...user, username: input };
      setUser(updatedUser);
      return { text: getRandom(usernameResponses.validationSuccess) };
    } else {
      const validUsername = user.name.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();
      return { text: getRandom(usernameResponses.validationError).replace("{validUsername}", validUsername) };
    }
  }

  return { text: "Sem nada acabou" };
}
