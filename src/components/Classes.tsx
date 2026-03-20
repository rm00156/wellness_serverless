import Image from "next/image";

const classes = [
  {
    name: "Reformer Pilates",
    image: "/yoga.png",
  },
  {
    name: "Cycling",
    image: "/approach.png",
  },
  {
    name: "Strength Training",
    image: "/personal_training.png",
  },
  {
    name: "Boxing",
    image: "/approach2.png",
  },
];

export default function Classes() {
  return (
    <section id="classes" className="bg-cream py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <p className="text-xs font-medium tracking-widest text-black/80 mb-4">
              INSPIRING CLASSES
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-black max-w-2xl leading-tight">
              Intelligent, inspiring and led by the best instructors, a huge
              range of classes that make fitness fun.
            </h2>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <button className="bg-black text-white text-xs font-medium tracking-widest px-6 py-3 rounded-full hover:bg-black/80 transition-colors">
              VIEW ALL CLASSES
            </button>
            <button className="border border-black text-black text-xs font-medium tracking-widest px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors">
              VIEW THE TIMETABLE
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-4">
          {classes.map((cls) => (
            <div
              key={cls.name}
              className="flex-shrink-0 w-[280px] md:w-[340px] group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <Image
                  src={cls.image}
                  alt={cls.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-lg font-medium">
                    {cls.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
