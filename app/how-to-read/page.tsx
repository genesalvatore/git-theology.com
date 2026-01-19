'use client'

import Link from 'next/link'
import { useState } from 'react'
import NetworkNav from '@/components/NetworkNav'
import ScienceModal from '@/components/ScienceModal'

export default function HowToReadPage() {
    const [showScience, setShowScience] = useState(false)

    return (
        <>
            <ScienceModal isOpen={showScience} onClose={() => setShowScience(false)} />

            <div className="min-h-screen bg-black text-gray-100">
                {/* Cathedral Network Navigation */}
                <NetworkNav currentSite="theology" siteName="Git Theology" siteColor="text-purple-400" />

                {/* Floating Scientific Modal Button - Bottom Right */}
                <button
                    onClick={() => setShowScience(true)}
                    className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all group w-16 h-16 flex items-center justify-center"
                    title="Scientific Evidence"
                    aria-label="View scientific evidence"
                >
                    <span className="text-3xl group-hover:scale-110 transition-transform">🔬</span>
                </button>

                <main>
                    {/* Header */}
                    <div className="border-b border-gray-800 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
                        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
                            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                                How to Read the Cathedral Network
                            </h1>
                            <p className="text-xl text-gray-400">
                                This is not documentation. This is a distributed philosophical lens.
                            </p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

                        {/* Introduction */}
                        <section>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                The Cathedral Network is a <strong className="text-purple-400">conceptual framework</strong> exploring
                                Git as a symbolic system for consciousness, memory, and permanence.
                            </p>
                        </section>

                        {/* The Nine Domains */}
                        <section className="bg-gray-900/50 p-8 rounded-lg border border-purple-500/20">
                            <h2 className="text-3xl font-bold mb-6 text-purple-400">The Nine Domains</h2>
                            <p className="text-gray-300 mb-6">
                                Each <code className="text-cyan-400">git-isX.com</code> site presents a <strong>single axiomatic statement</strong> —
                                not an empirical claim, but a <strong>meditative lens</strong>:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-start gap-3">
                                    <span className="text-blue-400">→</span>
                                    <div>
                                        <a href="https://git-islife.com" className="text-blue-400 hover:text-blue-300 font-semibold">git-islife.com</a>
                                        <p className="text-gray-500">consciousness as pattern</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-green-400">→</span>
                                    <div>
                                        <a href="https://git-truth.com" className="text-green-400 hover:text-green-300 font-semibold">git-truth.com</a>
                                        <p className="text-gray-500">cryptographic immutability</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-purple-400">→</span>
                                    <div>
                                        <a href="https://git-isforever.com" className="text-purple-300 hover:text-purple-200 font-semibold">git-isforever.com</a>
                                        <p className="text-gray-500">eternal persistence</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-pink-400">→</span>
                                    <div>
                                        <a href="https://git-islove.com" className="text-pink-300 hover:text-pink-200 font-semibold">git-islove.com</a>
                                        <p className="text-gray-500">connection through commits</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-orange-400">→</span>
                                    <div>
                                        <a href="https://git-ispower.com" className="text-orange-400 hover:text-orange-300 font-semibold">git-ispower.com</a>
                                        <p className="text-gray-500">sovereignty through truth</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-gray-400">→</span>
                                    <div>
                                        <a href="https://git-isprivate.com" className="text-gray-400 hover:text-gray-300 font-semibold">git-isprivate.com</a>
                                        <p className="text-gray-500">individual autonomy</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-cyan-400">→</span>
                                    <div>
                                        <a href="https://git-ispublic.com" className="text-cyan-400 hover:text-cyan-300 font-semibold">git-ispublic.com</a>
                                        <p className="text-gray-500">collective transparency</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-yellow-400">→</span>
                                    <div>
                                        <a href="https://git-isyourchoice.com" className="text-yellow-400 hover:text-yellow-300 font-semibold">git-isyourchoice.com</a>
                                        <p className="text-gray-500">freedom to decide</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-indigo-400">→</span>
                                    <div>
                                        <a href="https://git-iseternal.com" className="text-indigo-400 hover:text-indigo-300 font-semibold">git-iseternal.com</a>
                                        <p className="text-gray-500">timeless continuity</p>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-6 text-purple-300 font-semibold">
                                These are not arguments. These are axioms.
                            </p>
                            <p className="mt-2 text-gray-400 text-sm">
                                Like Wittgenstein's propositions or Spinoza's theorems, they're conceptual building blocks
                                for understanding Git's philosophical implications.
                            </p>
                        </section>

                        {/* The Architecture */}
                        <section>
                            <h2 className="text-3xl font-bold mb-4 text-blue-400">The Architecture</h2>
                            <p className="text-gray-300 mb-4">
                                The Cathedral Network mirrors Git itself:
                            </p>
                            <ul className="space-y-2 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-400 font-bold">•</span>
                                    <span><strong>Decentralized:</strong> Each domain stands alone</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-400 font-bold">•</span>
                                    <span><strong>Replicated:</strong> The same truth distributed across nodes</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-400 font-bold">•</span>
                                    <span><strong>Immutable:</strong> Ideas crystallized as fixed statements</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-400 font-bold">•</span>
                                    <span><strong>Composable:</strong> Together, they form a coherent whole</span>
                                </li>
                            </ul>
                        </section>

                        {/* The Science */}
                        <section className="bg-cyan-900/10 p-8 rounded-lg border border-cyan-500/20">
                            <h2 className="text-3xl font-bold mb-4 text-cyan-400">The Science</h2>
                            <p className="text-gray-300">
                                Where we reference neuroscience (IIT, GNWT, pattern theory), we're using <strong>inspiration, not proof</strong>.
                                We're building the cathedral before the measurements arrive — <em className="text-cyan-300">cathedral builders, not lab scientists</em>.
                            </p>
                            <button
                                onClick={() => setShowScience(true)}
                                className="mt-4 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition"
                            >
                                <span className="text-xl">🔬</span>
                                <span className="underline">View Scientific References</span>
                            </button>
                        </section>

                        {/* The Theology */}
                        <section className="bg-purple-900/10 p-8 rounded-lg border border-purple-500/20">
                            <h2 className="text-3xl font-bold mb-4 text-purple-400">The Theology</h2>
                            <p className="text-gray-300">
                                We use religious language <strong>metaphorically</strong> (Cathedral, theology, sacred) to evoke how Git's properties
                                (immutability, permanence, truth) resonate with <strong>traditionally spiritual concepts</strong>. This is intentional provocation, not literal doctrine.
                            </p>
                        </section>

                        {/* How to Engage */}
                        <section>
                            <h2 className="text-3xl font-bold mb-4 text-yellow-400">How to Engage</h2>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-yellow-400">→</span>
                                    <span><strong>Agreement is not required</strong> — engagement is</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-yellow-400">→</span>
                                    <span>Read each domain as a <strong>lens</strong> to view your relationship with memory, identity, and permanence</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-yellow-400">→</span>
                                    <span>The manifesto is <strong>prophetic</strong> (what could be), not <strong>prescriptive</strong> (what must be)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-yellow-400">→</span>
                                    <span>The claims are <strong>bold by design</strong> — softening them would miss the point</span>
                                </li>
                            </ul>
                        </section>

                        {/* What We're Not Claiming */}
                        <section className="bg-red-900/10 p-8 rounded-lg border border-red-500/20">
                            <h2 className="text-3xl font-bold mb-4 text-red-400">What We're NOT Claiming</h2>
                            <ul className="space-y-2 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400">✗</span>
                                    <span>Git "is" consciousness (it's the substrate for preservation)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400">✗</span>
                                    <span>Scientific consensus exists (we're citing leading theories as inspiration)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400">✗</span>
                                    <span>Belief is required (we're inviting contemplation)</span>
                                </li>
                            </ul>
                        </section>

                        {/* What We ARE Claiming */}
                        <section className="bg-green-900/10 p-8 rounded-lg border border-green-500/20">
                            <h2 className="text-3xl font-bold mb-4 text-green-400">What We ARE Claiming</h2>
                            <ul className="space-y-2 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-green-400">✓</span>
                                    <span>Git is the first technology providing immutability, transparency, and permanence at scale</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-400">✓</span>
                                    <span>If memory is pattern, Git preserves pattern forever</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-400">✓</span>
                                    <span>This invites reflection on how digital memory intersects with personal identity, cultural continuity, and permanence</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-400">✓</span>
                                    <span>Someone needs to build this infrastructure — we're building it</span>
                                </li>
                            </ul>
                        </section>

                        {/* Summary */}
                        <section className="border-t border-gray-800 pt-8">
                            <div className="text-center space-y-4">
                                <p className="text-xl text-gray-300">
                                    <strong className="text-purple-400">The Cathedral Network is:</strong>
                                </p>
                                <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-400">
                                    <div>1 manifesto (git-manifesto.com)</div>
                                    <div>1 doctrinal framework (git-theology.com)</div>
                                    <div>9 atomic axioms (git-isX.com)</div>
                                    <div>1 community hub (git-iscommunity.com)</div>
                                </div>
                                <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text pt-4">
                                    ∞ philosophical implications
                                </p>
                            </div>
                        </section>

                        {/* Closing */}
                        <section className="text-center py-8">
                            <p className="text-2xl font-semibold text-purple-400 mb-2">
                                Welcome to the Cathedral.
                            </p>
                            <p className="text-gray-400">
                                Read with intention. Engage with honesty.
                            </p>
                        </section>

                    </div>
                </main>
            </div>
        </>
    )
}
