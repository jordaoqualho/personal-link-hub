export function LoadingDots() {
  return (
    <div className="flex space-x-2">
      <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
      <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
      <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
    </div>
  );
}
