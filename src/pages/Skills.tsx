import { useEffect, useState } from "react";
import Stack from "@/lib/contentstack";

// Define the structure of your Contentstack data
interface Skill {
  skill_name: string;
}

interface SkillsData {
  title: string;
  skills_list: Skill[];
}

const Skills = () => {
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        // ✅ Fetch your specific entry using UID
        const skillsEntry = Stack.ContentType("skill").Entry("bltee4c045b0ccbd59d");
        const result = await skillsEntry.toJSON().fetch();

        console.log("📦 Skills Data:", result);
        setSkillsData(result);
      } catch (err) {
        console.error("❌ Error fetching Skills data:", err);
        setError("Failed to load Skills section.");
      }
    };

    fetchSkillsData();
  }, []);

  if (error) {
    return (
      <section className="py-20 text-center text-red-400">
        <p>{error}</p>
      </section>
    );
  }

  if (!skillsData) {
    return (
      <section className="py-20 text-center text-muted-foreground">
        <p>Loading Skills section...</p>
      </section>
    );
  }

  return (
    <section
      id="skills"
      className="py-24 bg-gradient-to-b from-[#0a0a0a] via-[#0c0c0c] to-[#0a0a0a] text-white"
    >
      <div className="container mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold mb-12">
          {skillsData.title || "Skills & Technologies"}
        </h2>

        {/* Skills List */}
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {skillsData.skills_list?.map((skill, index) => (
            <span
              key={index}
              className="px-6 py-2 text-sm font-medium bg-[#111] border border-white/10 rounded-full hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
            >
              {skill.skill_name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
