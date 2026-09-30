import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import SEOHead, { PRIMARY_DOMAIN } from '../components/SEOHead';
import { API_URL } from '../utils/api';

const PricingPage: React.FC = () => {
  const [pricing, setPricing] = useState({ bw: 3, color: 12, binding: 35 });

  useEffect(() => {
    fetch(`${API_URL}/config`)
      .then(res => res.json())
      .then(data => {
        const rules = data.pricingRules || [];
        const bwRate = rules.find((r: any) => r.ruleKey === 'bw_page')?.price || 3;
        const colorRate = rules.find((r: any) => r.ruleKey === 'color_page')?.price || 12;
        const bindingRate = rules.find((r: any) => r.ruleKey === 'soft_binding')?.price || 35;
        setPricing({ bw: bwRate, color: colorRate, binding: bindingRate });
      })
      .catch(err => console.error('Failed to load dynamic pricing', err));
  }, []);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "ZapPrints Student Document Printing",
      "description": "Affordable student document printing rates for B&W and Color prints at SRM KTR campus.",
      "image": `${PRIMARY_DOMAIN}/zap%20prints%20logo%20banner.png`,
      "brand": {
        "@type": "Brand",
        "name": "ZapPrints"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": `${pricing.bw}.00`,
        "highPrice": `${pricing.color}.00`,
        "offerCount": "2"
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
          "name": "Pricing",
          "item": `${PRIMARY_DOMAIN}/pricing`
        }
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-page, #faf9f7)', color: 'var(--text-main, #2a1f1a)', minHeight: '100vh', paddingBottom: '3rem' }}>
      <SEOHead
        title="Student Printing Rates & Pricing | ZapPrints"
        description="Clear, student-friendly printing pricing for SRM KTR students. Black & White A4 prints starting from ₹3/page and vibrant color prints from ₹12/page. Zero hidden charges."
        canonicalPath="/pricing"
        schema={schema}
      />

      <div style={{ borderBottom: '1px solid var(--border-subtle, #ede9e5)', background: '#ffffff', padding: '0.65rem 0' }}>
        <div className="container" style={{ fontSize: '0.8rem', color: 'var(--color-muted, #7a6a62)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: 'var(--orange)', fontWeight: 600 }}>Pricing</span>
        </div>
      </div>

      <section style={{ padding: '3.5rem 0 2.5rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--orange)' }}>
            Transparent Rates
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: '0.35rem', marginBottom: '0.65rem', color: '#0f172a' }}>
            Simple Student-Friendly Printing Rates
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.55 }}>
            No minimum order sizes. Pay solely for the pages you print with instant upfront pricing before checkout.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 3.5rem 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            
            {/* Standard B&W Printing */}
            <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-xl, 1.5rem)', border: '2px solid color-mix(in srgb, var(--orange) 30%, transparent)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, background: 'color-mix(in srgb, var(--orange) 10%, transparent)', color: 'var(--orange)', padding: '3px 10px', borderRadius: '99px' }}>
                  Most Popular
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-muted, #7a6a62)' }}>Single / Duplex</span>
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>Black &amp; White Document</h2>
              <div style={{ fontSize: '2.25rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem', lineHeight: 1 }}>
                ₹{pricing.bw} <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-muted, #7a6a62)' }}>/ page</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem 0', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--orange)' }} />
                  <span>High-clarity 1200 DPI laser printing</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--orange)' }} />
                  <span>Supports single-sided and double-sided (duplex)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--orange)' }} />
                  <span>Ideal for lab records, assignments, &amp; notes</span>
                </li>
              </ul>
              <Link to="/order" className="btn btn-primary" style={{ marginTop: 'auto', width: '100%', borderRadius: 'var(--radius-full, 99px)' }}>
                Print B&amp;W Document
              </Link>
            </div>

            {/* High-Resolution Color Printing */}
            <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-xl, 1.5rem)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, background: 'rgba(59,130,246,0.1)', color: '#2563eb', padding: '3px 10px', borderRadius: '99px' }}>
                  Full Color
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-muted, #7a6a62)' }}>A4 Standard</span>
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>Vibrant Color Document</h2>
              <div style={{ fontSize: '2.25rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem', lineHeight: 1 }}>
                ₹{pricing.color} <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-muted, #7a6a62)' }}>/ page</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem 0', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--orange)' }} />
                  <span>Vivid color reproduction for graphs &amp; charts</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--orange)' }} />
                  <span>Supports duplex color pages</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--orange)' }} />
                  <span>Ideal for project presentations &amp; seminar reports</span>
                </li>
              </ul>
              <Link to="/order" className="btn btn-secondary" style={{ marginTop: 'auto', width: '100%', borderRadius: 'var(--radius-full, 99px)' }}>
                Print Color Document
              </Link>
            </div>

          </div>

          <div className="card" style={{ padding: '1.5rem', textAlign: 'center', background: '#ffffff' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' }}>Have questions about bulk orders?</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-muted, #7a6a62)', marginBottom: '1rem' }}>
              Printing event booklets or entire course curriculum batches? Reach out directly via our contact channels.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn-ghost" style={{ fontSize: '0.85rem' }}>
                Contact Team
              </Link>
              <Link to="/srm-ktr-printing" className="btn btn-ghost" style={{ fontSize: '0.85rem', color: 'var(--orange)' }}>
                SRM KTR Pickup Details →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
