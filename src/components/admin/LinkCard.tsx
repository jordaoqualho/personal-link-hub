import { Link } from "@/hooks/useLinks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

interface LinkCardProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string) => void;
}

export const LinkCard = ({ link, onEdit, onDelete, onToggleVisibility }: LinkCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: link.id,
    transition: {
      duration: 150,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 9999 : 0,
    position: "relative" as const,
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-gray-800/50 rounded-2xl p-4 shadow-lg border border-indigo-500/10 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      } select-none`}
    >
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div
            className="p-1 hover:bg-gray-700/50 rounded-xl cursor-grab active:cursor-grabbing flex-shrink-0"
            {...attributes}
            {...listeners}
          >
            <div className="grid grid-cols-2 gap-0.5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-gray-400" />
              ))}
            </div>
          </div>
          {link.icon && (
            <Image src={link.icon} alt={link.title} width={32} height={32} className="rounded-xl flex-shrink-0" />
          )}
          <div className="min-w-0 flex-1 flex flex-col justify-center">
            <h3 className="text-lg font-medium text-white truncate">{link.title}</h3>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-400 hover:text-indigo-300 mt-1 inline-block truncate"
            >
              {link.url}
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(link)}
                className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-700/50 rounded-xl"
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={link.isVisible}
                  onChange={() => onToggleVisibility(link.id)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <button
              onClick={() => onDelete(link.id)}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors hover:bg-gray-700/50 rounded-xl ml-auto"
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
