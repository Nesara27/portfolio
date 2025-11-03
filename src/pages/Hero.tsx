import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import Stack from "@/lib/contentstack";

interface HeroData {
  title: string;
  subtitle: string;
  primary_button_label: string;
  primary_button_target: string; 
  secondary_button_label: string;
  secondary_button_target: string; 
  github_url: string;
  linkedin_url: string;
  email: string;
}

const Hero = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [error, setError] = useState<string | null>(null);

  
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        
        const heroEntry = Stack.ContentType("hero_section").Entry("blt07d0ea12be32c5d4");
        const result = await heroEntry.toJSON().fetch();
        setHeroData(result);
      } catch (err) {
        console.error("❌ Error fetching Hero data:", err);
        setError("Failed to load Hero section.");
      }
    };

    fetchHeroData();
  }, []);

  if (error) {
    return (
      <section className="py-20 text-center text-red-400">
        <p>{error}</p>
      </section>
    );
  }

  if (!heroData) {
    return (
      <section className="py-20 text-center text-muted-foreground">
        <p>Loading Hero section...</p>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-[#0a0a0a] via-[#0b0b0b] to-[#090909] text-white"
    >
      <div>
        {/* ===== TITLE ===== */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {heroData.title}
        </h1>

        {/* ===== SUBTITLE ===== */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {heroData.subtitle}
        </p>

        {/* ===== BUTTONS ===== */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {/* Primary Button - Scroll to About */}
          <Button
            variant="hero"
            size="lg"
            onClick={() => scrollToSection(heroData.primary_button_target || "projects")}
            className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition-all"
          >
            {heroData.primary_button_label || "View My Work"}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Secondary Button - Scroll to Projects */}
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection(heroData.secondary_button_target || "contact")}
            className="hover:bg-white/10 border-white/20"
          >
            {heroData.secondary_button_label || "Get In Touch"}
          </Button>
        </div>

        {/* ===== SOCIAL LINKS ===== */}
        <div className="flex justify-center gap-8 text-muted-foreground">
          {heroData.github_url && (
            <a
              href={heroData.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          )}
          {heroData.linkedin_url && (
            <a
              href={heroData.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          )}
          {heroData.email && (
            <a
              href={`mailto:${heroData.email}`}
              className="hover:text-blue-400 transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
