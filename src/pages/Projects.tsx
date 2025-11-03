import { useEffect, useState } from "react";
import Stack from "@/lib/contentstack";

interface Project {
  title: string;
  description: string;
  link?: any; // Can be string, object, or array from Contentstack
  language: string[] | string;
  project_image?: { url: string };
}

interface ProjectsData {
  title: string;
  project_details: Project[];
}

const Projects = () => {
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectEntry = Stack.ContentType("project").Entry("blt08def1e025b3a3c2");
        const result = await projectEntry.toJSON().fetch();
        setProjectsData(result);
      } catch (err) {
        console.error("❌ Error fetching projects:", err);
        setError("Failed to load Projects section.");
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return (
      <section className="py-20 text-center text-red-400">
        <p>{error}</p>
      </section>
    );
  }

  if (!projectsData) {
    return (
      <section className="py-20 text-center text-muted-foreground">
        <p>Loading Projects...</p>
      </section>
    );
  }

  // ✅ Utility: strip HTML tags safely
  const stripHTML = (html: string) => html.replace(/<[^>]*>?/gm, "").trim();

  // ✅ Safe universal URL extractor
  const getProjectUrl = (link: any): string | null => {
    if (!link) return null;

    // 1️⃣ Direct string
    if (typeof link === "string") return link;

    // 2️⃣ Object with url/href
    if (typeof link === "object") {
      if (link.url) return link.url;
      if (link.href) return link.href;
    }

    // 3️⃣ Array of links
    if (Array.isArray(link) && link.length > 0) {
      const item = link[0];
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        if (item.url) return item.url;
        if (item.href) return item.href;
      }
    }

    return null;
  };

  const firstRow = projectsData.project_details.slice(0, 3);
  const secondRow = projectsData.project_details.slice(3);

  return (
    <section
      id="projects"
      className="py-24 bg-gradient-to-b from-[#0b0b0b] via-[#0c0c0c] to-[#0a0a0a] text-white"
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">
          {projectsData.title || "Featured Projects"}
        </h2>

        {/* === FIRST ROW (3 CARDS) === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
          {firstRow.map((project, index) => {
            const projectUrl = getProjectUrl(project.link);

            return (
              <div
                key={index}
                className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-400/40 transition-all hover:scale-[1.02]"
              >
                {/* Image */}
                {project.project_image?.url && (
                  <img
                    src={project.project_image.url}
                    alt={project.title}
                    className="w-full h-56 object-cover"
                  />
                )}

                <div className="p-6 text-left">
                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4">
                    {stripHTML(project.description || "")}
                  </p>

                  {/* Languages */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(project.language)
                      ? project.language.map((lang, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium bg-[#1a1a1a] border border-white/10 rounded-full text-muted-foreground"
                          >
                            {lang}
                          </span>
                        ))
                      : project.language && (
                          <span className="px-3 py-1 text-xs font-medium bg-[#1a1a1a] border border-white/10 rounded-full text-muted-foreground">
                            {project.language}
                          </span>
                        )}
                  </div>

                  {/* ✅ Link */}
                  {projectUrl ? (
                    <a
                      href={
                        projectUrl.startsWith("http")
                          ? projectUrl
                          : `https://${projectUrl}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-purple-400 hover:text-purple-300 hover:underline text-sm transition-all"
                    >
                      View Project →
                    </a>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">
                      No link available
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* === SECOND ROW (1 CARD CENTERED) === */}
        {secondRow.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="w-full md:w-1/3">
              {secondRow.map((project, index) => {
                const projectUrl = getProjectUrl(project.link);

                return (
                  <div
                    key={index}
                    className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-400/40 transition-all hover:scale-[1.02]"
                  >
                    {project.project_image?.url && (
                      <img
                        src={project.project_image.url}
                        alt={project.title}
                        className="w-full h-56 object-cover"
                      />
                    )}

                    <div className="p-6 text-left">
                      <h3 className="text-xl font-semibold mb-3 text-white">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {stripHTML(project.description || "")}
                      </p>

                      {/* Languages */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Array.isArray(project.language)
                          ? project.language.map((lang, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 text-xs font-medium bg-[#1a1a1a] border border-white/10 rounded-full text-muted-foreground"
                              >
                                {lang}
                              </span>
                            ))
                          : project.language && (
                              <span className="px-3 py-1 text-xs font-medium bg-[#1a1a1a] border border-white/10 rounded-full text-muted-foreground">
                                {project.language}
                              </span>
                            )}
                      </div>

                      {/* ✅ Link */}
                      {projectUrl ? (
                        <a
                          href={
                            projectUrl.startsWith("http")
                              ? projectUrl
                              : `https://${projectUrl}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-purple-400 hover:text-purple-300 hover:underline text-sm transition-all"
                        >
                          View Project →
                        </a>
                      ) : (
                        <p className="text-xs text-muted-foreground italic">
                          No link available
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
