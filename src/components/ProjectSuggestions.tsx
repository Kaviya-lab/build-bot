import { ProjectSuggestion, getDifficultyColor } from '@/lib/projectSuggestions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Wrench, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectSuggestionsProps {
  projects: ProjectSuggestion[];
}

export function ProjectSuggestions({ projects }: ProjectSuggestionsProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-semibold text-foreground">Project Ideas</h3>
        <Badge variant="secondary" className="ml-auto">
          {projects.length} suggestions
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Card
            key={project.id}
            className={cn(
              "gradient-card border-border/50 hover:border-primary/50 transition-all duration-300",
              "hover:glow-primary cursor-pointer group animate-scale-in"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <span className="text-3xl">{project.icon}</span>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs font-mono capitalize",
                    getDifficultyColor(project.difficulty)
                  )}
                >
                  {project.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-base group-hover:text-primary transition-colors">
                {project.title}
              </CardTitle>
              <CardDescription className="text-sm line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1.5">
                {project.components.slice(0, 3).map((component) => (
                  <Badge
                    key={component}
                    variant="secondary"
                    className="text-xs font-mono"
                  >
                    <Cpu className="h-3 w-3 mr-1" />
                    {component}
                  </Badge>
                ))}
                {project.components.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.components.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-2 p-4 rounded-lg bg-card/50 border border-border/50">
        <Wrench className="h-5 w-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Based on detected components. Upload more images to discover additional project possibilities!
        </p>
      </div>
    </div>
  );
}
