"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tabs = ["Overview", "Club Facilities", "Enquire"];

const facilities = [
  {
    name: "Train",
    description:
      "A dedicated HIIT studio, sled track with custom-built rig and free weights area to push your limits.",
    image: "/approach.png",
  },
  {
    name: "Mind & Body",
    description:
      "Hot yoga and pilates in a sculptural studio with natural wood finishes and customised lighting.",
    image: "/yoga.png",
  },
  {
    name: "Swim",
    description:
      "A performance pool bathed in natural light — an urban sanctuary for lap swimming and aqua classes.",
    image: "/luxury.png",
  },
  {
    name: "Relax",
    description:
      "Unwind with our hydro pool, Finnish sauna and marble steam room after every session.",
    image: "/sauna.png",
  },
  {
    name: "Recovery",
    description:
      "Advanced recovery treatments including sports massage, cryotherapy and physiotherapy.",
    image: "/massage.png",
  },
  {
    name: "Cycle",
    description:
      "A tiered cycle studio with surround sound and dynamic lighting for an immersive ride.",
    image: "/approach2.png",
  },
  {
    name: "Changing rooms",
    description:
      "Upscale changing facilities with fluffy towels, complimentary skincare products and grooming essentials.",
    image: "/nice.png",
  },
];

const heroImages = [
  { src: "/luxury.png", caption: "A performance pool bathed in natural light — an urban sanctuary for wellness." },
  { src: "/approach.png", caption: "State-of-the-art training equipment across dedicated workout zones." },
  { src: "/yoga.png", caption: "Sculptural studios with natural finishes for mind and body practice." },
  { src: "/sauna.png", caption: "Wrap around the undulating walls, with rope lighting leading the way to 28,000 sq ft of training and recuperation spaces." },
];

export default function ExploreClub() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [expandedFacility, setExpandedFacility] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToSection = (tab: string) => {
    const sectionId = tab.toLowerCase().replace(/ /g, "-");
    const el = sectionRefs.current[sectionId];
    if (el) {
      setIsScrolling(true);
      setActiveTab(tab);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setIsScrolling(false), 800);
    }
  };

  // Update active tab on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;
      const offset = 120;
      for (const tab of [...tabs].reverse()) {
        const sectionId = tab.toLowerCase().replace(/ /g, "-");
        const el = sectionRefs.current[sectionId];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            setActiveTab(tab);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  const setSectionRef = (sectionId: string) => (el: HTMLElement | null) => {
    sectionRefs.current[sectionId] = el;
  };

  return (
    <>
      <Navbar />
      <main className="bg-black text-white">
        {/* Hero - Club Name */}
        <section className="pt-28 md:pt-36 pb-4 px-6">
          <div className="max-w-[1440px] mx-auto text-center">
            <p className="text-sm font-medium tracking-[0.3em] text-white/60 mb-2">CR8</p>
            <h1 className="font-serif text-7xl md:text-8xl lg:text-[10rem] text-white leading-none">
              Purley
            </h1>
          </div>
        </section>

        {/* Sticky Tab Navigation */}
        <nav className="sticky top-[64px] z-40 bg-black/95 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-[1440px] mx-auto px-6 flex items-center gap-1 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => scrollToSection(tab)}
                className={`px-5 py-4 text-xs font-medium tracking-widest whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "text-white border-b-2 border-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </nav>

        {/* ─── OVERVIEW SECTION ─── */}
        <section
          ref={setSectionRef("overview")}
          id="overview"
          className="scroll-mt-[120px]"
        >
          {/* Image Carousel */}
          <div className="relative w-full aspect-[16/7] overflow-hidden">
            {heroImages.map((img, i) => (
              <div
                key={img.src}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <p className="absolute bottom-6 left-6 right-6 text-white/80 text-sm md:text-base max-w-lg">
                  {img.caption}
                </p>
              </div>
            ))}

            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl z-10"
              aria-label="Previous slide"
            >
              &#8249;
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl z-10"
              aria-label="Next slide"
            >
              &#8250;
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 right-6 flex gap-2 z-10">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-8 h-0.5 transition-colors ${
                    i === currentSlide ? "bg-white" : "bg-white/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="max-w-[1440px] mx-auto px-6 py-16 md:py-24">
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-white/90 leading-snug max-w-4xl">
              High-spec fitness in a welcoming environment, Hylton Health Club Purley
              offers state-of-the-art equipment across 12,000 sq ft of training
              and recuperation zones, including pool and spa.
            </p>
          </div>

          {/* Info Bar */}
          <div className="border-t border-white/10">
            <div className="max-w-[1440px] mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <p className="text-xs font-medium tracking-widest text-white/50 mb-3">FIND US</p>
                <p className="text-white/90 text-sm leading-relaxed">
                  Coleridge Taylor Court,<br />
                  Purley<br />
                  CR8
                </p>
              </div>
              <div>
                <p className="text-xs font-medium tracking-widest text-white/50 mb-3">CLUB HOURS</p>
                <div className="text-white/90 text-sm leading-relaxed space-y-1">
                  <p>Monday – Friday 05:30 – 22:00</p>
                  <p>Saturday – Sunday 07:00 – 21:00</p>
                  <p>Bank holidays – 07:00 – 20:00</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium tracking-widest text-white/50 mb-3">CONTACT</p>
                <a href="tel:02012345678" className="text-white/90 text-sm underline underline-offset-2">
                  020 1234 5678
                </a>
              </div>
              <div>
                <p className="text-xs font-medium tracking-widest text-white/50 mb-3">GENERAL MANAGER</p>
                <p className="text-white/90 text-sm">Hylton Health Club</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CLUB FACILITIES SECTION ─── */}
        <section
          ref={setSectionRef("club-facilities")}
          id="club-facilities"
          className="scroll-mt-[120px] border-t border-white/10"
        >
          <div className="max-w-[1440px] mx-auto px-6 py-16 md:py-24">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              {/* Accordion */}
              <div className="lg:w-1/2">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-12">
                  Club Facilities
                </h2>

                <div className="divide-y divide-white/15">
                  {facilities.map((facility) => (
                    <div key={facility.name}>
                      <button
                        onClick={() =>
                          setExpandedFacility(
                            expandedFacility === facility.name ? null : facility.name
                          )
                        }
                        className="w-full flex items-center justify-between py-5 group"
                      >
                        <span className="text-white text-lg md:text-xl font-light">
                          {facility.name}
                        </span>
                        <span
                          className={`w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white/60 group-hover:border-white group-hover:text-white transition-all ${
                            expandedFacility === facility.name ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          expandedFacility === facility.name
                            ? "max-h-40 opacity-100 pb-5"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-white/60 text-sm leading-relaxed max-w-md">
                          {facility.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Facility Image */}
              <div className="lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden sticky top-[140px]">
                  <Image
                    src={
                      expandedFacility
                        ? facilities.find((f) => f.name === expandedFacility)?.image ??
                          "/approach.png"
                        : "/approach.png"
                    }
                    alt="Club facility"
                    fill
                    className="object-cover transition-opacity duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ENQUIRE SECTION ─── */}
        <section
          ref={setSectionRef("enquire")}
          id="enquire"
          className="scroll-mt-[120px] border-t border-white/10"
        >
          <div className="max-w-[1440px] mx-auto px-6 py-16 md:py-24">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              {/* Form */}
              <div className="lg:w-1/2">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-12">
                  Enquire today
                </h2>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-8 max-w-md"
                >
                  <div>
                    <label className="block text-white/50 text-sm mb-2">Name*</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white text-base focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 text-sm mb-2">Email*</label>
                    <input
                      type="email"
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white text-base focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 text-sm mb-2">Phone Number*</label>
                    <input
                      type="tel"
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white text-base focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 text-sm mb-2">
                      Which club are you interested in training at?
                    </label>
                    <select className="w-full bg-transparent border-b border-white/20 pb-3 text-white text-base focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer">
                      <option value="" className="bg-black">Please Select</option>
                      <option value="purley" className="bg-black">Purley</option>
                    </select>
                  </div>

                  <div className="space-y-4 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border border-white/30 bg-transparent rounded-sm accent-white"
                      />
                      <span className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                        Are you interested in Personal Training?
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border border-white/30 bg-transparent rounded-sm accent-white"
                      />
                      <span className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                        I agree to receive communications from Hylton Health Club.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="mt-4 px-8 py-3 border border-white text-white text-xs font-medium tracking-widest hover:bg-white hover:text-black transition-colors"
                  >
                    SEND
                  </button>
                </form>
              </div>

              {/* Enquire Image */}
              <div className="lg:w-1/2">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                  <Image
                    src="/yoga.png"
                    alt="Wellness and training"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
