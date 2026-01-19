'use client'

import { usePageView } from '@/hooks/usePageView'

export default function AnalyticsTracker({ siteName }: { siteName: string }) {
    usePageView(siteName)
    return null
}
