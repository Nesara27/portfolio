import { useEffect, useState } from "react";
import Stack from "@/lib/contentstack";
import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactData {
  title: string;
  description: string;
  button_label: string;
  button_link: string;
  github_url?: string;
  linkedin_url?: string;
  email?: string;
  footer_github_url?: string;
  footer_linkedin_url?: string;
  footer_email?: string;
  footer_text?: string;
}

const Contact = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const entry = Stack.ContentType("contact_section").Entry("blta7a483716f8fd772"); 
        const result = await entry.toJSON().fetch();
        setContactData(result);
      } catch (err) {
        console.error("❌ Error fetching Contact section:", err);
        setError("Failed to load Contact section.");
      }
    };

    fetchContactData();
  }, []);

  if (error) {
    return (
      <section className="py-20 text-center text-red-400">
        <p>{error}</p>
      </section>
    );
  }

  if (!contactData) {
    return (
      <section className="py-20 text-center text-muted-foreground">
        <p>Loading contact section...</p>
      </section>
    );
  }

  return (
    <>
      {/* ===== CONTACT SECTION ===== */}
      <section
        id="contact"
        className="py-24 text-center bg-gradient-to-b from-[#0a0a0a] to-[#090909] text-white border-t border-white/10"
      >
        <h2 className="text-4xl font-bold mb-4">{contactData.title}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg">
          {contactData.description}
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          onClick={() => (window.location.href = contactData.button_link)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-all flex items-center gap-2 mx-auto"
        >
          <Mail className="w-5 h-5" />
          {contactData.button_label}
        </Button>

        {/* Contact Icons */}
        <div className="flex justify-center gap-8 mt-10 text-muted-foreground">
          {contactData.github_url && (
            <a
              href={contactData.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          )}
          {contactData.linkedin_url && (
            <a
              href={contactData.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          )}
          {contactData.email && (
            <a
              href={`mailto:${contactData.email}`}
              className="hover:text-blue-400 transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          )}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/10 py-8 px-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground bg-[#0a0a0a]/80 backdrop-blur-sm">
        <p className="mb-4 md:mb-0">
          {contactData.footer_text ||
            `© ${new Date().getFullYear()} Portfolio by Nesara — All rights reserved.`}
        </p>
        <div className="flex gap-6">
          {contactData.footer_github_url && (
            <a
              href={contactData.footer_github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              GitHub
            </a>
          )}
          {contactData.footer_linkedin_url && (
            <a
              href={contactData.footer_linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
          )}
          {contactData.footer_email && (
            <a
              href={`mailto:${contactData.footer_email}`}
              className="hover:text-blue-400 transition-colors"
            >
              Email
            </a>
          )}
        </div>
      </footer>
    </>
  );
};

export default Contact;
