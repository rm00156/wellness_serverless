import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    name: "1-to-1 Training",
    image: "/personal_training.png",
    description:
      "Bespoke training programmes tailored to your goals, delivered by elite personal trainers.",
  },
  {
    name: "Small Group Training",
    image: "/approach.png",
    description:
      "Train alongside a select group for motivation and accountability, with expert guidance throughout.",
  },
  {
    name: "Online Coaching",
    image: "/approach2.png",
    description:
      "Flexible coaching programmes designed around your schedule, with full trainer support remotely.",
  },
];

export default function PersonalTrainingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen pt-24">
      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-6 py-16">
        <p className="text-xs font-medium tracking-widest text-white/60 mb-4">
          PERSONAL TRAINING
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl leading-tight">
          Achieve more with London&apos;s finest personal trainers.
        </h1>
        <p className="text-white/70 text-lg mt-6 max-w-2xl">
          Our personal trainers are among the most qualified in the industry.
          Whether your goal is fat loss, muscle gain, or athletic performance,
          we&apos;ll match you with the right expert.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-[1440px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.name} className="group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-medium mb-2">
                    {service.name}
                  </h3>
                  <p className="text-white/70 text-sm">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1440px] mx-auto px-6 pb-24">
        <div className="bg-white/5 border border-white/10 rounded-lg p-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Ready to start your journey?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Book a complimentary consultation with one of our personal trainers
            and discover what&apos;s possible.
          </p>
          <Link
            href="/personal-training/find-a-trainer"
            className="inline-block border border-white text-white text-xs font-medium tracking-widest px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors"
          >
            FIND A TRAINER
          </Link>
        </div>
      </section>
    </main>
      <Footer />
    </>
  );
}
