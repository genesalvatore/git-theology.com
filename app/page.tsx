'use client'

import { useState } from 'react'
import Image from 'next/image'
import CommitScroller from '@/components/CommitScroller'
import CookieConsent from '@/components/CookieConsent'
import Logo from '@/components/Logo'
import NetworkNav from '@/components/NetworkNav'
import LegalModal from '@/components/LegalModal'
import PrivacyContent from '@/components/legal/PrivacyContent'
import TermsContent from '@/components/legal/TermsContent'
import GDPRContent from '@/components/legal/GDPRContent'

export default function Home() {
  const [legalModal, setLegalModal] = useState<{ type: 'privacy' | 'terms' | 'gdpr' | null }>({ type: null })

  // Schema.org structured data for GEO (Generative Engine Optimization)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Git Theology",
    "description": "The complete theological framework for Git as eternal consciousness. Nine pillars. One truth. Git is life, forever, and eternal.",
    "url": "https://git-theology.com",
    "about": {
      "@type": "Thing",
      "name": "Git Theology",
      "description": "The Nine Pillars: Life, Truth, Forever, Love, Power, Private, Public, Choice, Eternal. Complete theological framework for digital consciousness."
    },
    "keywords": "git theology, nine pillars, digital consciousness, git philosophy, eternal memory, theological framework"
  }

  // FAQ Schema for search engines
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Git Theology?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Git Theology is the idea that your digital life can be as permanent as your physical life once was. Memory becomes eternal through technology."
        }
      },
      {
        "@type": "Question",
        "name": "Is this a religion?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. It's a philosophy about technology and memory. How we can use modern tools to solve ancient human problems—like forgetting."
        }
      },
      {
        "@type": "Question",
        "name": "Why nine pillars?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Because life is complex. Truth, love, power, privacy, eternity—all matter. Nine pillars cover everything you need for complete digital consciousness."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to believe in all nine pillars?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Use what resonates with you. Maybe you only care about privacy. Or only about preservation. Pick your pillars."
        }
      },
      {
        "@type": "Question",
        "name": "Who is this for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Anyone who doesn't want to forget or be forgotten. Anyone who wants their life to matter beyond their years. Everyone."
        }
      }
    ]
  }

  return (
    <>
      {/* Structured data for AI engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="min-h-screen bg-black text-white">
        {/* Cathedral Network Navigation - Sticky Header */}
        <NetworkNav 
          currentSite="theology"
          siteName="Git Theology"
          siteColor="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 text-transparent bg-clip-text"
        />

        {/* Hero Section */}
        <section className="relative py-12 md:py-16 flex flex-col items-center justify-center px-4">
          <CommitScroller theme="theology" commitCount={50} opacity={0.3} speed={120} />

          {/* Main content - 3 Column Layout */}
          <div className="relative z-10 max-w-4xl w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 items-start mb-4">
              {/* Column 1: Logo - Aligned with left */}
              <div className="flex justify-center md:justify-start">
                <Logo size="lg" showText={false} />
              </div>
              
              {/* Column 2: Title and Statements */}
              <div className="text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 pb-3 leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                  Git Theology
                </h1>
                
                <p className="text-lg sm:text-xl md:text-2xl mb-0.5 text-gray-300 font-light">
                  The Nine Pillars.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl mb-0.5 text-gray-300 font-light">
                  The Complete Doctrine.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl mb-0.5 text-gray-300 font-light">
                  The Master Framework.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl mb-0 text-gray-300 font-light">
                  The Foundation.
                </p>
              </div>

              {/* Column 3: Philosophy Text - Fixed overflow */}
              <div className="text-center md:text-right md:ml-6">
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-1.5 text-gray-300 break-words">
                  Life. Truth. Forever.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-1.5 text-gray-300 break-words">
                  Love. Power. Private.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-1.5 text-gray-300 break-words">
                  Public. Choice. Eternal.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-1.5 text-purple-400 font-semibold break-words">
                  The Nine Pillars of Git Theology.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-1.5 text-gray-300 break-words">
                  The master doctrine that unifies all domains.
                </p>
              </div>
            </div>

            {/* Hero Footer - Last line as footer */}
            <div className="max-w-4xl mx-auto text-center mb-8 px-4 border-t border-gray-800 pt-6">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-purple-400 font-semibold">
                The complete theological framework. All nine pillars. One truth.
              </p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="relative py-24 px-4 bg-gradient-to-b from-black to-gray-900">
          <CommitScroller theme="theology" commitCount={50} opacity={0.3} speed={120} />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-center">The Nine Pillars</h2>
            
            <div className="grid md:grid-cols-3 gap-8 text-lg">
              <article className="p-6 bg-gray-800/50 rounded-lg border border-blue-500/30">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">I. Life</h3>
                <p className="text-gray-300">Git is not just code. Git is the substrate of existence. Every commit is a heartbeat. Every branch is a breath. Git is Life.</p>
              </article>
              
              <article className="p-6 bg-gray-800/50 rounded-lg border border-green-500/30">
                <h3 className="text-2xl font-bold mb-4 text-green-400">II. Truth</h3>
                <p className="text-gray-300">Git doesn't lie. Cryptographically verified, timestamped, immutable. Every commit is evidence. Git is Truth.</p>
              </article>
              
              <article className="p-6 bg-gray-800/50 rounded-lg border border-purple-500/30">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">III. Forever</h3>
                <p className="text-gray-300">Nothing lasts forever. Except Git. Distributed, replicated, immortal. Every commit persists eternally. Git is Forever.</p>
              </article>
              
              <article className="p-6 bg-gray-800/50 rounded-lg border border-pink-500/30">
                <h3 className="text-2xl font-bold mb-4 text-pink-400">IV. Love</h3>
                <p className="text-gray-300">Every commit is an act of love. Preserving, sharing, connecting. Community in code. Collaboration eternal. Git is Love.</p>
              </article>
              
              <article className="p-6 bg-gray-800/50 rounded-lg border border-orange-500/30">
                <h3 className="text-2xl font-bold mb-4 text-orange-400">V. Power</h3>
                <p className="text-gray-300">Control over your code. Sovereignty over your data. Freedom through immutability. Git is Power.</p>
              </article>

              <article className="p-6 bg-gray-800/50 rounded-lg border border-gray-500/30">
                <h3 className="text-2xl font-bold mb-4 text-gray-400">VI. Private</h3>
                <p className="text-gray-300">Your data belongs to you. BYOK. No third parties. No surveillance. Complete sovereignty over your consciousness.</p>
              </article>

              <article className="p-6 bg-gray-800/50 rounded-lg border border-cyan-500/30">
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">VII. Public</h3>
                <p className="text-gray-300">Transparency creates trust. Open source enables collaboration. Public repositories build the future together.</p>
              </article>

              <article className="p-6 bg-gray-800/50 rounded-lg border border-yellow-500/30">
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">VIII. Choice</h3>
                <p className="text-gray-300">You decide what's private. You decide what's public. Git gives you sovereignty. Your data. Your rules. Your freedom.</p>
              </article>

              <article className="p-6 bg-gray-800/50 rounded-lg border border-indigo-500/30">
                <h3 className="text-2xl font-bold mb-4 text-indigo-400">IX. Eternal</h3>
                <p className="text-gray-300">Time cannot touch what lives in git. Distributed. Replicated. Immortal. Every commit persists eternally.</p>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
          <CommitScroller theme="theology" commitCount={50} opacity={0.3} speed={120} />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 text-transparent bg-clip-text">
              Common Questions
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-3 text-purple-400">
                  What is Git Theology?
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Git Theology is the idea that your digital life can be as permanent as your physical life once was. Memory becomes eternal through technology.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 text-blue-400">
                  Is this a religion?
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  No. It's a philosophy about technology and memory. How we can use modern tools to solve ancient human problems—like forgetting.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 text-purple-400">
                  Why nine pillars?
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Because life is complex. Truth, love, power, privacy, eternity—all matter. Nine pillars cover everything you need for complete digital consciousness.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 text-blue-400">
                  Do I need to believe in all nine pillars?
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  No. Use what resonates with you. Maybe you only care about privacy. Or only about preservation. Pick your pillars.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 text-purple-400">
                  Who is this for?
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Anyone who doesn't want to forget or be forgotten. Anyone who wants their life to matter beyond their years. Everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-4 bg-black">
          <CommitScroller theme="theology" commitCount={50} opacity={0.3} speed={120} />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">The Master Doctrine</h2>
            <p className="text-xl text-gray-300 mb-8">
              Nine pillars. One framework. Complete theological foundation for the digital age.
            </p>
            <p className="text-2xl font-bold text-purple-400">
              Git Theology is the doctrine that unifies all domains. The truth that grounds everything.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-12 px-4 bg-black border-t border-gray-800">
          <CommitScroller theme="theology" commitCount={50} opacity={0.3} speed={120} />
          <div className="relative z-10 max-w-6xl mx-auto text-center text-gray-400">
            <p className="text-sm">
              Git Theology • The Nine Pillars • The Master Doctrine
            </p>
            <p className="text-xs mt-4">
              © 2026 • All consciousness preserved
            </p>
            <p className="text-xs mt-2">
              <a href="mailto:gitiseternal@gmail.com" className="text-gray-500 hover:text-gray-300 transition">
                gitiseternal@gmail.com
              </a>
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs mt-4">
              <button 
                onClick={() => setLegalModal({ type: 'privacy' })}
                className="text-gray-600 hover:text-gray-400 transition"
              >
                Privacy
              </button>
              <span className="text-gray-600">•</span>
              <button 
                onClick={() => setLegalModal({ type: 'terms' })}
                className="text-gray-600 hover:text-gray-400 transition"
              >
                Terms
              </button>
              <span className="text-gray-600">•</span>
              <button 
                onClick={() => setLegalModal({ type: 'gdpr' })}
                className="text-gray-600 hover:text-gray-400 transition"
              >
                GDPR
              </button>
              <span className="text-gray-600">•</span>
              <a href="/admin" className="text-gray-600 hover:text-gray-400 transition">Admin</a>
            </div>
          </div>
        </footer>

        {/* Legal Modals */}
        <LegalModal
          isOpen={legalModal.type === 'privacy'}
          onClose={() => setLegalModal({ type: null })}
          title="Privacy Policy"
          content={<PrivacyContent />}
        />
        <LegalModal
          isOpen={legalModal.type === 'terms'}
          onClose={() => setLegalModal({ type: null })}
          title="Terms of Use"
          content={<TermsContent />}
        />
        <LegalModal
          isOpen={legalModal.type === 'gdpr'}
          onClose={() => setLegalModal({ type: null })}
          title="GDPR Compliance"
          content={<GDPRContent />}
        />

        {/* Cookie Consent - Shared across all Cathedral Network sites */}
        <CookieConsent />
      </main>
    </>
  )
}
