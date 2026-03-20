import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TimetablePage() {
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen pt-24">
      <section className="max-w-[1440px] mx-auto px-6 py-16">
        <p className="text-xs font-medium tracking-widest text-white/60 mb-4">
          TIMETABLE
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl leading-tight">
          Find your next class.
        </h1>
        <p className="text-white/60 text-lg mt-6 max-w-xl">
          Browse our weekly timetable and book your spot in any of our
          inspiring classes.
        </p>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 pb-20">
        <div className="border border-white/10 rounded-lg p-12 text-center">
          <p className="text-white/40 text-sm tracking-widest">
            TIMETABLE COMING SOON
          </p>
        </div>
      </section>
    </main>
      <Footer />
    </>
  );
}
