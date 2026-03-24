import { Quote, Star } from 'lucide-react';
import styles from './ProfileTestimonials.module.css';

interface Testimonial {
  id: string;
  client_name: string;
  client_company?: string;
  client_role?: string;
  testimonial: string;
  rating: number;
  project_name?: string;
}

interface ProfileTestimonialsProps {
  testimonials: Testimonial[];
}

export default function ProfileTestimonials({ testimonials }: ProfileTestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className={styles.ProfileTestimonials}>
      <h2 className={styles.ProfileTestimonials__title}>Client Testimonials</h2>
      <p className={styles.ProfileTestimonials__subtitle}>
        What clients say about working together
      </p>

      <div className={styles.ProfileTestimonials__grid}>
        {testimonials.map((testimonial) => (
          <article key={testimonial.id} className={styles.ProfileTestimonials__card}>
            <Quote className={styles.ProfileTestimonials__icon} size={40} />
            
            <div className={styles.ProfileTestimonials__rating}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  className={
                    index < testimonial.rating
                      ? styles.ProfileTestimonials__starFilled
                      : styles.ProfileTestimonials__starEmpty
                  }
                  fill={index < testimonial.rating ? 'currentColor' : 'none'}
                  aria-hidden="true"
                />
              ))}
            </div>

            <blockquote className={styles.ProfileTestimonials__quote}>
              {testimonial.testimonial}
            </blockquote>

            <div className={styles.ProfileTestimonials__author}>
              <div>
                <p className={styles.ProfileTestimonials__authorName}>
                  {testimonial.client_name}
                </p>
                {testimonial.client_role && testimonial.client_company && (
                  <p className={styles.ProfileTestimonials__authorTitle}>
                    {testimonial.client_role} at {testimonial.client_company}
                  </p>
                )}
              </div>
            </div>

            {testimonial.project_name && (
              <p className={styles.ProfileTestimonials__project}>
                Project: {testimonial.project_name}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
