"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import JoinUsOverlay from "@/components/JoinUsOverlay";

interface NavLink {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}

const navLinks: NavLink[] = [
  { label: "EXPLORE CLUB", href: "/explore-club" },
  { label: "MEMBERSHIP", href: "/membership" },
  {
    label: "CLASSES",
    href: "/classes",
    dropdown: [
      { label: "All Classes", href: "/classes" },
      { label: "Timetable", href: "/classes/timetable" },
      { label: "On Demand", href: "/classes/on-demand" },
    ],
  },
  {
    label: "PERSONAL TRAINING",
    href: "/personal-training",
    dropdown: [
      { label: "Find a Trainer", href: "/personal-training/find-a-trainer" },
      { label: "Personal Training", href: "/personal-training" },
      { label: "Performance Lab", href: "/personal-training/performance-lab" },
    ],
  },
  {
    label: "WELLNESS",
    href: "#wellness",
    dropdown: [
      { label: "Natural Fitness Food", href: "/wellness/natural-fitness-food" },
      { label: "Nutrition", href: "/wellness/nutrition" },
      { label: "Sports Med", href: "/wellness/sports-med" },
      { label: "Recovery Spa", href: "/wellness/recovery-spa" },
      { label: "Journal", href: "/wellness/journal" },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [joinUsOpen, setJoinUsOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/95 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex items-center justify-between px-6 py-4 max-w-[1440px]">
          {/* Mobile Menu Button (left on mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white text-xs font-medium tracking-widest hover:opacity-70 transition-opacity w-20"
            aria-label="Toggle menu"
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Hylton Health Club"
              width={160}
              height={40}
              className="h-8 w-auto brightness-0 invert"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={link.href}
                    className="text-white text-xs font-medium tracking-widest hover:opacity-70 transition-opacity"
                  >
                    {link.label} +
                  </Link>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-4 bg-black/95 backdrop-blur-sm border border-white/10 min-w-[200px]">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-6 py-4 text-white text-sm font-medium tracking-wider hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white text-xs font-medium tracking-widest hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop Join Us Button */}
          <button
            onClick={() => setJoinUsOpen(true)}
            className="hidden lg:block border border-white text-white text-xs font-medium tracking-widest px-6 py-2.5 rounded-full hover:bg-white hover:text-black transition-colors"
          >
            JOIN US
          </button>

          {/* Mobile Join Us Button (right on mobile) */}
          <button
            onClick={() => {
              setMenuOpen(false);
              setJoinUsOpen(true);
            }}
            className="lg:hidden border border-white text-white text-xs font-medium tracking-widest px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors w-20 text-center"
          >
            JOIN US
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/60 z-[998] transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Side Drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-[75vw] max-w-[380px] bg-black z-[999] flex flex-col transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end px-6 pt-5">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white hover:opacity-70 transition-opacity"
            aria-label="Close menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex flex-col px-6 pt-6 gap-0 flex-1 overflow-y-auto">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label}>
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === link.label ? null : link.label
                    )
                  }
                  className="w-full flex items-center justify-between py-4 text-white text-sm font-medium tracking-[0.2em] hover:opacity-70 transition-opacity"
                >
                  <span>{link.label}</span>
                  <span className="text-white text-lg leading-none">
                    {openDropdown === link.label ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openDropdown === link.label ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="flex flex-col pb-2">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          setMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                        className="py-2.5 pl-4 text-white/50 text-xs font-medium tracking-[0.2em] hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-4 text-white text-sm font-medium tracking-[0.2em] hover:opacity-70 transition-opacity"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Social Icons */}
        <div className="flex items-center gap-5 px-6 py-8">
          <a href="#" className="text-white/50 hover:text-white transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a href="#" className="text-white/50 hover:text-white transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </a>
          <a href="#" className="text-white/50 hover:text-white transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a href="#" className="text-white/50 hover:text-white transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
            </svg>
          </a>
          <a href="#" className="text-white/50 hover:text-white transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="#" className="text-white/50 hover:text-white transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
            </svg>
          </a>
          <a href="#" className="text-white/50 hover:text-white transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>
        </div>
      </div>

      <JoinUsOverlay open={joinUsOpen} onClose={() => setJoinUsOpen(false)} />
    </>
  );
}
