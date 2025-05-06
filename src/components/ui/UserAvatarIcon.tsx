import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

export function UserAvatarIcon() {
  const { user } = useAuth();

  const getInitials = (name?: string) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="absolute top-4 right-4">
      <div className="w-10 h-10 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 flex items-center justify-center overflow-hidden">
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name || "User avatar"}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-lg font-semibold text-white">{getInitials(user?.name)}</span>
        )}
      </div>
    </div>
  );
}
