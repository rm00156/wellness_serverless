import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const trainers = [
  {
    name: "James Mitchell",
    specialty: "Strength & Conditioning",
    image: "/profile.png",
    bio: "Former professional athlete with 12 years of coaching experience. Specialises in building functional strength and athletic performance.",
  },
  {
    name: "Sophie Chen",
    specialty: "Reformer Pilates & Mobility",
    image: "/yoga.png",
    bio: "Certified Pilates instructor and movement specialist. Helps clients improve flexibility, posture and core strength.",
  },
  {
    name: "Marcus Williams",
    specialty: "Boxing & HIIT",
    image: "/approach2.png",
    bio: "Championship-level boxing coach bringing high-intensity training to every session. Expert in fat loss and cardiovascular conditioning.",
  },
  {
    name: "Elena Rodriguez",
    specialty: "Nutrition & Body Transformation",
    image: "/nice.png",
    bio: "Holistic trainer combining exercise science with nutritional expertise to deliver lasting body composition changes.",
  },
  {
    name: "David Okafor",
    specialty: "Performance & Endurance",
    image: "/personal_training.png",
    bio: "Endurance specialist who has trained marathon runners and triathletes. Focuses on building stamina and mental resilience.",
  },
  {
    name: "Amy Taylor",
    specialty: "Pre & Postnatal Fitness",
    image: "/luxury.png",
    bio: "Specialist in women's health and fitness, supporting clients through pregnancy and beyond with safe, effective training.",
  },
];

export default function FindATrainerPage() {
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen pt-24">
      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-6 py-16">
        <p className="text-xs font-medium tracking-widest text-white/60 mb-4">
          FIND A TRAINER
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl leading-tight">
          Meet the team behind your transformation.
        </h1>
        <p className="text-white/70 text-lg mt-6 max-w-2xl">
          Our elite trainers bring world-class expertise across every
          discipline. Find the perfect match for your goals.
        </p>
      </section>

      {/* Trainers Grid */}
      <section className="max-w-[1440px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <div
              key={trainer.name}
              className="group cursor-pointer bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-colors"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-medium tracking-widest text-white/50 mb-2">
                  {trainer.specialty.toUpperCase()}
                </p>
                <h3 className="text-white text-xl font-medium mb-3">
                  {trainer.name}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {trainer.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
      <Footer />
    </>
  );
}
