import { useEffect, useState } from "react";
import Stack from "@/lib/contentstack";
import { Code, Palette, Zap } from "lucide-react";

// ===== TYPE DEFINITIONS =====
interface Highlight {
  highlight_title: string;
  highlight_description: string;
  highlight_icon?: string;
}

interface AboutData {
  title: string;
  name: string;
  bio: string;
  highlights: Highlight[];
}

// ===== HELPER: STRIP HTML TAGS =====
const stripHTML = (html: string) => {
  if (!html) return "";
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

// ===== ICON MAP =====
const iconMap: Record<string, JSX.Element> = {
  code: <Code className="w-8 h-8 text-purple-400 mb-4" />,
  palette: <Palette className="w-8 h-8 text-blue-400 mb-4" />,
  zap: <Zap className="w-8 h-8 text-yellow-400 mb-4" />,
};

// ===== COMPONENT =====
const About = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const aboutEntry = Stack.ContentType("about_me").Entry("blt3603277f0009bf18");
        const result = await aboutEntry.toJSON().fetch();
        setAboutData(result);
      } catch (err) {
        console.error("❌ Error fetching About data:", err);
        setError("Failed to load About section.");
      }
    };

    fetchAboutData();
  }, []);

  if (error) {
    return (
      <section className="py-20 text-center text-red-400">
        <p>{error}</p>
      </section>
    );
  }

  if (!aboutData) {
    return (
      <section className="py-20 text-center text-muted-foreground">
        <p>Loading About section...</p>
      </section>
    );
  }

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#0c0c0c] text-white"
    >
      <div className="container mx-auto px-6 text-center">
        {/* ===== HEADING ===== */}
        <h2 className="text-4xl font-bold mb-8 tracking-tight">
          {aboutData.title || "About Me"}
        </h2>

        {/* ===== BIO ===== */}
        <p className="text-gray-400 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
          {stripHTML(aboutData.bio)}
        </p>

        {/* ===== HIGHLIGHT CARDS ===== */}
        {aboutData.highlights && aboutData.highlights.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
            {aboutData.highlights.map((item, index) => (
              <div
                key={index}
                className="group relative p-8 bg-[#0f0f0f] border border-white/10 rounded-2xl w-full max-w-sm 
                shadow-[0_0_20px_rgba(255,255,255,0.02)] transition-all duration-300 
                hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:border-purple-500/40 hover:-translate-y-1"
              >
                {/* ICON */}
                <div className="flex justify-center">
                  {iconMap[item.highlight_icon?.toLowerCase() || "code"]}
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-semibold text-white mt-2 mb-2">
                  {item.highlight_title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.highlight_description}
                </p>

                {/* PURPLE GLOW ON HOVER */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
