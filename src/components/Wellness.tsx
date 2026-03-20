import Image from "next/image";

const services = [
  {
    name: "Nutrition",
    description: "Bespoke, expert nutrition guidance to help you achieve your goals.",
    image: "/nice.png",
  },
  {
    name: "Recovery Spa",
    description: "Relax, recover and restore with our spa facilities.",
    image: "/massage.png",
  },
  {
    name: "Sports Med",
    description: "Expert sports medicine to keep you performing at your best.",
    image: "/personal_training.png",
  },
  {
    name: "Recovery",
    description: "Advanced recovery treatments for peak performance.",
    image: "/sauna.png",
  },
];

export default function Wellness() {
  return (
    <section id="wellness" className="bg-black py-20 md:py-28 px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <p className="text-xs font-medium tracking-widest text-white/70 mb-4">
          WELLNESS
        </p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white max-w-3xl leading-tight mb-12">
          Beyond studio walls and the gym floor; all your needs under one roof.
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => (
            <div
              key={service.name}
              className="group cursor-pointer relative rounded-xl overflow-hidden"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Description overlay */}
                <div className="absolute top-4 left-4 right-4">
                  <p className="text-white/80 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4">
                  <h3 className="text-white text-lg font-medium">
                    {service.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
