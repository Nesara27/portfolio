import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";

const Index = () => {
  return (
    <div className="scroll-smooth bg-gradient-to-b from-[#0a0a0a] via-[#0b0b0b] to-[#090909] text-white">
      {/* ===== HERO ===== */}
      <Hero />

      {/* ===== ABOUT ===== */}
      <About />

      {/* ===== PROJECTS ===== */}
      <Projects />

      {/* ===== SKILLS ===== */}
      <Skills />

      {/* ===== CONTACT + FOOTER ===== */}
      <Contact />
    </div>
  );
};

export default Index;
