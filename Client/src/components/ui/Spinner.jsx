import React from "react";

const Spinner = () => {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="rounded-[28px] border border-white/10 bg-white/5 px-8 py-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-md">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-dots loading-xl text-primary"></span>
          <p className="text-sm font-medium tracking-wide text-base-content/70">
            Opening chat...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
