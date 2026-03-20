import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const menuCategories = [
  {
    name: "Pre-Workout",
    items: [
      { name: "Green Power Smoothie", description: "Spinach, banana, protein, almond milk", price: "£6.50" },
      { name: "Acai Energy Bowl", description: "Acai, granola, mixed berries, honey", price: "£8.00" },
      { name: "Oat & Banana Pancakes", description: "Gluten-free oats, banana, eggs, maple syrup", price: "£7.50" },
    ],
  },
  {
    name: "Post-Workout",
    items: [
      { name: "Protein Recovery Shake", description: "Whey protein, peanut butter, banana, oat milk", price: "£7.00" },
      { name: "Grilled Chicken Bowl", description: "Chicken breast, quinoa, roasted vegetables, tahini", price: "£11.50" },
      { name: "Salmon & Avocado Plate", description: "Smoked salmon, avocado, sourdough, poached eggs", price: "£12.00" },
    ],
  },
  {
    name: "Snacks & Bites",
    items: [
      { name: "Protein Balls (x3)", description: "Dates, oats, cocoa, whey protein", price: "£4.50" },
      { name: "Mixed Nut Butter Toast", description: "Sourdough, almond butter, banana, chia seeds", price: "£5.50" },
      { name: "Greek Yoghurt Parfait", description: "Greek yoghurt, granola, honey, mixed berries", price: "£6.00" },
    ],
  },
  {
    name: "Cold-Pressed Juices",
    items: [
      { name: "The Energiser", description: "Apple, carrot, ginger, lemon", price: "£5.50" },
      { name: "Green Cleanse", description: "Cucumber, celery, spinach, mint, lime", price: "£5.50" },
      { name: "Beet Boost", description: "Beetroot, apple, ginger", price: "£5.50" },
    ],
  },
];

export default function NaturalFitnessFood() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] flex items-end">
        <Image
          src="/nice.png"
          alt="Natural Fitness Food"
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
            Natural Fitness Food
          </h1>
          <p className="text-white/70 text-lg mt-4 max-w-xl">
            Fuel your training with chef-prepared, nutrient-dense meals designed for performance and recovery.
          </p>
        </div>
      </section>

      {/* Menu */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-xs font-medium tracking-widest text-white/70 mb-4">
            OUR MENU
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-16">
            Food that works as hard as you do.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {menuCategories.map((category) => (
              <div key={category.name}>
                <h3 className="text-white text-lg font-medium tracking-wider border-b border-white/20 pb-3 mb-6">
                  {category.name}
                </h3>
                <div className="space-y-6">
                  {category.items.map((item) => (
                    <div key={item.name} className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-white font-medium">{item.name}</h4>
                        <p className="text-white/50 text-sm mt-1">{item.description}</p>
                      </div>
                      <span className="text-white/70 text-sm font-medium whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                  ))}
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
            Available exclusively to members.
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            Visit our in-club café before or after your session. All dishes are prepared fresh daily using locally sourced ingredients.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
