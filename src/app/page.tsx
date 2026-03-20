import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Clubs from "@/components/Clubs";
import Classes from "@/components/Classes";
import Wellness from "@/components/Wellness";
import Membership from "@/components/Membership";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Clubs />
        <Classes />
        <Wellness />
        <Membership />
      </main>
      <Footer />
    </>
  );
}
