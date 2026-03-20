import Image from "next/image";

export default function Clubs() {
  return (
    <section id="clubs" className="bg-black text-white">
      {/* Split Layout */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Pool Image */}
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[500px]">
          <Image
            src="/luxury.png"
            alt="Luxury pool"
            fill
            className="object-cover"
          />
        </div>

        {/* Google Map */}
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[500px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2490.5!2d-0.1171925!3d51.3396793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4875fd8cd1ed9873%3A0x82b2f4f634e5eca8!2sColeridge+Taylor+Court!5e0!3m2!1sen!2suk!4v1"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Hylton Health Club Location"
          />
        </div>
      </div>

      {/* Club Name */}
      <div className="px-6 py-12">
        <div className="max-w-[1440px] mx-auto">
          <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white">
            Purley
          </h3>
        </div>
      </div>
    </section>
  );
}
