import { ExternalLink } from 'lucide-react';
import styles from './ProfileProjects.module.css';

interface Project {
  id: string;
  title: string;
  description: string;
  project_url?: string;
  image_url?: string;
  technologies: string[];
  completion_date?: string;
  featured: boolean;
}

interface ProfileProjectsProps {
  projects: Project[];
}

export default function ProfileProjects({ projects }: ProfileProjectsProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className={styles.ProfileProjects}>
      <h2 className={styles.ProfileProjects__title}>Portfolio & Projects</h2>
      <p className={styles.ProfileProjects__subtitle}>
        Notable work and successful deliveries
      </p>

      <div className={styles.ProfileProjects__grid}>
        {projects.map((project) => (
          <article key={project.id} className={styles.ProfileProjects__card}>
            {project.featured && (
              <span className={styles.ProfileProjects__badge}>Featured</span>
            )}
            
            <h3 className={styles.ProfileProjects__cardTitle}>{project.title}</h3>
            
            <p className={styles.ProfileProjects__cardDesc}>{project.description}</p>

            {project.technologies && project.technologies.length > 0 && (
              <div className={styles.ProfileProjects__tech}>
                {project.technologies.map((tech, index) => (
                  <span key={index} className={styles.ProfileProjects__techBadge}>
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {project.completion_date && (
              <p className={styles.ProfileProjects__date}>
                Completed: {new Date(project.completion_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                })}
              </p>
            )}

            {project.project_url && (
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ProfileProjects__link}
              >
                View Project <ExternalLink size={16} />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
