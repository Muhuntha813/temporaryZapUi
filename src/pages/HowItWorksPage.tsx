import React from 'react';
import { Link } from 'react-router-dom';
import { UploadCloud, Sliders, CreditCard, Coffee, ArrowRight } from 'lucide-react';
import SEOHead, { PRIMARY_DOMAIN } from '../components/SEOHead';

const HowItWorksPage: React.FC = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Order Online Printouts at ZapPrints",
      "description": "Step-by-step guide to uploading PDF documents, customizing print settings, paying securely, and collecting prints at Java Canteen.",
      "image": `${PRIMARY_DOMAIN}/zap%20prints%20logo%20banner.png`,
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Upload Document",
          "text": "Drag and drop your PDF or image file into the order builder. Page counts are calculated instantly client-side."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Customize Print Settings",
          "text": "Choose your number of copies, color option (B&W or Color), and layout (single-sided or duplex)."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Complete Instant Payment",
          "text": "Pay securely using UPI (GPay, PhonePe, Paytm) or card via Razorpay."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Pick Up at Java Canteen",
          "text": "Collect your sorted, printed document batch directly from the counter at Java Canteen during scheduled pickup hours."
        }
      ]
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
          "name": "How It Works",
          "item": `${PRIMARY_DOMAIN}/how-it-works`
        }
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-page, #faf9f7)', color: 'var(--text-main, #2a1f1a)', minHeight: '100vh', paddingBottom: '3rem' }}>
      <SEOHead
        title="How It Works — Online Campus Printing Guide | ZapPrints"
        description="Learn how ZapPrints works in 4 easy steps: Upload your PDF, configure duplex/color, pay via UPI, and grab your fresh prints at Java Canteen."
        canonicalPath="/how-it-works"
        schema={schema}
      />

      <div style={{ borderBottom: '1px solid var(--border-subtle, #ede9e5)', background: '#ffffff', padding: '0.65rem 0' }}>
        <div className="container" style={{ fontSize: '0.8rem', color: 'var(--color-muted, #7a6a62)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: 'var(--orange)', fontWeight: 600 }}>How It Works</span>
        </div>
      </div>

      <section style={{ padding: '3.5rem 0 2.5rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--orange)' }}>
            Seamless Workflow
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: '0.35rem', marginBottom: '0.65rem', color: '#0f172a' }}>
            How ZapPrints Works
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.55 }}>
            From your phone to physical printouts ready at Java Canteen in 4 straightforward steps.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 3.5rem 0' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
            
            {/* Step 1 */}
            <div className="card" style={{ padding: '1.75rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'color-mix(in srgb, var(--orange) 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', flexShrink: 0 }}>
                <UploadCloud size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Step 01</span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.2rem 0 0.5rem 0' }}>Upload Your Documents</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.55 }}>
                  Drop your PDF, PNG, or JPG files into the browser. Our client-side analyzer counts pages instantly without uploading unneeded data, protecting your bandwidth and privacy.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="card" style={{ padding: '1.75rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'color-mix(in srgb, var(--orange) 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', flexShrink: 0 }}>
                <Sliders size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Step 02</span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.2rem 0 0.5rem 0' }}>Customize Print Preferences</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.55 }}>
                  Select monochrome (B&amp;W) or vibrant color, toggle single or double-sided (duplex) printing, and choose the number of copies needed. The live price calculator updates immediately.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="card" style={{ padding: '1.75rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'color-mix(in srgb, var(--orange) 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', flexShrink: 0 }}>
                <CreditCard size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Step 03</span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.2rem 0 0.5rem 0' }}>Instant UPI Checkout</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.55 }}>
                  Review your order summary and pay in seconds via Razorpay using UPI (Google Pay, PhonePe, Paytm, BHIM) or debit/credit cards.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="card" style={{ padding: '1.75rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'color-mix(in srgb, var(--orange) 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', flexShrink: 0 }}>
                <Coffee size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Step 04</span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.2rem 0 0.5rem 0' }}>Pickup at Java Canteen</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.55 }}>
                  Collect your sorted prints at the Java Canteen counter during the scheduled morning (7:00 AM – 7:50 AM) or afternoon (12:00 PM – 12:30 PM) pickup sessions.
                </p>
              </div>
            </div>

          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/order" className="btn btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1rem', fontWeight: 700, borderRadius: 'var(--radius-full, 99px)', gap: '0.5rem' }}>
              <span>Try It Now — Start Printing</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
