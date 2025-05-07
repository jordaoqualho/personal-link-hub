import { Link } from "@/hooks/useLinks";
import { validateIconUrl, validateTitle, validateUrl } from "@/lib/validations";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

interface LinkFormProps {
  onSubmit: (link: Omit<Link, "id" | "order">) => void;
  initialData?: Link;
  onCancel?: () => void;
  userId: string;
}

interface FormErrors {
  title?: string;
  url?: string;
  icon?: string;
}

export const LinkForm = ({ onSubmit, initialData, onCancel, userId }: LinkFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [url, setUrl] = useState(initialData?.url || "");
  const [icon, setIcon] = useState(initialData?.icon || "");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  useEffect(() => {
    setErrors({});
  }, [title, url, icon]);

  const validateIcon = async (iconUrl: string): Promise<boolean> => {
    if (!iconUrl) return true;

    const error = validateIconUrl(iconUrl);
    if (error) {
      setErrors((prev) => ({ ...prev, icon: error }));
      return false;
    }

    if (iconUrl.startsWith("data:image/")) {
      setIconPreview(iconUrl);
      return true;
    }

    try {
      const img = new HTMLImageElement();
      await new Promise((resolve, reject) => {
        img.onload = () => {
          setIconPreview(iconUrl);
          resolve(true);
        };
        img.onerror = () => {
          setErrors((prev) => ({
            ...prev,
            icon: "Could not load image. Please check the URL and try again.",
          }));
          reject(new Error("Invalid image URL"));
        };
        img.src = iconUrl;
      });
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors: FormErrors = {
      title: validateTitle(title),
      url: validateUrl(url),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setIsSubmitting(false);
      return;
    }

    const isIconValid = await validateIcon(icon);
    if (!isIconValid) {
      setIsSubmitting(false);
      return;
    }

    onSubmit({
      title: title.trim(),
      url: url.trim(),
      icon: icon.trim(),
      isVisible: true,
      userId,
    });

    if (!initialData) {
      setTitle("");
      setUrl("");
      setIcon("");
      setIconPreview(null);
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
          maxLength={50}
          className={`w-full px-4 py-2.5 bg-gray-800/50 border ${
            errors.title ? "border-red-500" : "border-gray-700"
          } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
          placeholder="Enter link title"
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
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
          className={`w-full px-4 py-2.5 bg-gray-800/50 border ${
            errors.url ? "border-red-500" : "border-gray-700"
          } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
          placeholder="https://example.com"
        />
        {errors.url && <p className="mt-1 text-sm text-red-500">{errors.url}</p>}
      </div>

      <div>
        <label htmlFor="icon" className="block text-sm font-medium text-gray-200 mb-1.5">
          Icon URL (optional)
        </label>
        <input
          type="url"
          id="icon"
          value={icon}
          onChange={(e) => {
            setIcon(e.target.value);
            setIconPreview(null);
          }}
          className={`w-full px-4 py-2.5 bg-gray-800/50 border ${
            errors.icon ? "border-red-500" : "border-gray-700"
          } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
          placeholder="https://example.com/icon.png or base64 image"
        />
        {errors.icon && <p className="mt-1 text-sm text-red-500">{errors.icon}</p>}
        {iconPreview && (
          <div className="mt-2 flex items-center gap-2">
            <Image src={iconPreview} alt="Icon preview" width={24} height={24} className="object-contain rounded" />
            <span className="text-xs text-gray-400">Image preview</span>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors hover:bg-gray-700/50 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : initialData ? "Update" : "Add"} Link
        </button>
      </div>
    </form>
  );
};
