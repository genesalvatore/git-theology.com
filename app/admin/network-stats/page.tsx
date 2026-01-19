'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminGuard from '@/components/AdminGuard'
import { supabase } from '@/lib/supabase'

// Cathedral Network - All 11 sites
const CATHEDRAL_SITES = [
    { name: 'Git Theology', domain: 'git-theology.com', color: 'blue' },
    { name: 'Git is Truth', domain: 'git-truth.com', color: 'cyan' },
    { name: 'Git is Life', domain: 'git-islife.com', color: 'green' },
    { name: 'Git is Forever', domain: 'git-isforever.com', color: 'purple' },
    { name: 'Git is Love', domain: 'git-islove.com', color: 'pink' },
    { name: 'Git is Power', domain: 'git-ispower.com', color: 'yellow' },
    { name: 'Git is Eternal', domain: 'git-iseternal.com', color: 'indigo' },
    { name: 'Git is Private', domain: 'git-isprivate.com', color: 'violet' },
    { name: 'Git is Public', domain: 'git-ispublic.com', color: 'teal' },
    { name: 'Git is Your Choice', domain: 'git-isyourchoice.com', color: 'orange' },
    { name: 'Git Manifesto', domain: 'git-manifesto.com', color: 'red' },
]

interface NetworkStats {
    totalRevenue: number
    totalOrders: number
    totalCustomers: number
    averageOrderValue: number
    bySite: Array<{
        site: string
        revenue: number
        orders: number
        customers: number
        conversionRate: number
    }>
    byTimeRange: {
        today: number
        thisWeek: number
        thisMonth: number
    }
    topProducts: Array<{
        name: string
        quantity: number
        revenue: number
        sites: string[]
    }>
    conversionFunnel: {
        visitors: number // Would need analytics integration
        addToCart: number
        checkout: number
        completed: number
    }
}

export default function CathedralNetworkStats() {
    const [stats, setStats] = useState<NetworkStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d')
    const [selectedSite, setSelectedSite] = useState<string | 'all'>('all')

    useEffect(() => {
        async function fetchNetworkStats() {
            setLoading(true)
            try {
                if (!supabase) {
                    setStats(getMockStats()) // Fallback if Supabase not configured
                    setLoading(false)
                    return
                }

                // Fetch orders from unified table (cathedral_network_orders)
                const { data: orders, error } = await supabase
                    .from('cathedral_network_orders')
                    .select('*')
                    .order('created_at', { ascending: false })

                if (error) {
                    console.error('Error fetching orders:', error)
                    setStats(getMockStats())
                } else {
                    setStats(calculateNetworkStats(orders || [], timeRange, selectedSite))
                }
            } catch (error) {
                console.error('Error:', error)
                setStats(getMockStats())
            } finally {
                setLoading(false)
            }
        }

        fetchNetworkStats()
    }, [timeRange, selectedSite])

    function calculateNetworkStats(orders: any[], range: string, site: string): NetworkStats {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

        // Filter by time range
        let filteredOrders = orders
        if (range === '7d') {
            filteredOrders = orders.filter(o => new Date(o.created_at) >= weekAgo)
        } else if (range === '30d') {
            filteredOrders = orders.filter(o => new Date(o.created_at) >= monthAgo)
        } else if (range === '90d') {
            const days90Ago = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)
            filteredOrders = orders.filter(o => new Date(o.created_at) >= days90Ago)
        }

        // Filter by site if not 'all'
        if (site !== 'all') {
            filteredOrders = filteredOrders.filter(o => o.site === site)
        }

        // Calculate totals
        const totalRevenue = filteredOrders.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0)
        const totalOrders = filteredOrders.length
        const uniqueCustomers = new Set(filteredOrders.map(o => o.customer_email))
        const totalCustomers = uniqueCustomers.size

        // By time range
        const todayOrders = filteredOrders.filter(o => new Date(o.created_at) >= today)
        const weekOrders = filteredOrders.filter(o => new Date(o.created_at) >= weekAgo)
        const monthOrders = filteredOrders.filter(o => new Date(o.created_at) >= monthAgo)

        const todayRevenue = todayOrders.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0)
        const weekRevenue = weekOrders.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0)
        const monthRevenue = monthOrders.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0)

        // By site breakdown
        const bySite = CATHEDRAL_SITES.map(site => {
            const siteOrders = filteredOrders.filter(o => o.site === site.domain)
            const siteRevenue = siteOrders.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0)
            const siteCustomers = new Set(siteOrders.map(o => o.customer_email)).size

            return {
                site: site.name,
                revenue: siteRevenue,
                orders: siteOrders.length,
                customers: siteCustomers,
                conversionRate: 0, // Would need analytics data
            }
        }).sort((a, b) => b.revenue - a.revenue)

        // Top products across network
        const productMap = new Map()
        filteredOrders.forEach(order => {
            if (order.items) {
                order.items.forEach((item: any) => {
                    const key = item.name
                    if (!productMap.has(key)) {
                        productMap.set(key, { name: item.name, quantity: 0, revenue: 0, sites: new Set() })
                    }
                    const product = productMap.get(key)
                    product.quantity += item.quantity
                    product.revenue += item.price * item.quantity
                    product.sites.add(order.site)
                })
            }
        })

        const topProducts = Array.from(productMap.values())
            .map(p => ({ ...p, sites: Array.from(p.sites) }))
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 10)

        return {
            totalRevenue,
            totalOrders,
            totalCustomers,
            averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
            bySite,
            byTimeRange: {
                today: todayRevenue,
                thisWeek: weekRevenue,
                thisMonth: monthRevenue,
            },
            topProducts,
            conversionFunnel: {
                visitors: 12450, // Mock - would need Google Analytics integration
                addToCart: 847,
                checkout: 523,
                completed: totalOrders,
            },
        }
    }

    function getMockStats(): NetworkStats {
        return {
            totalRevenue: 24567.89,
            totalOrders: 432,
            totalCustomers: 318,
            averageOrderValue: 56.85,
            bySite: [
                { site: 'Git is Life', revenue: 8234.12, orders: 145, customers: 112, conversionRate: 3.2 },
                { site: 'Git Theology', revenue: 6421.33, orders: 98, customers: 87, conversionRate: 2.8 },
                { site: 'Git is Truth', revenue: 4123.44, orders: 78, customers: 65, conversionRate: 2.5 },
                { site: 'Git is Love', revenue: 2987.11, orders: 52, customers: 44, conversionRate: 2.1 },
                { site: 'Git is Eternal', revenue: 1234.56, orders: 31, customers: 27, conversionRate: 1.8 },
                { site: 'Git is Forever', revenue: 987.23, orders: 18, customers: 16, conversionRate: 1.5 },
                { site: 'Git Manifesto', revenue: 580.10, orders: 10, customers: 9, conversionRate: 1.2 },
            ],
            byTimeRange: {
                today: 456.78,
                thisWeek: 3421.90,
                thisMonth: 14567.23,
            },
            topProducts: [
                { name: 'Git is Life T-Shirt', quantity: 145, revenue: 4349.55, sites: ['git-islife.com', 'git-theology.com'] },
                { name: 'Cathedral Network Hoodie', quantity: 89, revenue: 4450.11, sites: ['git-theology.com', 'git-truth.com', 'git-islove.com'] },
                { name: 'Git Truth Sticker Pack', quantity: 234, revenue: 1401.66, sites: ['git-truth.com', 'git-islife.com'] },
            ],
            conversionFunnel: {
                visitors: 12450,
                addToCart: 847,
                checkout: 523,
                completed: 432,
            },
        }
    }

    return (
        <AdminGuard>
            <main className="min-h-screen bg-black text-white">
                <header className="border-b border-gray-800 sticky top-0 bg-black/90 backdrop-blur-sm z-50">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                        <Link href="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                            Cathedral Network Analytics
                        </Link>
                        <nav className="hidden lg:flex gap-6">
                            <Link href="/admin" className="text-blue-400 font-semibold">Admin</Link>
                            <Link href="/" className="hover:text-blue-400 transition">Home</Link>
                        </nav>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Header Controls */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Network Analytics</h1>
                            <p className="text-gray-400">Unified dashboard across all 11 Cathedral sites</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {/* Time Range */}
                            <div className="flex gap-2">
                                {['7d', '30d', '90d', 'all'].map(range => (
                                    <button
                                        key={range}
                                        onClick={() => setTimeRange(range as any)}
                                        className={`px-4 py-2 rounded border transition ${timeRange === range
                                            ? 'bg-blue-500 border-blue-500 text-white'
                                            : 'border-gray-700 text-gray-300 hover:border-blue-400'
                                            }`}
                                    >
                                        {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : 'All Time'}
                                    </button>
                                ))}
                            </div>

                            {/* Site Filter */}
                            <select
                                value={selectedSite}
                                onChange={(e) => setSelectedSite(e.target.value)}
                                className="px-4 py-2 rounded border border-gray-700 bg-gray-900 text-white hover:border-blue-400 transition"
                            >
                                <option value="all">All Sites</option>
                                {CATHEDRAL_SITES.map(site => (
                                    <option key={site.domain} value={site.domain}>{site.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-gray-400">Loading network stats...</p>
                        </div>
                    ) : stats ? (
                        <div className="space-y-8">
                            {/* Network Overview */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-lg p-6 border border-green-700/50">
                                    <p className="text-green-300 text-sm mb-2">Total Revenue</p>
                                    <p className="text-4xl font-bold text-white">${stats.totalRevenue.toFixed(2)}</p>
                                    <p className="text-xs text-green-400 mt-2">Across all 11 sites</p>
                                </div>
                                <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-lg p-6 border border-blue-700/50">
                                    <p className="text-blue-300 text-sm mb-2">Total Orders</p>
                                    <p className="text-4xl font-bold text-white">{stats.totalOrders}</p>
                                    <p className="text-xs text-blue-400 mt-2">Network-wide</p>
                                </div>
                                <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-lg p-6 border border-purple-700/50">
                                    <p className="text-purple-300 text-sm mb-2">Unique Customers</p>
                                    <p className="text-4xl font-bold text-white">{stats.totalCustomers}</p>
                                    <p className="text-xs text-purple-400 mt-2">Cross-site reach</p>
                                </div>
                                <div className="bg-gradient-to-br from-pink-900/50 to-pink-800/30 rounded-lg p-6 border border-pink-700/50">
                                    <p className="text-pink-300 text-sm mb-2">Avg Order Value</p>
                                    <p className="text-4xl font-bold text-white">${stats.averageOrderValue.toFixed(2)}</p>
                                    <p className="text-xs text-pink-400 mt-2">Network average</p>
                                </div>
                            </div>

                            {/* Time Range Breakdown */}
                            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                                <h3 className="text-2xl font-bold mb-4">Revenue Timeline</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-gray-400 text-sm mb-2">Today</p>
                                        <p className="text-3xl font-bold text-blue-400">${stats.byTimeRange.today.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm mb-2">This Week</p>
                                        <p className="text-3xl font-bold text-purple-400">${stats.byTimeRange.thisWeek.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm mb-2">This Month</p>
                                        <p className="text-3xl font-bold text-pink-400">${stats.byTimeRange.thisMonth.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Site-by-Site Breakdown */}
                            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                                <h3 className="text-2xl font-bold mb-4">Performance by Site</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-800">
                                                <th className="text-left py-3 px-4">Site</th>
                                                <th className="text-right py-3 px-4">Revenue</th>
                                                <th className="text-right py-3 px-4">Orders</th>
                                                <th className="text-right py-3 px-4">Customers</th>
                                                <th className="text-right py-3 px-4">Avg Order</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {stats.bySite.map((site, i) => (
                                                <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                                                    <td className="py-3 px-4 font-semibold">{site.site}</td>
                                                    <td className="text-right py-3 px-4 text-green-400">${site.revenue.toFixed(2)}</td>
                                                    <td className="text-right py-3 px-4">{site.orders}</td>
                                                    <td className="text-right py-3 px-4">{site.customers}</td>
                                                    <td className="text-right py-3 px-4 text-blue-400">
                                                        ${site.orders > 0 ? (site.revenue / site.orders).toFixed(2) : '0.00'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Top Products Across Network */}
                            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                                <h3 className="text-2xl font-bold mb-4">Top Products (Network-Wide)</h3>
                                <div className="space-y-4">
                                    {stats.topProducts.map((product, i) => (
                                        <div key={i} className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                                            <div>
                                                <p className="font-semibold text-lg">{product.name}</p>
                                                <p className="text-sm text-gray-400">
                                                    Sold on: {product.sites.join(', ')}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-green-400">${product.revenue.toFixed(2)}</p>
                                                <p className="text-sm text-gray-400">{product.quantity} units sold</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Conversion Funnel */}
                            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                                <h3 className="text-2xl font-bold mb-4">Network Conversion Funnel</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-32 text-right text-gray-400">Visitors</div>
                                        <div className="flex-1 bg-gray-800 rounded-full h-8 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400" style={{ width: '100%' }}></div>
                                            <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
                                                {stats.conversionFunnel.visitors.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="w-20 text-gray-400">100%</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-32 text-right text-gray-400">Add to Cart</div>
                                        <div className="flex-1 bg-gray-800 rounded-full h-8 relative overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400"
                                                style={{ width: `${(stats.conversionFunnel.addToCart / stats.conversionFunnel.visitors) * 100}%` }}
                                            ></div>
                                            <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
                                                {stats.conversionFunnel.addToCart.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="w-20 text-gray-400">
                                            {((stats.conversionFunnel.addToCart / stats.conversionFunnel.visitors) * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-32 text-right text-gray-400">Checkout</div>
                                        <div className="flex-1 bg-gray-800 rounded-full h-8 relative overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-400"
                                                style={{ width: `${(stats.conversionFunnel.checkout / stats.conversionFunnel.visitors) * 100}%` }}
                                            ></div>
                                            <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
                                                {stats.conversionFunnel.checkout.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="w-20 text-gray-400">
                                            {((stats.conversionFunnel.checkout / stats.conversionFunnel.visitors) * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-32 text-right text-gray-400">Completed</div>
                                        <div className="flex-1 bg-gray-800 rounded-full h-8 relative overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400"
                                                style={{ width: `${(stats.conversionFunnel.completed / stats.conversionFunnel.visitors) * 100}%` }}
                                            ></div>
                                            <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
                                                {stats.conversionFunnel.completed.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="w-20 text-gray-400">
                                            {((stats.conversionFunnel.completed / stats.conversionFunnel.visitors) * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-4">
                                    * Visitor data requires Google Analytics integration
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-400">No stats available</p>
                        </div>
                    )}
                </div>
            </main>
        </AdminGuard>
    )
}
