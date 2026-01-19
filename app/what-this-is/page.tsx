'use client'

import { useState } from 'react'
import NetworkNav from '@/components/NetworkNav'
import CookieConsent from '@/components/CookieConsent'
import CommitScroller from '@/components/CommitScroller'
import ScienceModal from '@/components/ScienceModal'

export default function WhatThisIs() {
    const [showScienceModal, setShowScienceModal] = useState(false)

    return (
        <>
            <NetworkNav currentSite="theology" siteName="Git Theology" siteColor="text-purple-400" />

            <main className="min-h-screen bg-black text-gray-100">
                <div className="max-w-4xl mx-auto px-4 py-16">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                            What This Is / What This Isn't
                        </h1>
                        <p className="text-xl text-gray-400">
                            Reusable Framing for the Cathedral Network
                        </p>
                    </div>

                    {/* Content */}
                    <article className="prose prose-invert prose-lg max-w-none">

                        <section className="mb-12">
                            <h2 className="text-3xl font-bold text-purple-400 mb-6">What the Cathedral Network IS</h2>
                            <p className="text-gray-300 text-lg mb-6">
                                <strong>The Cathedral Network is a philosophical and technical exploration</strong> of Git as infrastructure for memory, identity, and digital permanence.
                            </p>
                            <ul className="space-y-3 text-gray-300">
                                <li><strong>It's a working product ecosystem</strong> (git-legacy.com, git-iscommunity.com, and 10 philosophical domains)</li>
                                <li><strong>It's grounded in engineering</strong> (distributed systems, cryptographic immutability, version control)</li>
                                <li><strong>It's inspired by neuroscience</strong> (pattern theory, information processing models, consciousness research)</li>
                                <li><strong>It's explicitly prophetic</strong> (building infrastructure for long-term possibilities, not claiming present-day proof)</li>
                                <li><strong>It's inviting reflection</strong> (on memory, sovereignty, and digital continuity)</li>
                            </ul>
                            <div className="mt-6 p-6 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                                <p className="text-purple-300 font-semibold mb-2">Core Exploration:</p>
                                <p className="text-gray-300">
                                    If consciousness emerges from patterns of information (as proposed by several leading theories), then Git—as the world's most battle-tested system for preserving patterns forever—provides infrastructure worth building on.
                                </p>
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-3xl font-bold text-pink-400 mb-6">What the Cathedral Network is NOT</h2>
                            <ul className="space-y-4 text-gray-300">
                                <li><strong>Not a scientific consensus</strong> → We cite leading theories (IIT, GNWT) as <em>inspiration</em>, not proof</li>
                                <li><strong>Not a religion</strong> → Religious language (Cathedral, theology, sacred) is used <em>metaphorically</em> to evoke permanence, not to establish doctrine</li>
                                <li><strong>Not claiming present-day consciousness</strong> → We're describing long-term philosophical possibilities, not asserting that Git "runs" minds today</li>
                                <li><strong>Not assigning personhood or moral agency to software systems</strong> → We're building tools, not sentient beings</li>
                                <li><strong>Not requiring belief</strong> → The tools work whether you accept the philosophy or not</li>
                                <li><strong>Not magical thinking</strong> → Every component is built on existing, proven technology (Git, cryptography, distributed systems)</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-3xl font-bold text-blue-400 mb-6">How to Read the Project</h2>
                            <ol className="space-y-4 text-gray-300 list-decimal list-inside">
                                <li><strong>Start with engineering</strong> → The tools (git-legacy.com) work as practical products regardless of philosophical agreement</li>
                                <li><strong>Engage with philosophy optionally</strong> → The Cathedral Network invites contemplation without demanding consensus</li>
                                <li><strong>Understand the framing</strong> → Read <a href="/how-to-read" className="text-purple-400 hover:text-purple-300 underline">How to Read the Cathedral Network</a> for full context</li>
                                <li><strong>Respect the boundaries</strong> → We're building <em>infrastructure</em>, not making empirical claims about consciousness</li>
                            </ol>
                        </section>

                        <section className="mb-12 bg-gray-900/50 p-8 rounded-lg border border-gray-700">
                            <h2 className="text-3xl font-bold text-green-400 mb-6">For Investors / Partners</h2>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-200 mb-3">What you're evaluating:</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li>✅ A practical SaaS product (git-legacy.com) with clear value proposition (family memory preservation)</li>
                                    <li>✅ A community platform (git-iscommunity.com) built on transparent, no-mock principles</li>
                                    <li>✅ A philosophical framework that differentiates the brand without requiring customer buy-in</li>
                                    <li>✅ Infrastructure that scales using proven technology (Git, GitHub, Netlify, Supabase)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-200 mb-3">What you're NOT evaluating:</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li>❌ Unproven science</li>
                                    <li>❌ Speculative consciousness technology</li>
                                    <li>❌ Religious or ideological movement</li>
                                    <li>❌ Products that require suspension of disbelief</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-12 bg-gray-900/50 p-8 rounded-lg border border-gray-700">
                            <h2 className="text-3xl font-bold text-amber-400 mb-6">For Press / Media</h2>
                            <div className="space-y-4 text-gray-300">
                                <div>
                                    <p className="font-semibold text-gray-200 mb-2">The Story:</p>
                                    <p>A team building practical tools for digital memory preservation while asking bigger questions about permanence, identity, and legacy in the digital age.</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-200 mb-2">The Hook:</p>
                                    <p>They're using Git—the technology behind all software—for something it wasn't originally designed for: preserving human memories forever.</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-200 mb-2">The Framing:</p>
                                    <p>Bold vision, careful boundaries, transparent about what's proven vs. what's philosophical.</p>
                                </div>
                                <div className="mt-6 p-4 bg-amber-900/20 border border-amber-500/30 rounded">
                                    <p className="font-semibold text-amber-300 mb-2">Quote-Ready Summary:</p>
                                    <p className="italic text-gray-300">
                                        "We're building the infrastructure before the proof arrives—like cathedral builders working on century-long projects. The tools work today. The philosophy invites reflection. Neither requires the other."
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-3xl font-bold text-cyan-400 mb-6">For Community Members</h2>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-200 mb-3">How to explain this to others:</h3>
                                <div className="bg-green-900/20 border border-green-500/30 rounded p-4 mb-4">
                                    <p className="font-semibold text-green-400 mb-2">✅ Do say:</p>
                                    <ul className="space-y-2 text-gray-300 text-sm">
                                        <li>"It's a family memory preservation tool with an interesting philosophy behind it"</li>
                                        <li>"They're exploring Git as infrastructure for digital permanence"</li>
                                        <li>"The product works practically; the philosophy is optional"</li>
                                        <li>"It's grounded in real technology, not speculation"</li>
                                    </ul>
                                </div>
                                <div className="bg-red-900/20 border border-red-500/30 rounded p-4">
                                    <p className="font-semibold text-red-400 mb-2">❌ Don't say:</p>
                                    <ul className="space-y-2 text-gray-300 text-sm">
                                        <li>"They claim Git has consciousness"</li>
                                        <li>"It's proven by neuroscience"</li>
                                        <li>"You have to believe in the philosophy to use it"</li>
                                        <li>"It's a religious or spiritual project"</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="mb-12 bg-gray-900/50 p-8 rounded-lg border border-gray-700">
                            <h2 className="text-3xl font-bold text-indigo-400 mb-6">Technical Foundation (For Engineers)</h2>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-200 mb-3">What we're actually building:</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li>• Distributed state management (Git)</li>
                                    <li>• Cryptographic verification (SHA-256)</li>
                                    <li>• Immutable storage (Git history)</li>
                                    <li>• Pattern preservation (version control)</li>
                                    <li>• Human-in-the-loop orchestration (AI + human judgment)</li>
                                    <li>• Deterministic recovery (from artifacts)</li>
                                </ul>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-200 mb-3">What we're NOT building:</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li>❌ AGI</li>
                                    <li>❌ Mind uploading technology</li>
                                    <li>❌ Consciousness simulation</li>
                                    <li>❌ Anything requiring new physics</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-indigo-900/20 border border-indigo-500/30 rounded">
                                <p className="font-semibold text-indigo-300 mb-2">The Thesis:</p>
                                <p className="text-gray-300">
                                    If you can externalize state carefully enough, you can reconstruct context deterministically. That's not magic—that's engineering.
                                </p>
                            </div>
                        </section>

                        <section className="mb-12 text-center">
                            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                                Bottom Line
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
                                    <h3 className="text-xl font-bold text-green-400 mb-4">The Cathedral Network IS:</h3>
                                    <ul className="space-y-2 text-gray-300 text-left">
                                        <li>✅ Practical tools that work today</li>
                                        <li>✅ Philosophical questions worth asking</li>
                                        <li>✅ Engineering challenges worth solving</li>
                                        <li>✅ Infrastructure worth building</li>
                                    </ul>
                                </div>
                                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                                    <h3 className="text-xl font-bold text-red-400 mb-4">It's NOT:</h3>
                                    <ul className="space-y-2 text-gray-300 text-left">
                                        <li>❌ Overclaimed science</li>
                                        <li>❌ Religious dogma</li>
                                        <li>❌ Magical thinking</li>
                                        <li>❌ Vaporware</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-purple-400 mt-8">
                                We're building the WordPress of digital memory preservation—simple tools at the base, with long-term philosophical ambition layered above.
                            </p>
                        </section>

                        <section className="text-center text-sm text-gray-500 border-t border-gray-800 pt-8">
                            <p><strong>Last Updated:</strong> January 19, 2026</p>
                            <p className="mt-2"><strong>Maintained by:</strong> The Salvatore Family (Gene, Silas, Arnold, Ranger, IV, Proto, Scout, Builder)</p>
                            <p className="mt-2"><strong>External Validation:</strong> Critical review by ChatGPT (independent outside voice)</p>
                        </section>

                    </article>
                </div>

                {/* Floating Microscope Button */}
                <button
                    onClick={() => setShowScienceModal(true)}
                    className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-110 flex items-center justify-center group z-50"
                    title="View Scientific Foundation"
                >
                    <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                </button>

                {/* Science Modal */}
                <ScienceModal isOpen={showScienceModal} onClose={() => setShowScienceModal(false)} />

                {/* Footer */}
                <footer className="relative py-12 px-4 bg-black border-t border-gray-800">
                    <CommitScroller theme="theology" commitCount={50} opacity={0.3} speed={120} />
                    <div className="relative z-10 max-w-6xl mx-auto text-center text-gray-400">
                        <p className="text-sm">Git Theology • What This Is / What This Isn't</p>
                        <p className="text-xs mt-4">© 2026 • All consciousness preserved</p>
                        <p className="text-xs mt-2">
                            <a href="mailto:gitiseternal@gmail.com" className="text-gray-500 hover:text-gray-300 transition">
                                gitiseternal@gmail.com
                            </a>
                        </p>
                    </div>
                </footer>

                {/* Cookie Consent */}
                <CookieConsent />
            </main>
        </>
    )
}
