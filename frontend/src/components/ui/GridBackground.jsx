import { cn } from "../../utils/cn.js";
import React from "react";

export function GridBackgroundDemo({ children }) {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      
      {/* GRID BACKGROUND */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none opacity-40", // ⭐ visible now
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]"
        )}
      />

      {/* DARK OVERLAY (makes grid subtle) */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* CONTENT LAYER */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}