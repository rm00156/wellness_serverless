import Link from "next/link";

export default function About() {
  return (
    <section
      id="about"
      className="bg-black py-24 md:py-32 lg:py-40 px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-serif text-2xl md:text-3xl lg:text-[2.5rem] lg:leading-[1.3] text-white/90">
          In our glorious, maddening city, your workout can be the difference
          between a good day and bad.
        </p>
        <p className="font-serif text-2xl md:text-3xl lg:text-[2.5rem] lg:leading-[1.3] text-white/90 mt-8">
          Hylton Health Club are London&apos;s luxury health clubs; individual in
          style, bound by a common philosophy: to be the Hylton Health Club for our
          members, inspiring them to be their personal best.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Link
            href="#clubs"
            className="border border-white text-white text-xs font-medium tracking-widest px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors"
          >
            FIND YOUR CLUB
          </Link>
          <Link
            href="#about"
            className="border border-white text-white text-xs font-medium tracking-widest px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors"
          >
            BECOME A MEMBER
          </Link>
        </div>
      </div>
    </section>
  );
}
