import { Link } from "@/hooks/useLinks";
import { FormEvent, useState } from "react";

interface LinkFormProps {
  onSubmit: (link: Omit<Link, "id" | "order">) => void;
  initialData?: Link;
  onCancel?: () => void;
  userId: string;
}

export const LinkForm = ({ onSubmit, initialData, onCancel, userId }: LinkFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [url, setUrl] = useState(initialData?.url || "");
  const [icon, setIcon] = useState(initialData?.icon || "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      url,
      icon,
      isVisible: true,
      userId,
    });
    if (!initialData) {
      setTitle("");
      setUrl("");
      setIcon("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-1.5">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          placeholder="Enter link title"
        />
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-200 mb-1.5">
          URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label htmlFor="icon" className="block text-sm font-medium text-gray-200 mb-1.5">
          Icon URL (optional)
        </label>
        <input
          type="url"
          id="icon"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          placeholder="https://example.com/icon.png"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors hover:bg-gray-700/50 rounded-xl"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
        >
          {initialData ? "Update" : "Add"} Link
        </button>
      </div>
    </form>
  );
};
