export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200/20"></div>
        <div className="w-12 h-12 rounded-full border-4 border-white border-t-transparent animate-spin absolute top-0"></div>
      </div>
      <div className="text-white/80 text-sm font-medium">Loading...</div>
    </div>
  );
}
