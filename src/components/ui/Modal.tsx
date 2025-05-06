import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-[600px] mx-4 shadow-2xl shadow-indigo-500/10 animate-slideIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700/50 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 from-indigo-500/10 to-purple-500/10 rounded-xl" />
          <div className="relative">{children}</div>
        </div>
      </div>
    </div>
  );
}
