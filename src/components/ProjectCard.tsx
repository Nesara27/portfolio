import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const ProjectCard = ({ title, description, image, tags, liveUrl, githubUrl }: ProjectCardProps) => {
  return (
    <Card className="group overflow-hidden bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-card hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center gap-4 pb-4">
          {liveUrl && (
            <a 
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-primary rounded-full hover:bg-primary/90 transition-colors"
              aria-label="View live project"
            >
              <ExternalLink className="w-5 h-5 text-primary-foreground" />
            </a>
          )}
          {githubUrl && (
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-card border border-border rounded-full hover:border-primary/50 transition-colors"
              aria-label="View GitHub repository"
            >
              <Github className="w-5 h-5 text-foreground" />
            </a>
          )}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};
