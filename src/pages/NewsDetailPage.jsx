import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { contentRepository } from '../services/contentRepository';

export function NewsDetailPage() {
  const { slug } = useParams();
  const article = contentRepository.getNewsBySlug(slug);

  if (!article) {
    return (
      <div className="container section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <SEO title="Article Not Found" />
        <h2>Article Not Located</h2>
        <p style={{ margin: 'var(--space-4) 0 var(--space-6) 0', color: 'var(--text-muted)' }}>
          The requested corporate communication could not be retrieved from the archives.
        </p>
        <Button to="/news" variant="primary" icon={ArrowLeft}>
          Return to News Archive
        </Button>
      </div>
    );
  }

  const allNews = contentRepository.getAllNews();
  const relatedNews = allNews.filter(n => n.slug !== slug).slice(0, 2);

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": [`https://oloid.company${article.image}`],
    "datePublished": article.isoDate,
    "dateModified": article.isoDate,
    "author": [{
      "@type": "Organization",
      "name": "OLOID Corporate Communications",
      "url": "https://oloid.company"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "OLOID",
      "logo": {
        "@type": "ImageObject",
        "url": "https://oloid.company/assets/brand/oloid-logo.png"
      }
    },
    "description": article.summary
  };

  return (
    <>
      <SEO
        title={`${article.title}`}
        description={article.summary}
        canonical={`/news/${article.slug}`}
        schema={schema}
      />

      <Breadcrumbs
        items={[
          { label: 'News', path: '/news' },
          { label: article.title }
        ]}
      />

      <article className="section" style={{ paddingTop: 'var(--space-4)', paddingBottom: 'var(--space-16)' }}>
        <div className="container-narrow">
          {/* Header */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <Link
              to="/news"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-4)', fontWeight: '500' }}
            >
              <ArrowLeft size={14} />
              <span>Back to all announcements</span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-brand-primary)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Calendar size={14} />
                {article.date}
              </span>
              <Badge variant="brand">{article.category}</Badge>
            </div>

            <h1 style={{ fontSize: 'var(--font-size-3xl)', lineHeight: '1.25', marginBottom: 'var(--space-4)' }}>
              {article.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
              <MapPin size={15} color="var(--color-brand-primary)" />
              <span>{article.location}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div
            style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              border: '1px solid var(--border-light)',
              marginBottom: 'var(--space-8)',
              boxShadow: 'var(--shadow-md)',
              maxHeight: '440px'
            }}
          >
            <img
              src={article.image}
              alt={article.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Lead Summary */}
          <div
            style={{
              padding: 'var(--space-6)',
              backgroundColor: 'var(--color-brand-primary-light)',
              borderLeft: '4px solid var(--color-brand-primary)',
              borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              marginBottom: 'var(--space-8)',
              fontSize: 'var(--font-size-md)',
              lineHeight: '1.6',
              color: 'var(--text-primary)',
              fontWeight: '500'
            }}
          >
            {article.summary}
          </div>

          {/* Article Body */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', fontSize: 'var(--font-size-md)', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            {article.body.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Co-Exhibiting Partners Box */}
          <div
            style={{
              marginTop: 'var(--space-10)',
              padding: 'var(--space-6)',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)'
            }}
          >
            <h4 style={{ fontSize: 'var(--font-size-sm)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
              Featured Technology Partners &amp; Co-Exhibitors:
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {article.partnersFeatured.map((p, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: '600',
                    backgroundColor: '#ffffff',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation & Related */}
          {relatedNews.length > 0 && (
            <div style={{ marginTop: 'var(--space-16)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-6)' }}>
                Related Corporate Announcements
              </h3>
              <div className="grid-2">
                {relatedNews.map((rel) => (
                  <div
                    key={rel.id}
                    style={{
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-6)',
                      background: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-brand-primary)', fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>
                      {rel.date}
                    </span>
                    <h4 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--space-2)' }}>
                      <Link to={`/news/${rel.slug}`} style={{ color: 'inherit' }}>
                        {rel.title}
                      </Link>
                    </h4>
                    <Link
                      to={`/news/${rel.slug}`}
                      style={{ marginTop: 'auto', fontSize: 'var(--font-size-xs)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                    >
                      <span>Read Report</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}

export default NewsDetailPage;
