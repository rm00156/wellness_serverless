import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const articles = [
  {
    title: "The Science of Cold Water Immersion",
    excerpt:
      "Why ice baths are more than a trend — the evidence behind cold exposure for recovery, inflammation and mental resilience.",
    category: "Recovery",
    date: "12 March 2026",
    image: "/sauna.png",
    slug: "#",
  },
  {
    title: "Fuelling for Performance: Pre & Post Workout Nutrition",
    excerpt:
      "What to eat and when — our nutrition team breaks down the fundamentals of training nutrition.",
    category: "Nutrition",
    date: "5 March 2026",
    image: "/nice.png",
    slug: "#",
  },
  {
    title: "5 Mobility Exercises Every Lifter Should Do",
    excerpt:
      "Improve your range of motion and reduce injury risk with these essential mobility drills from our physiotherapy team.",
    category: "Training",
    date: "27 February 2026",
    image: "/approach.png",
    slug: "#",
  },
  {
    title: "Understanding Heart Rate Zones",
    excerpt:
      "From Zone 2 to VO2 max — how to use heart rate training to optimise your cardiovascular fitness.",
    category: "Performance",
    date: "19 February 2026",
    image: "/approach2.png",
    slug: "#",
  },
  {
    title: "The Benefits of Reformer Pilates",
    excerpt:
      "Why reformer pilates is the perfect complement to strength training — building core stability, flexibility and body awareness.",
    category: "Mind & Body",
    date: "10 February 2026",
    image: "/yoga.png",
    slug: "#",
  },
  {
    title: "Sleep & Recovery: The Missing Piece",
    excerpt:
      "How sleep quality directly impacts your training gains — and practical tips to improve your sleep hygiene.",
    category: "Wellness",
    date: "1 February 2026",
    image: "/massage.png",
    slug: "#",
  },
];

export default function Journal() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-xs font-medium tracking-widest text-white/70 mb-4">
            WELLNESS
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl leading-tight">
            Journal
          </h1>
          <p className="text-white/70 text-lg mt-4 max-w-xl">
            Insights, advice and inspiration from our team of trainers, nutritionists and wellness experts.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="px-6 pb-16">
        <div className="max-w-[1440px] mx-auto">
          <Link href={articles[0].slug} className="group block">
            <div className="relative rounded-xl overflow-hidden aspect-[21/9]">
              <Image
                src={articles[0].image}
                alt={articles[0].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <span className="text-xs font-medium tracking-widest text-white/70 mb-3 block">
                  {articles[0].category} — {articles[0].date}
                </span>
                <h2 className="font-serif text-2xl md:text-4xl text-white mb-3 max-w-2xl">
                  {articles[0].title}
                </h2>
                <p className="text-white/60 max-w-xl">
                  {articles[0].excerpt}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-12 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((article) => (
              <Link
                key={article.title}
                href={article.slug}
                className="group block"
              >
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-4">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-xs font-medium tracking-widest text-white/50 mb-2 block">
                  {article.category} — {article.date}
                </span>
                <h3 className="text-white text-lg font-medium mb-2 group-hover:opacity-70 transition-opacity">
                  {article.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
