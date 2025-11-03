import { Badge } from "@/components/ui/badge";

interface SkillBadgeProps {
  name: string;
  icon?: React.ReactNode;
}

export const SkillBadge = ({ name, icon }: SkillBadgeProps) => {
  return (
    <Badge 
      variant="outline" 
      className="px-4 py-2 bg-card border-border hover:border-primary/50 hover:bg-gradient-card transition-all duration-300 hover:scale-105 cursor-default"
    >
      <span className="flex items-center gap-2">
        {icon}
        <span className="text-foreground font-medium">{name}</span>
      </span>
    </Badge>
  );
};
