import { cn } from "../../utils/cn.js";
import React, { Children } from "react";

export function GridBackgroundDemo({ children }) {
  return (
    <div
      className='w-full bg-black text-white bg-grid-white/[0.2] relative'>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )} />
      {/* Radial gradient for the container to give a faded look */}
	  {children}
	  </div>
  );
}
