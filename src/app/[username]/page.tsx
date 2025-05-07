"use client";

import { useLinks } from "@/hooks/useLinks";
import { getThemeColors, getThemeGradient } from "@/lib/themes";
import { use, useEffect, useState } from "react";

interface PublicUser {
  name: string;
  email: string;
  image: string;
  username?: string;
  bio?: string;
  theme?: string;
}

export default function PublicPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params);
  const { links } = useLinks();
  const [publicUser, setPublicUser] = useState<PublicUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          if (userData.username === resolvedParams.username) {
            setPublicUser(userData);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [resolvedParams.username]);

  const visibleLinks = links.filter((link) => link.isVisible);
  const theme = publicUser?.theme || "default";
  const gradient = getThemeGradient(theme);
  const colors = getThemeColors(theme);

  if (isLoading) {
    return (
      <div className={`min-h-screen ${gradient}`}>
        <div className="w-full max-w-[600px] px-4 flex flex-col gap-4 mb-5 h-full justify-end pt-28 mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-800/50 rounded-lg w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-800/50 rounded-lg w-1/2 mx-auto"></div>
            <div className="space-y-4 mt-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-800/50 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!publicUser) {
    return (
      <div className={`min-h-screen ${gradient}`}>
        <div className="w-full max-w-[600px] px-4 flex flex-col gap-4 mb-5 h-full justify-end pt-28 mx-auto">
          <div className="text-center">
            <h1 className={`text-3xl font-bold text-white mb-2 ${colors.textColor}`}>User Not Found</h1>
            <p className={colors.textColor}>The requested user does not exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${gradient}`}>
      <div className="w-full max-w-[500px] px-4 flex flex-col gap-4 mb-5 h-full justify-end pt-28 mx-auto">
        <div className="text-center mb-4">
          <h1 className={`text-3xl font-bold mb-2 ${colors.textColor}`}>{publicUser.name}</h1>
        </div>

        <div className="space-y-4">
          {visibleLinks.length === 0 ? (
            <p className={`${colors.textColor} text-center py-8`}>No links available.</p>
          ) : (
            visibleLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block ${colors.buttonBg} ${colors.buttonHover} rounded-full p-4 px-8 transition-colors`}
              >
                <div className="flex items-center relative">
                  {link.icon && (
                    <div className="absolute left-0">
                      <img src={link.icon} alt={link.title} className="w-8 h-8 rounded flex-shrink-0" />
                    </div>
                  )}
                  <h3 className={`text-lg font-medium ${colors.textColor} w-full text-center`}>{link.title}</h3>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
