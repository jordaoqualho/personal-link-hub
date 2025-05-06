import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export interface User {
  name: string;
  email: string;
  image: string;
  username?: string;
}

export const useAuth = () => {
  const { data: session, status } = useSession();
  const [user, setUserState] = useState<User | null>(null);
  const [isSessionProcessed, setIsSessionProcessed] = useState(false);
  const isBrowser = typeof window !== "undefined";

  const setUser = (user: User) => {
    if (isBrowser) {
      localStorage.setItem("user", JSON.stringify(user));
      setUserState(user);
    }
  };

  useEffect(() => {
    if (!isBrowser) return;

    const handleStorageChange = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        setUserState(JSON.parse(userStr));
      }
    };

    handleStorageChange();

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isBrowser]);

  useEffect(() => {
    if (!isBrowser || status === "loading") {
      setIsSessionProcessed(false);
      return;
    }

    if (session?.user) {
      const userStr = localStorage.getItem("user");
      const existingUser = userStr ? JSON.parse(userStr) : {};

      const updatedUser = {
        name: session.user.name!,
        email: session.user.email!,
        image: session.user.image!,
        ...existingUser,
      };

      if (status === "authenticated") {
        setUser(updatedUser);
        setTimeout(() => {
          setIsSessionProcessed(true);
        }, 100);
      }
    } else {
      setIsSessionProcessed(true);
    }
  }, [session, status, isBrowser]);

  return {
    user,
    setUser,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    isSessionProcessed,
  };
};
