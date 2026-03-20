import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const facilities = [
  {
    name: "Finnish Sauna",
    description:
      "Traditional dry heat sauna reaching 85°C — ideal for deep muscle relaxation, improved circulation and post-workout recovery.",
    image: "/sauna.png",
  },
  {
    name: "Marble Steam Room",
    description:
      "A eucalyptus-infused steam room designed to open airways, soothe joints and promote deep relaxation.",
    image: "/luxury.png",
  },
  {
    name: "Hydro Pool",
    description:
      "Heated hydrotherapy pool with powerful jets targeting key muscle groups for active recovery.",
    image: "/luxury.png",
  },
  {
    name: "Ice Bath",
    description:
      "Cold water immersion at 4–8°C to reduce inflammation, accelerate recovery and build mental resilience.",
    image: "/sauna.png",
  },
];

const treatments = [
  {
    name: "Deep Tissue Massage",
    duration: "60 min",
    price: "£80",
    description: "Targeted deep tissue work to release chronic tension and aid recovery.",
  },
  {
    name: "Hot Stone Therapy",
    duration: "75 min",
    price: "£95",
    description: "Heated basalt stones combined with massage to melt away muscular tension.",
  },
  {
    name: "Recovery Facial",
    duration: "45 min",
    price: "£65",
    description: "Revitalising facial treatment using performance skincare products.",
  },
  {
    name: "Full Recovery Circuit",
    duration: "120 min",
    price: "£150",
    description: "Sauna, ice bath, steam room and massage — the complete recovery experience.",
  },
];

export default function RecoverySpa() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] flex items-end">
        <Image
          src="/massage.png"
          alt="Recovery Spa"
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
            Recovery Spa
          </h1>
          <p className="text-white/70 text-lg mt-4 max-w-xl">
            Relax, recover and restore. Our spa facilities are designed to complement your training and elevate your wellbeing.
          </p>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-xs font-medium tracking-widest text-white/70 mb-4">
            FACILITIES
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-16">
            Where recovery meets luxury.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((facility) => (
              <div
                key={facility.name}
                className="group relative rounded-xl overflow-hidden aspect-[4/3]"
              >
                <Image
                  src={facility.image}
                  alt={facility.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-medium mb-2">
                    {facility.name}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-xs font-medium tracking-widest text-white/70 mb-4">
            SPA TREATMENTS
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-16">
            Treatments for body and mind.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {treatments.map((treatment) => (
              <div
                key={treatment.name}
                className="border border-white/10 p-8 hover:border-white/30 transition-colors"
              >
                <h3 className="text-white text-xl font-medium mb-3">
                  {treatment.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {treatment.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-white/70">{treatment.duration}</span>
                  <span className="text-white/30">|</span>
                  <span className="text-white font-medium">{treatment.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
