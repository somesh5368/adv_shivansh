'use client';

import React, { useState } from 'react';
import {
  MessageSquareQuote,
  FileSearch,
  Gavel,
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Scale,
} from 'lucide-react';

interface Step {
  step: string;
  phase: string;
  title: string;
  description: string;
  tag: string;
  icon: React.ReactNode;
  detailPoints: string[];
}

export function InteractiveHowWeWork() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: Step[] = [
    {
      step: '01',
      phase: 'Initial Brief',
      title: 'Confidential Consultation',
      description:
        'Structured chamber or digital conference under strict advocate-client confidentiality to examine core dispute facts and immediate risks.',
      tag: 'Factual Assessment',
      icon: <MessageSquareQuote size={28} className="text-brass" />,
      detailPoints: [
        'Complete attorney-client evidentiary privilege under Sections 126 & 129 Evidence Act',
        'Review of dispute notices, police FIRs, or civil summonses',
        'Immediate risk assessment & urgency identification for interim relief',
      ],
    },
    {
      step: '02',
      phase: 'Analysis',
      title: 'Case Evaluation',
      description:
        'Thorough scrutiny of evidentiary records, revenue maps, statutory enactments, and relevant High Court / Supreme Court precedents.',
      tag: 'Statutory Research',
      icon: <FileSearch size={28} className="text-brass" />,
      detailPoints: [
        'Meticulous cross-referencing with Civil Procedure Code, CrPC & local revenue enactments',
        'Evidentiary chain-of-custody verification and forensic record inspection',
        'Judicial precedent mapping across Supreme Court & Allahabad High Court benches',
      ],
    },
    {
      step: '03',
      phase: 'Advocacy',
      title: 'Representation',
      description:
        'Pleading drafting with procedural fidelity, disciplined cross-examination, and unwavering oral advocacy in courtroom hearings.',
      tag: 'Courtroom Pleadings',
      icon: <Gavel size={28} className="text-brass" />,
      detailPoints: [
        'Drafting of plaints, written statements, bail petitions, and interim injunction applications',
        'Diligent witness examination and evidentiary cross-examination during trial proceedings',
        'Articulate oral submissions before Magistrates, Civil Judges, and District Sessions Courts',
      ],
    },
    {
      step: '04',
      phase: 'Execution',
      title: 'Resolution and Support',
      description:
        'Expedited decree enforcement, execution petitions under Order 21 CPC, post-judgment compliance, and transparent advisory.',
      tag: 'Decree Enforcement',
      icon: <Award size={28} className="text-brass" />,
      detailPoints: [
        'Execution petitions under Order 21 CPC to obtain warrants and attachment orders',
        'Compliance follow-up with administrative and police departments',
        'Appellate advisory, review petitions, and ongoing statutory legal guidance',
      ],
    },
  ];

  return (
    <div className="space-y-12">
      {/* Step Selector Cards (Desktop / Tablet / Mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((item, idx) => {
          const isSelected = activeStep === idx;

          return (
            <button
              key={item.step}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`text-left p-6 sm:p-7 rounded-xs border transition-all duration-300 relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-white dark:bg-[#151e2c] border-2 border-brass shadow-card-hover -translate-y-2'
                  : 'bg-white/80 dark:bg-[#101622] border-bone-dark dark:border-[#222c3d] hover:border-brass/70 hover:bg-white dark:hover:bg-[#151e2c] shadow-subtle'
              }`}
            >
              {/* Top Accent bar */}
              <div
                className={`absolute top-0 inset-x-0 h-1 transition-all duration-300 ${
                  isSelected ? 'bg-gradient-to-r from-oxblood via-brass to-wine' : 'bg-transparent'
                }`}
              />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-serif text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors ${
                      isSelected ? 'text-brass' : 'text-charcoal/40 dark:text-bone/40'
                    }`}
                  >
                    {item.step}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-xs border ${
                      isSelected
                        ? 'bg-oxblood text-brass border-brass/40'
                        : 'bg-bone dark:bg-[#0c1018] text-charcoal/60 dark:text-bone/70 border-bone-dark dark:border-[#222c3d]'
                    }`}
                  >
                    {item.phase}
                  </span>
                </div>

                <div className="mb-3">{item.icon}</div>

                <h3
                  className={`font-serif text-lg sm:text-xl font-bold mb-2 transition-colors ${
                    isSelected ? 'text-oxblood dark:text-brass' : 'text-charcoal dark:text-bone'
                  }`}
                >
                  {item.title}
                </h3>

                <p className="text-xs text-charcoal/70 dark:text-bone/70 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-bone-dark dark:border-[#222c3d] flex items-center justify-between">
                <span className="text-[11px] font-bold text-oxblood dark:text-brass">{item.tag}</span>
                <span
                  className={`text-xs font-bold transition-transform ${
                    isSelected ? 'text-brass translate-x-1' : 'text-charcoal/40 dark:text-bone/40'
                  }`}
                >
                  &rarr;
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded Active Step Detail Showcase Box */}
      <div className="bg-white dark:bg-[#121824] border-2 border-brass/50 p-7 sm:p-10 rounded-xs shadow-card animate-fade-in relative overflow-hidden">
        {/* Subtle background crest */}
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-10 translate-y-10">
          <Scale size={280} className="text-oxblood dark:text-brass" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="w-10 h-10 rounded-full bg-oxblood text-brass font-serif font-bold text-lg flex items-center justify-center border border-brass">
                {steps[activeStep].step}
              </span>
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-brass block">
                  Phase {steps[activeStep].step} &bull; {steps[activeStep].phase}
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-oxblood dark:text-white">
                  {steps[activeStep].title}
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-charcoal/85 dark:text-bone/85 leading-relaxed pt-1">
              {steps[activeStep].description}
            </p>

            {/* Checklist of what our advocates do in this step */}
            <div className="pt-3 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60 dark:text-bone/60 block">
                Procedural Deliverables:
              </span>
              {steps[activeStep].detailPoints.map((point) => (
                <div key={point} className="flex items-start space-x-2.5 text-xs text-charcoal/80 dark:text-bone/80">
                  <CheckCircle2 size={15} className="text-brass shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 lg:text-right border-t lg:border-t-0 lg:border-l border-bone-dark dark:border-[#222c3d] pt-6 lg:pt-0 lg:pl-8 space-y-4">
            <div className="text-left bg-bone-light dark:bg-[#0c1018] p-4 rounded-xs border border-bone-dark dark:border-[#222c3d] space-y-1.5">
              <div className="flex items-center space-x-2 text-oxblood dark:text-brass font-bold text-xs">
                <ShieldCheck size={16} className="text-brass" />
                <span>Standard of Representation</span>
              </div>
              <p className="text-[11px] text-charcoal/70 dark:text-bone/70 leading-relaxed">
                Supervised directly by partner advocates enrolled with the Bar Council of Uttar Pradesh.
              </p>
            </div>

            <a
              href="/contact"
              className="inline-flex items-center justify-center w-full py-3.5 px-5 bg-oxblood hover:bg-wine text-brass text-xs font-bold uppercase tracking-wider transition-all border border-brass rounded-xs shadow-sm"
            >
              <span>Schedule Initial Brief</span>
              <ArrowRight size={14} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

