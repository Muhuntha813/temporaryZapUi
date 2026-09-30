import React from 'react';
import Reveal from './Reveal';

interface SectionHeadProps {
  num: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
}

/** Numbered editorial section header: "01 — LABEL", monumental title, short intro. */
const SectionHead: React.FC<SectionHeadProps> = ({ num, label, title, intro }) => (
  <Reveal className="sec-head">
    <div className="eyebrow">
      <span className="num">{num}</span>
      <span className="bar" aria-hidden="true" />
      <span>{label}</span>
    </div>
    <h2 className="sec-title">{title}</h2>
    {intro && <p className="sec-intro">{intro}</p>}
  </Reveal>
);

export default SectionHead;
