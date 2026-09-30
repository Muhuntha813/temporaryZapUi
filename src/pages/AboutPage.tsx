import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Users, ArrowRight } from 'lucide-react';
import SEOHead, { PRIMARY_DOMAIN } from '../components/SEOHead';

const AboutPage: React.FC = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About ZapPrints",
      "description": "Learn how ZapPrints is modernizing campus printing for college students with automated queue-free print stations.",
      "url": `${PRIMARY_DOMAIN}/about`,
      "mainEntity": {
        "@type": "Organization",
        "name": "ZapPrints",
        "url": PRIMARY_DOMAIN,
        "logo": `${PRIMARY_DOMAIN}/zap%20prints%20logo.png`,
        "description": "Smart campus printing network engineered for fast document turnaround and convenient college canteen pickup."
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
          "name": "About",
          "item": `${PRIMARY_DOMAIN}/about`
        }
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-page, #faf9f7)', color: 'var(--text-main, #2a1f1a)', minHeight: '100vh', paddingBottom: '3rem' }}>
      <SEOHead
        title="About ZapPrints — Modern Campus Printing Network"
        description="ZapPrints is built by students for students to solve campus printing hassles. Fast online uploads, automated print stations, and Java Canteen pickup."
        canonicalPath="/about"
        schema={schema}
      />

      <div style={{ borderBottom: '1px solid var(--border-subtle, #ede9e5)', background: '#ffffff', padding: '0.65rem 0' }}>
        <div className="container" style={{ fontSize: '0.8rem', color: 'var(--color-muted, #7a6a62)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: 'var(--orange)', fontWeight: 600 }}>About</span>
        </div>
      </div>

      <section style={{ padding: '3.5rem 0 2.5rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--orange)' }}>
            Our Mission
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: '0.35rem', marginBottom: '0.65rem', color: '#0f172a' }}>
            Fixing Campus Printing for College Students
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.6 }}>
            Every college student knows the rush: standing in long lines at crowded print shops before 8:00 AM classes or lab submissions. ZapPrints is built to eliminate the queue entirely.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 3.5rem 0' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'color-mix(in srgb, var(--orange) 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', marginBottom: '1rem' }}>
                <Zap size={20} />
              </div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem' }}>Speed &amp; Convenience</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.55 }}>
                Order from your phone anytime and pick up right when you reach campus or between lectures at Java Canteen.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'color-mix(in srgb, var(--orange) 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', marginBottom: '1rem' }}>
                <ShieldCheck size={20} />
              </div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem' }}>Data Privacy</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.55 }}>
                Your private assignments, resumes, and project code are never left visible on shared shop desktop screens. Files are processed securely.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'color-mix(in srgb, var(--orange) 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', marginBottom: '1rem' }}>
                <Users size={20} />
              </div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem' }}>Student Centric</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.55 }}>
                Engineered specifically for academic formats, duplex lab manuals, transparent pricing, and instant UPI micro-transactions.
              </p>
            </div>
          </div>

          <div className="card" style={{ padding: '2rem', textAlign: 'center', background: '#ffffff', borderRadius: 'var(--radius-xl, 1.5rem)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Meet the Engineering Team</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-muted, #7a6a62)', maxWidth: '540px', margin: '0 auto 1.5rem auto', lineHeight: 1.55 }}>
              ZapPrints is engineered from scratch by a team of passionate student builders across full-stack software and hardware daemons.
            </p>
            <Link to="/makers" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--radius-full, 99px)', padding: '0.65rem 1.5rem' }}>
              <span>View The Makers Archive</span>
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutPage;
