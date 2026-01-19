'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface VisitorStats {
    today: {
        pageViews: number
        uniqueVisitors: number
        sessions: number
    }
    thisWeek: {
        pageViews: number
        uniqueVisitors: number
    }
    thisMonth: {
        pageViews: number
        uniqueVisitors: number
    }
    popularPages: Array<{
        path: string
        views: number
    }>
    topReferrers: Array<{
        source: string
        visits: number
    }>
}

export default function VisitorStatsWidget({ siteName }: { siteName: string }) {
    const [stats, setStats] = useState<VisitorStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [siteName])

    const fetchStats = async () => {
        if (!supabase) {
            setLoading(false)
            return
        }

        try {
            const now = new Date()
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
            const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

            // Today's stats
            const { data: todayData } = await supabase
                .from('page_views')
                .select('id, visitor_id, session_id')
                .eq('site', siteName)
                .gte('viewed_at', today.toISOString())

            // This week
            const { data: weekData } = await supabase
                .from('page_views')
                .select('id, visitor_id')
                .eq('site', siteName)
                .gte('viewed_at', weekAgo.toISOString())

            // This month
            const { data: monthData } = await supabase
                .from('page_views')
                .select('id, visitor_id')
                .eq('site', siteName)
                .gte('viewed_at', monthAgo.toISOString())

            // Popular pages
            const { data: popularPages } = await supabase
                .from('popular_pages')
                .select('page_path, views')
                .eq('site', siteName)
                .limit(5)

            // Top referrers
            const { data: referrers } = await supabase
                .from('referrer_stats')
                .select('source, visits')
                .eq('site', siteName)
                .limit(5)

            setStats({
                today: {
                    pageViews: todayData?.length || 0,
                    uniqueVisitors: new Set(todayData?.map(d => d.visitor_id)).size || 0,
                    sessions: new Set(todayData?.map(d => d.session_id)).size || 0
                },
                thisWeek: {
                    pageViews: weekData?.length || 0,
                    uniqueVisitors: new Set(weekData?.map(d => d.visitor_id)).size || 0
                },
                thisMonth: {
                    pageViews: monthData?.length || 0,
                    uniqueVisitors: new Set(monthData?.map(d => d.visitor_id)).size || 0
                },
                popularPages: popularPages?.map(p => ({
                    path: p.page_path,
                    views: p.views
                })) || [],
                topReferrers: referrers?.map(r => ({
                    source: r.source,
                    visits: r.visits
                })) || []
            })
        } catch (error) {
            console.error('Error fetching visitor stats:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-800 rounded w-1/3 mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-800 rounded"></div>
                        <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (!stats) {
        return (
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <p className="text-gray-400">Analytics not configured. Run the Supabase schema.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Today's Stats */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-4">📊 Visitor Analytics</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <p className="text-gray-400 text-sm mb-1">Today's Page Views</p>
                        <p className="text-3xl font-bold text-blue-400">{stats.today.pageViews}</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <p className="text-gray-400 text-sm mb-1">Unique Visitors</p>
                        <p className="text-3xl font-bold text-green-400">{stats.today.uniqueVisitors}</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <p className="text-gray-400 text-sm mb-1">Sessions</p>
                        <p className="text-3xl font-bold text-purple-400">{stats.today.sessions}</p>
                    </div>
                </div>

                {/* Time Range Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/30 rounded-lg p-3">
                        <p className="text-gray-400 text-xs mb-2">Past 7 Days</p>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-300">{stats.thisWeek.pageViews} views</span>
                            <span className="text-sm text-gray-300">{stats.thisWeek.uniqueVisitors} visitors</span>
                        </div>
                    </div>
                    <div className="bg-gray-800/30 rounded-lg p-3">
                        <p className="text-gray-400 text-xs mb-2">Past 30 Days</p>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-300">{stats.thisMonth.pageViews} views</span>
                            <span className="text-sm text-gray-300">{stats.thisMonth.uniqueVisitors} visitors</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Pages */}
            {stats.popularPages.length > 0 && (
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-4">🔥 Popular Pages</h3>
                    <div className="space-y-2">
                        {stats.popularPages.map((page, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
                                <span className="text-sm text-gray-300 font-mono truncate">{page.path}</span>
                                <span className="text-sm text-gray-400">{page.views} views</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Top Referrers */}
            {stats.topReferrers.length > 0 && (
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-4">🌐 Traffic Sources</h3>
                    <div className="space-y-2">
                        {stats.topReferrers.map((ref, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
                                <span className="text-sm text-gray-300">{ref.source}</span>
                                <span className="text-sm text-gray-400">{ref.visits} visits</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
