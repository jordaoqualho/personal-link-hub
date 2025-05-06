import { useEffect, useState } from "react";

export interface Link {
  id: string;
  title: string;
  url: string;
  icon?: string;
  order: number;
  isVisible: boolean;
  userId: string;
}

export const useLinks = (userId?: string) => {
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    const storedLinks = localStorage.getItem("links");
    if (storedLinks) {
      const parsedLinks = JSON.parse(storedLinks);
      if (userId) {
        setLinks(parsedLinks.filter((link: Link) => link.userId === userId));
      } else {
        setLinks(parsedLinks);
      }
    }
  }, [userId]);

  const addLink = (linkData: Omit<Link, "id" | "order" | "userId">) => {
    const newLink: Link = {
      ...linkData,
      id: crypto.randomUUID(),
      order: links.length,
      userId: userId || "current-user",
    };

    const updatedLinks = [...links, newLink];
    setLinks(updatedLinks);
    localStorage.setItem("links", JSON.stringify(updatedLinks));
  };

  const updateLink = (id: string, linkData: Partial<Omit<Link, "id" | "order" | "userId">>) => {
    const updatedLinks = links.map((link) => (link.id === id ? { ...link, ...linkData } : link));
    setLinks(updatedLinks);
    localStorage.setItem("links", JSON.stringify(updatedLinks));
  };

  const deleteLink = (id: string) => {
    const updatedLinks = links.filter((link) => link.id !== id);
    const reorderedLinks = updatedLinks.map((link, index) => ({
      ...link,
      order: index,
    }));
    setLinks(reorderedLinks);
    localStorage.setItem("links", JSON.stringify(reorderedLinks));
  };

  const reorderLinks = (newOrder: Link[]) => {
    const reorderedLinks = newOrder.map((link, index) => ({
      ...link,
      order: index,
    }));
    setLinks(reorderedLinks);
    localStorage.setItem("links", JSON.stringify(reorderedLinks));
  };

  const toggleVisibility = (id: string) => {
    const updatedLinks = links.map((link) => (link.id === id ? { ...link, isVisible: !link.isVisible } : link));
    setLinks(updatedLinks);
    localStorage.setItem("links", JSON.stringify(updatedLinks));
  };

  return {
    links: links.sort((a, b) => a.order - b.order),
    addLink,
    updateLink,
    deleteLink,
    reorderLinks,
    toggleVisibility,
  };
};
