import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  Coffee, 
  ArrowRight, 
  Sparkles,
  Layers,
  MapPin
} from 'lucide-react';
import SEOHead, { PRIMARY_DOMAIN } from '../components/SEOHead';

const SRMKtrPrinting: React.FC = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "SRM KTR Online Printing Service",
      "serviceType": "Document Printing & Campus Delivery",
      "provider": {
        "@type": "Organization",
        "name": "ZapPrints",
        "url": PRIMARY_DOMAIN,
        "logo": `${PRIMARY_DOMAIN}/zap%20prints%20logo.png`
      },
      "areaServed": {
        "@type": "EducationalOrganization",
        "name": "SRM Institute of Science and Technology, Kattankulathur (SRM KTR)"
      },
      "description": "Fast online document printing for SRM KTR students. Upload PDFs, customize B&W or color, duplex or single-sided, and pick up at Java Canteen between class sessions.",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "3.00",
        "description": "Black & White A4 document printing starts at ₹3 per page."
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
          "name": "SRM KTR Printing Service",
          "item": `${PRIMARY_DOMAIN}/srm-ktr-printing`
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where can SRM KTR students pick up their prints?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All print orders are delivered to the official pickup counter at Java Canteen, SRM KTR campus, during morning (7:00 AM – 7:50 AM) and afternoon (12:00 PM – 12:30 PM) sessions."
          }
        },
        {
          "@type": "Question",
          "name": "What are the printing rates for SRM students?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Standard Black & White A4 prints start from ₹3 per page (both single and duplex). High-resolution color prints start from ₹12 per page."
          }
        },
        {
          "@type": "Question",
          "name": "What file types can I upload?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We support PDF, PNG, and JPG/JPEG files. Upload your documents directly from your smartphone or laptop browser."
          }
        },
        {
          "@type": "Question",
          "name": "How does order cutoff work for same-day pickup?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Orders placed before 6:59 AM are ready for the 7:00 AM morning slot. Orders placed before 11:40 AM are ready for the 12:00 PM afternoon slot at Java Canteen."
          }
        }
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-page, #faf9f7)', color: 'var(--text-main, #2a1f1a)', minHeight: '100vh', paddingBottom: '3rem' }}>
      <SEOHead
        title="SRM KTR Printing Service | Online Printouts & Delivery | ZapPrints"
        description="Fast online document printing for SRM KTR students. Upload PDFs, customize B&W or color, duplex or single-sided, and pick up at Java Canteen without waiting in lines."
        canonicalPath="/srm-ktr-printing"
        schema={schema}
      />

      {/* ── Breadcrumb Bar ── */}
      <div style={{ borderBottom: '1px solid var(--border-subtle, #ede9e5)', background: '#ffffff', padding: '0.65rem 0' }}>
        <div className="container" style={{ fontSize: '0.8rem', color: 'var(--color-muted, #7a6a62)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: 'var(--orange)', fontWeight: 600 }}>SRM KTR Printing</span>
        </div>
      </div>

      {/* ── Hero Section ── */}
      <section style={{ padding: '3.5rem 0 2.5rem 0', borderBottom: '1px solid var(--border-subtle, #ede9e5)', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '880px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.85rem', borderRadius: '99px', backgroundColor: 'color-mix(in srgb, var(--orange) 10%, transparent)', color: 'var(--orange)', fontSize: '0.78rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            <MapPin size={14} />
            <span>Dedicated Campus Print Service · SRM IST Kattankulathur</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '1rem', color: '#0f172a' }}>
            Printing Service for <span style={{ color: 'var(--orange)' }}>SRM KTR Students</span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto 2rem auto' }}>
            Skip the chaotic xerox and print shop queues in Tech Park and Potheri. Upload your PDFs online, customize your print settings, and pick up your documents directly at <strong>Java Canteen</strong> between classes.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/order" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem', fontWeight: 700, borderRadius: 'var(--radius-full, 99px)', gap: '0.5rem' }}>
              <span>Upload Document to Print</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/pricing" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem', fontWeight: 600, borderRadius: 'var(--radius-full, 99px)' }}>
              Check Transparent Rates
            </Link>
          </div>
        </div>
      </section>

      {/* ── Student Use Cases Section ── */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--orange)' }}>
              Tailored for Campus Life
            </span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, letterSpacing: '-0.03em', marginTop: '0.35rem' }}>
              What SRM Students Print with ZapPrints
            </h2>
            <p style={{ color: 'var(--color-muted, #7a6a62)', fontSize: '0.925rem', marginTop: '0.25rem' }}>
              Fast and accurate printing for daily academic submissions and projects.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'color-mix(in srgb, var(--orange) 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', marginBottom: '1rem' }}>
                <FileText size={20} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>Lab Records &amp; Manuals</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.5 }}>
                Print clean code outputs, graph pages, and experiment writeups in crisp monochrome or color duplex before your lab session begins.
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'color-mix(in srgb, var(--orange) 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', marginBottom: '1rem' }}>
                <Layers size={20} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>Project Reports &amp; Dissertations</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.5 }}>
                Capstones, mini-projects, and thesis documents formatted with precise page numbering, duplex alignment, and high-density text rendering.
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'color-mix(in srgb, var(--orange) 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', marginBottom: '1rem' }}>
                <Sparkles size={20} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>Assignments &amp; Notes</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.5 }}>
                Upload multiple PDF handouts, lecture slides, and tutorial problem sets. Instant page-counting calculates your exact total upfront.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pickup Slots & Logistics ── */}
      <section style={{ backgroundColor: '#ffffff', padding: '3.5rem 0', borderTop: '1px solid var(--border-subtle, #ede9e5)', borderBottom: '1px solid var(--border-subtle, #ede9e5)' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--orange)' }}>
              Campus Pickup Schedule
            </span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, letterSpacing: '-0.03em', marginTop: '0.35rem' }}>
              Collect at Java Canteen Twice Daily
            </h2>
            <p style={{ color: 'var(--color-muted, #7a6a62)', fontSize: '0.925rem' }}>
              Automated physical printing dispatched right before major class breaks.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.5rem', background: '#f8fafc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--orange)', fontWeight: 700, marginBottom: '0.5rem' }}>
                <Clock size={18} />
                <span>Morning Session</span>
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                7:00 AM – 7:50 AM
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.5 }}>
                Place orders by <strong>6:59 AM</strong> to collect before your first hour lecture.
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem', background: '#f8fafc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--orange)', fontWeight: 700, marginBottom: '0.5rem' }}>
                <Clock size={18} />
                <span>Afternoon Session</span>
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                12:00 PM – 12:30 PM
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.5 }}>
                Place orders by <strong>11:40 AM</strong> to collect during your midday lunch interval.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.75rem', fontSize: '0.9rem', color: '#0f172a', fontWeight: 600 }}>
            <Coffee size={18} style={{ color: 'var(--orange)' }} />
            <span>Counter Location: Java Canteen, SRM KTR Main Campus</span>
          </div>
        </div>
      </section>

      {/* ── SRM FAQ ── */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--orange)' }}>
              Student Questions
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '0.35rem' }}>
              Everything You Need to Know About SRM Printing
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="card" style={{ padding: '1.35rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>What file formats can I upload on ZapPrints?</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.6 }}>
                We natively support <strong>PDF (.pdf)</strong>, <strong>PNG (.png)</strong>, and <strong>JPG/JPEG (.jpg, .jpeg)</strong>. If you have Microsoft Word (.docx) or PowerPoint (.pptx) documents, save or export them as a PDF before uploading to lock your layout and fonts.
              </p>
            </div>

            <div className="card" style={{ padding: '1.35rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>Can I select B&amp;W or color and single or double-sided (duplex)?</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.6 }}>
                Yes. For every document you upload, you can individually choose between Black &amp; White (₹3/page) and Full Color (₹12/page), as well as Single-Sided or Double-Sided (duplex) layout. The live estimate updates instantly.
              </p>
            </div>

            <div className="card" style={{ padding: '1.35rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>Can I order multiple copies for group projects or department submissions?</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.6 }}>
                Yes. Simply increment the copy counter for your uploaded file. ZapPrints automatically calculates the total page count and applies the exact price upfront.
              </p>
            </div>

            <div className="card" style={{ padding: '1.35rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>What happens immediately after completing UPI payment?</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.6 }}>
                Once your payment is verified via Razorpay, your order is assigned a unique tracking ID and queued on our automated print daemon. You can track your print progress in real time under My Orders.
              </p>
            </div>

            <div className="card" style={{ padding: '1.35rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>Where and when do I pick up my printed papers?</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.6 }}>
                All orders are dispatched to the official counter at <strong>Java Canteen, SRM KTR campus</strong>. Morning orders placed before 6:59 AM are ready at 7:00 AM – 7:50 AM. Afternoon orders placed before 11:40 AM are ready at 12:00 PM – 12:30 PM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Practical Guides Section ── */}
      <section style={{ backgroundColor: '#ffffff', padding: '3.5rem 0', borderTop: '1px solid var(--border-subtle, #ede9e5)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--orange)' }}>
                Student Guides &amp; Tutorials
              </span>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '0.2rem' }}>
                Step-by-Step Printing Advice
              </h2>
            </div>
            <Link to="/blog" style={{ fontSize: '0.875rem', color: 'var(--orange)', fontWeight: 700, textDecoration: 'none' }}>
              View All Guides →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            <Link to="/blog/srm-assignment-printing" className="card" style={{ padding: '1.35rem', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Assignment Guide</span>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', lineHeight: 1.4 }}>How to Print College Assignments at SRM KTR</h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.5, flex: 1 }}>Formatting PDFs, margins, page order, and pickup tips for daily submissions.</p>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--orange)', marginTop: '0.75rem' }}>Read Guide →</span>
            </Link>

            <Link to="/blog/srm-project-report-printing" className="card" style={{ padding: '1.35rem', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Project Reports</span>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', lineHeight: 1.4 }}>SRM Project Report Printing Guide</h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.5, flex: 1 }}>Capstone document preparation, duplex pagination, and team copies.</p>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--orange)', marginTop: '0.75rem' }}>Read Guide →</span>
            </Link>

            <Link to="/blog/srm-lab-record-printing" className="card" style={{ padding: '1.35rem', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Lab Records</span>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', lineHeight: 1.4 }}>Printing Lab Records at SRM KTR</h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-muted, #7a6a62)', lineHeight: 1.5, flex: 1 }}>Code snippets, circuit diagrams, waveforms, and duplex lab records.</p>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--orange)', marginTop: '0.75rem' }}>Read Guide →</span>
            </Link>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/order" className="btn btn-primary" style={{ padding: '0.8rem 2.25rem', fontSize: '0.95rem', fontWeight: 700, borderRadius: 'var(--radius-full, 99px)', gap: '0.5rem' }}>
              <span>Start Your SRM Print Order</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SRMKtrPrinting;
