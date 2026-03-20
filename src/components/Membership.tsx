import Image from "next/image";
import Link from "next/link";

export default function Membership() {
  return (
    <section className="bg-black py-12 md:py-20 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="relative rounded-xl overflow-hidden min-h-[400px] md:min-h-[520px]">
          <Image
            src="/yoga.png"
            alt="Become a member"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[400px] md:min-h-[520px] text-center px-4">
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-8">
              Become a member
            </h2>
            <Link
              href="/membership"
              className="bg-white text-black text-xs font-medium tracking-widest px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors"
            >
              FIND OUT MORE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
