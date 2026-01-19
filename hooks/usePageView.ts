'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

// Generate or get visitor ID
function getVisitorId(): string {
    if (typeof window === 'undefined') return ''

    let visitorId = localStorage.getItem('cathedral-visitor-id')
    if (!visitorId) {
        visitorId = crypto.randomUUID()
        localStorage.setItem('cathedral-visitor-id', visitorId)
    }
    return visitorId
}

// Generate session ID
function getSessionId(): string {
    if (typeof window === 'undefined') return ''

    let sessionId = sessionStorage.getItem('cathedral-session-id')
    if (!sessionId) {
        sessionId = crypto.randomUUID()
        sessionStorage.setItem('cathedral-session-id', sessionId)
    }
    return sessionId
}

export function usePageView(siteName: string) {
    useEffect(() => {
        if (!supabase) return

        const trackPageView = async () => {
            try {
                const pageView = {
                    site: siteName,
                    page_path: window.location.pathname,
                    page_title: document.title,
                    referrer: document.referrer || null,
                    visitor_id: getVisitorId(),
                    session_id: getSessionId(),
                    user_agent: navigator.userAgent,
                    screen_width: window.screen.width,
                    screen_height: window.screen.height,
                    viewed_at: new Date().toISOString()
                }

                await supabase.from('page_views').insert([pageView])
            } catch (error) {
                console.error('Analytics error:', error)
            }
        }

        // Track immediately
        trackPageView()

        // Track time on page and scroll depth
        let startTime = Date.now()
        let maxScroll = 0

        const updateEngagement = () => {
            const scrollPercentage = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            )
            maxScroll = Math.max(maxScroll, scrollPercentage)
        }

        const trackEngagement = async () => {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000)

            try {
                if (supabase) {
                    await supabase
                        .from('page_views')
                        .update({
                            time_on_page: timeOnPage,
                            scrolled_percentage: maxScroll
                        })
                        .eq('visitor_id', getVisitorId())
                        .eq('session_id', getSessionId())
                        .eq('page_path', window.location.pathname)
                        .order('created_at', { ascending: false })
                        .limit(1)
                }
            } catch (error) {
                console.error('Engagement tracking error:', error)
            }
        }

        // Listen for scroll
        window.addEventListener('scroll', updateEngagement)

        // Track engagement on page leave
        window.addEventListener('beforeunload', trackEngagement)

        // Track periodically (every 30 seconds)
        const interval = setInterval(trackEngagement, 30000)

        return () => {
            window.removeEventListener('scroll', updateEngagement)
            window.removeEventListener('beforeunload', trackEngagement)
            clearInterval(interval)
            trackEngagement() // Final update
        }
    }, [siteName])
}
