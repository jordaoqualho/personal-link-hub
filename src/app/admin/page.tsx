"use client";

import { LinkCard } from "@/components/admin/LinkCard";
import { LinkForm } from "@/components/admin/LinkForm";
import { ThemeSelector } from "@/components/admin/ThemeSelector";
import { Header } from "@/components/layout/Header";
import { Modal } from "@/components/ui/Modal";
import { UserAvatarIcon } from "@/components/ui/UserAvatarIcon";
import { useAuth } from "@/hooks/useAuth";
import { Link as LinkType, useLinks } from "@/hooks/useLinks";
import { useTheme } from "@/hooks/useTheme";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { user, isSessionProcessed } = useAuth();
  const router = useRouter();
  const { links, addLink, updateLink, deleteLink, reorderLinks, toggleVisibility } = useLinks();
  const [editingLink, setEditingLink] = useState<LinkType | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const { currentTheme, updateTheme } = useTheme();

  useEffect(() => {
    if (isSessionProcessed && !user) {
      router.push("/");
    }
  }, [isSessionProcessed, router, user]);

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = links.findIndex((link) => link.id === active.id);
      const newIndex = links.findIndex((link) => link.id === over.id);
      const newOrder = [...links];
      const [movedItem] = newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, movedItem);
      reorderLinks(newOrder);
    }
  };

  const handleSubmit = (linkData: Omit<LinkType, "id" | "order">) => {
    if (editingLink) {
      updateLink(editingLink.id, linkData);
    } else {
      addLink(linkData);
    }
    setIsModalOpen(false);
    setEditingLink(undefined);
  };

  const handleEdit = (link: LinkType) => {
    setEditingLink(link);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLink(undefined);
  };

  const handleDelete = (id: string) => {
    deleteLink(id);
  };

  const handleThemeChange = (theme: string) => {
    updateTheme(theme);
    setIsThemeModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Header />
      <UserAvatarIcon />

      <div className="w-full max-w-[600px] px-4 flex flex-col gap-4 mb-5 h-full justify-end pt-20 mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-white mb-2">{user?.name || "My Links"}</h1>
          <p className="text-gray-300">Drag and drop to reorder your links</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsThemeModalOpen(true)}
            className="flex-1 p-4 rounded-2xl bg-gray-800 hover:bg-gray-700 transition-colors text-white text-center shadow-lg flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
              />
            </svg>
            Choose Theme
          </button>
          <Link
            href={`/${user?.username || ""}`}
            target="_blank"
            className="flex-1 p-4 rounded-2xl bg-gray-800 hover:bg-gray-700 transition-colors text-white text-center shadow-lg flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
            View Page
          </Link>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full p-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-colors text-white text-center shadow-lg shadow-indigo-500/20"
        >
          Add New Link
        </button>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={links.map((link) => link.id)}>
            <div className="space-y-4 relative">
              {links.length === 0 ? (
                <p className="text-gray-300 text-center py-8">No links yet. Add your first link below!</p>
              ) : (
                links.map((link) => (
                  <div key={link.id} className="w-full">
                    <LinkCard
                      link={link}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onToggleVisibility={toggleVisibility}
                    />
                  </div>
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingLink ? "Edit Link" : "Add New Link"}>
          <LinkForm
            onSubmit={handleSubmit}
            initialData={editingLink}
            onCancel={handleCloseModal}
            userId={user?.email || "current-user"}
          />
        </Modal>

        <Modal isOpen={isThemeModalOpen} onClose={() => setIsThemeModalOpen(false)} title="Choose Theme">
          <div className="p-4">
            <ThemeSelector currentTheme={currentTheme} onThemeChange={handleThemeChange} />
          </div>
        </Modal>
      </div>
    </div>
  );
}
