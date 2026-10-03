export const PageFallback = () => (
  <div
    className="min-h-[60vh] flex items-center justify-center"
    aria-busy="true"
  >
    <div className="w-10 h-10 border-4 border-neutral-900 border-t-transparent rounded-full animate-spin" />
  </div>
);
