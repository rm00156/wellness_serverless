"use client";

import { useEffect } from "react";

interface JoinUsOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function JoinUsOverlay({ open, onClose }: JoinUsOverlayProps) {
  // Lock body scroll when overlay is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[520px] bg-white z-[70] transition-transform duration-300 ease-in-out overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-black/60 hover:text-black transition-colors"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4l12 12M4 16L16 4" />
          </svg>
        </button>

        {/* Content */}
        <div className="px-10 py-16 sm:py-20">
          <h2 className="font-serif text-5xl sm:text-6xl text-black mb-6">Join us</h2>

          <p className="text-black/70 text-sm mb-10">
            Don&apos;t want to wait for a call back?{" "}
            <a href="/explore-club#enquire" onClick={onClose} className="underline underline-offset-2 text-black">
              Book a tour
            </a>{" "}
            directly with one of our team.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            <div>
              <label className="block text-black/50 text-xs mb-2">Name*</label>
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full bg-transparent border-b border-black/20 pb-3 text-black text-base focus:outline-none focus:border-black transition-colors placeholder:text-black/40"
              />
            </div>

            <div>
              <label className="block text-black/50 text-xs mb-2">Email*</label>
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full bg-transparent border-b border-black/20 pb-3 text-black text-base focus:outline-none focus:border-black transition-colors placeholder:text-black/40"
              />
            </div>

            <div>
              <label className="block text-black/50 text-xs mb-2">Phone Number*</label>
              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full bg-transparent border-b border-black/20 pb-3 text-black text-base focus:outline-none focus:border-black transition-colors placeholder:text-black/40"
              />
            </div>

            <div>
              <label className="block text-black/50 text-xs mb-2">Club*</label>
              <div className="relative">
                <select
                  required
                  className="w-full bg-transparent border-b border-black/20 pb-3 text-black text-base focus:outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Please Select</option>
                  <option value="purley">Purley</option>
                </select>
                <svg
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 pointer-events-none"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-black/50 text-xs mb-2">
                Which other club are you interested in training at?
              </label>
              <div className="relative">
                <select className="w-full bg-transparent border-b border-black/20 pb-3 text-black text-base focus:outline-none focus:border-black transition-colors appearance-none cursor-pointer">
                  <option value="">Please Select</option>
                  <option value="purley">Purley</option>
                </select>
                <svg
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 pointer-events-none"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group pt-2">
              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 border border-black/30 bg-transparent rounded-sm accent-black flex-shrink-0"
              />
              <span className="text-black/60 text-sm group-hover:text-black/80 transition-colors">
                I agree to receive communications from Hylton Health Club.
              </span>
            </label>

            <button
              type="submit"
              className="mt-4 px-8 py-3 bg-black text-white text-xs font-medium tracking-widest hover:bg-black/80 transition-colors"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
