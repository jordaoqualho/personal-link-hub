import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  image: string;
}

export const useAuth = () => {
  const { data: session, status } = useSession();
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const userStr = localStorage.getItem("user");
    if (userStr) setUserState(JSON.parse(userStr));

    if (session?.user) {
      const userObj = {
        name: session.user.name!,
        email: session.user.email!,
        image: session.user.image!,
      };
      localStorage.setItem("user", JSON.stringify(userObj));
      setUserState(userObj);
    } else {
      localStorage.removeItem("user");
      setUserState(null);
    }
  }, [session]);

  const setUser = (user: User) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
      setUserState(user);
    }
  };

  return {
    user,
    setUser,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
};
