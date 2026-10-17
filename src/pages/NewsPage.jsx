import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { contentRepository } from '../services/contentRepository';

export function NewsPage() {
  const newsList = contentRepository.getAllNews();

  return (
    <>
      <SEO
        title="News & Events — Exhibition Reports & Industry Announcements"
        description="Stay updated with OLOID's corporate announcements, technical advancements, and participation in international energy exhibitions."
        canonical="/news"
      />

      <Breadcrumbs items={[{ label: 'News & Announcements' }]} />

      <section className="section" style={{ paddingTop: 'var(--space-4)', paddingBottom: 'var(--space-16)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Corporate Communications"
            title="News, Exhibitions &amp;"
            titleGradientText="Industry Engagements"
            description="Official announcements, verified international trade show participations, and updates on regional engineering infrastructure."
          />

          <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            {newsList.map((item) => (
              <article
                key={item.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all var(--transition-normal)'
                }}
              >
                <div className="grid-2" style={{ alignItems: 'stretch' }}>
                  <div style={{ height: '100%', minHeight: '240px', backgroundColor: 'var(--color-brand-navy-dark)', overflow: 'hidden' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>

                  <div style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-brand-primary)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <Calendar size={13} />
                          {item.date}
                        </span>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>

                      <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-3)', lineHeight: '1.3' }}>
                        <Link to={`/news/${item.slug}`} style={{ color: 'inherit' }}>
                          {item.title}
                        </Link>
                      </h3>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
                        <MapPin size={13} color="var(--color-brand-primary)" />
                        <span>{item.location}</span>
                      </div>

                      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: 'var(--space-6)' }}>
                        {item.summary}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-light)' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {item.partnersFeatured.slice(0, 3).map((p, idx) => (
                          <span key={idx} style={{ fontSize: '10px', background: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', color: 'var(--text-muted)' }}>
                            {p}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/news/${item.slug}`}
                        style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                      >
                        <span>Full Report</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default NewsPage;
