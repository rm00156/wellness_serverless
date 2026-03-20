import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const classes = [
  {
    name: "Reformer Pilates",
    image: "/yoga.png",
    description:
      "Build long, lean muscles and improve flexibility with our state-of-the-art reformer beds.",
  },
  {
    name: "Cycling",
    image: "/approach.png",
    description:
      "High-energy indoor cycling classes designed to push your limits and boost endurance.",
  },
  {
    name: "Strength Training",
    image: "/personal_training.png",
    description:
      "Expert-led strength sessions to build power, improve form and achieve your goals.",
  },
  {
    name: "Boxing",
    image: "/approach2.png",
    description:
      "Develop technique, speed and power with our world-class boxing programme.",
  },
];

export default function AllClassesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen pt-24">
      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-6 py-16">
        <p className="text-xs font-medium tracking-widest text-white/60 mb-4">
          ALL CLASSES
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl leading-tight">
          Intelligent, inspiring and led by the best instructors.
        </h1>
      </section>

      {/* Classes Grid */}
      <section className="max-w-[1440px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((cls) => (
            <div key={cls.name} className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={cls.image}
                  alt={cls.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl md:text-2xl font-medium mb-2">
                    {cls.name}
                  </h3>
                  <p className="text-white/70 text-sm">{cls.description}</p>
                </div>
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
