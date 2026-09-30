import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, MessageSquare } from 'lucide-react';
import SEOHead, { PRIMARY_DOMAIN } from '../components/SEOHead';

const FAQ_ITEMS = [
  {
    q: 'Which file formats does ZapPrints accept?',
    a: 'ZapPrints accepts PDF (.pdf), PNG (.png), and JPG/JPEG (.jpg, .jpeg) files. To ensure accurate page formatting and font rendering, please convert Word or PowerPoint files to PDF before uploading.'
  },
  {
    q: 'Where do I collect my printed documents?',
    a: 'All documents are collected directly at Java Canteen, SRM KTR campus during the daily designated collection windows.'
  },
  {
    q: 'What are the pickup hours and order cutoffs?',
    a: 'We operate two daily collection windows: Morning Session (7:00 AM – 7:50 AM with cutoff at 6:59 AM) and Afternoon Session (12:00 PM – 12:30 PM with cutoff at 11:40 AM).'
  },
  {
    q: 'How much does printing cost?',
    a: 'Standard Black & White A4 prints start from ₹3 per page. Full color A4 prints start from ₹12 per page. Both single-sided and double-sided (duplex) layouts are supported.'
  },
  {
    q: 'How do I specify double-sided (duplex) printing?',
    a: 'When customizing your uploaded file in the order builder, toggle the Layout setting to Double Sided. The page count estimate and pricing will adjust automatically.'
  },
  {
    q: 'How are my files protected?',
    a: 'Uploaded files are securely transmitted, held in private cloud storage solely for automated physical print execution, and permanently wiped once your order is processed.'
  },
  {
    q: 'What payment methods are supported?',
    a: 'We accept all major UPI apps (Google Pay, PhonePe, Paytm, BHIM) and debit/credit cards through our secure Razorpay gateway.'
  },
  {
    q: 'What if I need bulk prints for a club or department event?',
    a: 'For large volume orders, symposium booklets, or custom academic materials, you can contact our team directly via WhatsApp for coordinated handling.'
  }
];

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_ITEMS.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
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
          "name": "FAQ",
          "item": `${PRIMARY_DOMAIN}/faq`
        }
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-page, #faf9f7)', color: 'var(--text-main, #2a1f1a)', minHeight: '100vh', paddingBottom: '3rem' }}>
      <SEOHead
        title="Frequently Asked Questions — Campus Printing FAQ | ZapPrints"
        description="Find answers to common questions about ZapPrints online document printing, pickup slots at Java Canteen, supported file types, duplex printing, and pricing."
        canonicalPath="/faq"
        schema={schema}
      />

      <div style={{ borderBottom: '1px solid var(--border-subtle, #ede9e5)', background: '#ffffff', padding: '0.65rem 0' }}>
        <div className="container" style={{ fontSize: '0.8rem', color: 'var(--color-muted, #7a6a62)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: 'var(--orange)', fontWeight: 600 }}>FAQ</span>
        </div>
      </div>

      <section style={{ padding: '3.5rem 0 2.5rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--orange)' }}>
            Help Center
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: '0.35rem', marginBottom: '0.65rem', color: '#0f172a' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.55 }}>
            Everything you need to know about uploading, ordering, and collecting your campus printouts.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 3.5rem 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '3rem' }}>
            {FAQ_ITEMS.map((item, idx) => (
              <div 
                key={idx} 
                className="card" 
                style={{ 
                  padding: '1.25rem 1.5rem', 
                  borderRadius: 'var(--radius-lg, 1rem)', 
                  cursor: 'pointer',
                  backgroundColor: '#ffffff'
                }} 
                onClick={() => toggle(idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: '0.95rem' }}>
                  <span>{item.q}</span>
                  <ChevronDown 
                    size={16} 
                    style={{ 
                      transform: openIndex === idx ? 'rotate(180deg)' : 'none', 
                      transition: 'transform 0.2s', 
                      flexShrink: 0, 
                      marginLeft: '0.5rem',
                      color: 'var(--color-muted, #7a6a62)'
                    }} 
                  />
                </div>
                {openIndex === idx && (
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-muted, #7a6a62)', marginTop: '0.85rem', lineHeight: 1.6, borderTop: '1px solid var(--border-subtle, #ede9e5)', paddingTop: '0.75rem' }}>
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: '1.75rem', textAlign: 'center', background: '#ffffff' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' }}>Still have a question?</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-muted, #7a6a62)', marginBottom: '1.25rem' }}>
              Chat with our team directly on WhatsApp for quick assistance regarding any print queries.
            </p>
            <a 
              href="https://wa.me/917904447870" 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--radius-full, 99px)', padding: '0.6rem 1.5rem', fontSize: '0.9rem', textDecoration: 'none' }}
            >
              <MessageSquare size={16} style={{ color: 'var(--orange)' }} />
              <span>WhatsApp +91 7904447870</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
