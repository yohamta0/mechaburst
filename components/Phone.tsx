// A phone bezel around a 960×2080 game frame or the preview video.
export function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`phone ${className}`.trim()}>
      <div className="phone__screen">{children}</div>
    </div>
  );
}
