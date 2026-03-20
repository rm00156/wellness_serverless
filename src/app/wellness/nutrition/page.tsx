import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    name: "1-to-1 Nutrition Coaching",
    description:
      "Work with a dedicated nutrition coach to build a personalised plan aligned with your training goals, body composition targets and lifestyle.",
    duration: "60 min",
    price: "£95",
  },
  {
    name: "Body Composition Analysis",
    description:
      "Advanced DEXA-level body scanning to track lean mass, body fat percentage and hydration — providing data-driven insight for your nutrition strategy.",
    duration: "30 min",
    price: "£45",
  },
  {
    name: "Meal Plan Design",
    description:
      "A fully customised weekly meal plan with macro breakdowns, shopping lists and recipes tailored to your goals and dietary requirements.",
    duration: "Follow-up session",
    price: "£120",
  },
  {
    name: "Group Workshop",
    description:
      "Interactive nutrition workshops covering topics from gut health to performance fuelling. Open to all members.",
    duration: "90 min",
    price: "Complimentary",
  },
];

export default function Nutrition() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] flex items-end">
        <Image
          src="/nice.png"
          alt="Nutrition"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 pb-16">
          <p className="text-xs font-medium tracking-widest text-white/70 mb-4">
            WELLNESS
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl leading-tight">
            Nutrition
          </h1>
          <p className="text-white/70 text-lg mt-4 max-w-xl">
            Bespoke, expert nutrition guidance to help you achieve your goals — from body composition to performance fuelling.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-xs font-medium tracking-widest text-white/70 mb-4">
            OUR SERVICES
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-16">
            Personalised nutrition, backed by science.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.name}
                className="border border-white/10 p-8 hover:border-white/30 transition-colors"
              >
                <h3 className="text-white text-xl font-medium mb-3">
                  {service.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-white/70">{service.duration}</span>
                  <span className="text-white/30">|</span>
                  <span className="text-white font-medium">{service.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
            Start your nutrition journey.
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            Book an initial consultation with one of our expert nutritionists to get started.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
