import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import SEOHead, { PRIMARY_DOMAIN } from '../components/SEOHead';
import { BLOG_POSTS } from '../data/blogData';

const BlogIndexPage: React.FC = () => {
  const posts = Object.values(BLOG_POSTS);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "ZapPrints Student Printing Guides & Resources",
      "description": "Guides, tutorials, and practical advice on printing assignments, lab records, and project reports for SRM KTR students.",
      "url": `${PRIMARY_DOMAIN}/blog`,
      "publisher": {
        "@type": "Organization",
        "name": "ZapPrints",
        "url": PRIMARY_DOMAIN,
        "logo": `${PRIMARY_DOMAIN}/zap%20prints%20logo.png`
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": PRIMARY_DOMAIN
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `${PRIMARY_DOMAIN}/blog`
        }
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-page, #faf9f7)', color: 'var(--text-main, #2a1f1a)', minHeight: '100vh', paddingBottom: '3.5rem' }}>
      <SEOHead
        title="Student Printing Guides & Academic Resources | ZapPrints Blog"
        description="Practical guides for SRM KTR students on formatting and printing assignments, lab records, project reports, B&W vs color decisions, and Java Canteen pickup."
        canonicalPath="/blog"
        schema={schema}
      />

      {/* ── Breadcrumb Bar ── */}
      <div style={{ borderBottom: '1px solid var(--border-subtle, #ede9e5)', background: '#ffffff', padding: '0.65rem 0' }}>
        <div className="container" style={{ fontSize: '0.8rem', color: 'var(--color-muted, #7a6a62)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: 'var(--orange)', fontWeight: 600 }}>Blog &amp; Guides</span>
        </div>
      </div>

      <section style={{ padding: '3.5rem 0 2.5rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--orange)' }}>
            Student Knowledge Hub
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: '0.35rem', marginBottom: '0.65rem', color: '#0f172a' }}>
            Campus Printing Guides &amp; Tutorials
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.55 }}>
            Practical advice on formatting, duplex alignment, PDF preparation, and avoiding queue delays at SRM KTR.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 3.5rem 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {posts.map((item) => (
              <Link
                key={item.slug}
                to={`/blog/${item.slug}`}
                className="card"
                style={{
                  padding: '1.75rem',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#ffffff',
                  borderRadius: 'var(--radius-xl, 1.5rem)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--orange)', background: 'color-mix(in srgb, var(--orange) 10%, transparent)', padding: '2px 8px', borderRadius: '99px' }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-muted, #7a6a62)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={12} />
                    {item.readingTime}
                  </span>
                </div>

                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.4, marginBottom: '0.6rem' }}>
                  {item.title}
                </h2>

                <p style={{ fontSize: '0.875rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.55, marginBottom: '1.25rem', flex: 1 }}>
                  {item.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--orange)', marginTop: 'auto' }}>
                  <span>Read Full Guide</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>

          {/* Hub Footer CTA */}
          <div className="card" style={{ padding: '2rem', textAlign: 'center', background: '#ffffff', borderRadius: 'var(--radius-xl, 1.5rem)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>Have your documents ready to print?</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-muted, #7a6a62)', maxWidth: '520px', margin: '0 auto 1.25rem auto' }}>
              Upload your files directly to ZapPrints and pick them up at Java Canteen between class sessions.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/order" className="btn btn-primary" style={{ padding: '0.7rem 1.75rem', borderRadius: 'var(--radius-full, 99px)' }}>
                Start Printing Now
              </Link>
              <Link to="/srm-ktr-printing" className="btn btn-secondary" style={{ padding: '0.7rem 1.5rem', borderRadius: 'var(--radius-full, 99px)' }}>
                SRM Campus Overview
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default BlogIndexPage;
