"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const benefits = [
  {
    title: "World-class facilities",
    description:
      "Multi-disciplinary spaces including HIIT studio, free weights, yoga and pilates studios, and a performance pool.",
    image: "/approach.png",
    cta: "Find your space",
  },
  {
    title: "Unlimited classes",
    description:
      "Over 50 weekly classes across disciplines — from reformer pilates and cycling to boxing and strength training.",
    image: "/yoga.png",
    cta: "Take your spot",
  },
  {
    title: "Elite personal training",
    description:
      "Tailored coaching with certified trainers who specialise in strength, rehabilitation, and athletic development.",
    image: "/personal_training.png",
    cta: "Meet our trainers",
  },
  {
    title: "Recovery & wellness",
    description:
      "Finnish sauna, marble steam room, hydro pool, sports massage, and advanced recovery treatments.",
    image: "/sauna.png",
    cta: "Explore wellness",
  },
  {
    title: "Premium amenities",
    description:
      "Luxury changing rooms with fluffy towels, complimentary skincare products, and grooming essentials.",
    image: "/nice.png",
    cta: "See amenities",
  },
  {
    title: "In the club. At home.",
    description:
      "On-demand access to workouts, training plans, and class bookings through our member app.",
    image: "/approach2.png",
    cta: "Get access",
  },
];

const amenities = [
  { name: "Luxury Changing Rooms", description: "Complimentary skincare products and grooming essentials", image: "/nice.png" },
  { name: "Finnish Sauna", description: "Traditional dry heat sauna for post-workout recovery", image: "/sauna.png" },
  { name: "Steam Room", description: "Marble steam room to relax muscles and clear the mind", image: "/luxury.png" },
  { name: "Recovery Suite", description: "Sports massage, physiotherapy, and advanced recovery tools", image: "/massage.png" },
  { name: "Performance Pool", description: "Lap swimming and aqua classes in a light-filled space", image: "/luxury.png" },
  { name: "Cycle Studio", description: "Immersive rides with surround sound and dynamic lighting", image: "/approach2.png" },
  { name: "Café & Lounge", description: "Nutritious food and drinks to refuel after every session", image: "/approach.png" },
  { name: "Member Events", description: "Exclusive community events, workshops, and social gatherings", image: "/yoga.png" },
];

const faqs = [
  {
    question: "Can I freeze my membership?",
    answer:
      "Yes. You can freeze your membership for up to 3 months per year for a reduced fee of £30/month. Please give us at least 7 days' notice before your next billing date.",
  },
  {
    question: "Can I bring a guest?",
    answer:
      "Members can purchase day passes for guests at a discounted rate. Guest passes are valid for 12 months.",
  },
  {
    question: "How do I book classes?",
    answer:
      "Classes can be booked through our member app or at reception. We ask for at least 3 hours' notice for cancellations to free up spots for other members.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "We require one full calendar month's notice to cancel your membership. You can submit your cancellation request through the member app or at reception.",
  },
  {
    question: "Is there a minimum contract?",
    answer:
      "Our standard memberships run on a rolling monthly basis with no minimum term. We also offer discounted 12-month commitments for those who prefer a fixed rate.",
  },
  {
    question: "What are the opening hours?",
    answer:
      "Monday to Friday: 05:30 – 22:00. Saturday and Sunday: 07:00 – 21:00. Hours may vary by location and on bank holidays.",
  },
];

export default function MembershipPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main className="bg-black text-white">
        {/* Hero */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center">
          <Image
            src="/hero.jpg"
            alt="Hylton Health Club membership"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6">
              Be part of something{" "}
              <span className="italic">bigger</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-10">
              Experience unparalleled training as a member of Hylton Health Club.
            </p>
            <Link
              href="#enquire"
              className="inline-block bg-white text-black text-xs font-medium tracking-widest px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors"
            >
              ENQUIRE NOW
            </Link>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16 md:mb-24">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                Why join Hylton
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                More than a gym — a complete approach to health, fitness, and wellbeing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5">
                    <Image
                      src={benefit.image}
                      alt={benefit.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                  <h3 className="text-white text-xl font-medium mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-3">
                    {benefit.description}
                  </p>
                  <span className="text-white text-xs font-medium tracking-widest group-hover:underline underline-offset-4">
                    {benefit.cta.toUpperCase()} &rarr;
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className="bg-cream py-20 md:py-32 px-6">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-6xl text-black mb-6">
                Club amenities
              </h2>
              <p className="text-black/50 text-lg max-w-2xl mx-auto">
                Every detail designed for your comfort, recovery, and enjoyment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {amenities.map((amenity) => (
                <div
                  key={amenity.name}
                  className="group"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                    <Image
                      src={amenity.image}
                      alt={amenity.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-black text-base font-medium mb-1">
                    {amenity.name}
                  </h3>
                  <p className="text-black/50 text-sm">
                    {amenity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enquire */}
        <section id="enquire" className="py-20 md:py-32 px-6">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              <div className="lg:w-1/2">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                  Enquire about membership
                </h2>
                <p className="text-white/60 text-lg mb-12 max-w-md">
                  Interested in joining? Fill in the form and a member of our team will be in touch to discuss membership options.
                </p>

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

        {/* FAQ */}
        <section className="py-20 md:py-32 px-6 border-t border-white/10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-white text-center mb-16">
              Frequently asked questions
            </h2>

            <div className="divide-y divide-white/10">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-6 text-left"
                  >
                    <span className="text-white text-base md:text-lg font-medium pr-8">
                      {faq.question}
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className={`flex-shrink-0 text-white/60 transition-transform duration-300 ${
                        openFaq === i ? "rotate-45" : ""
                      }`}
                    >
                      <path
                        d="M10 4v12M4 10h12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === i ? "max-h-48 pb-6" : "max-h-0"
                    }`}
                  >
                    <p className="text-white/50 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-[1440px] mx-auto">
            <div className="relative rounded-xl overflow-hidden min-h-[400px] md:min-h-[520px]">
              <Image
                src="/yoga.png"
                alt="Book a tour"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[400px] md:min-h-[520px] text-center px-4">
                <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-4">
                  Come and see for yourself
                </h2>
                <p className="text-white/70 text-lg mb-8 max-w-lg">
                  Book a tour and experience what makes Hylton different.
                </p>
                <Link
                  href="/explore-club"
                  className="bg-white text-black text-xs font-medium tracking-widest px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors"
                >
                  BOOK A TOUR
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
