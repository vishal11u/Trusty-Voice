'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

type PushStateInput = [data: any, unused: string, url?: string | URL | null | undefined]

export default function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 200,
      minimum: 0.1,
      easing: 'ease',
      speed: 500
    })

    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href
      const currentUrl = location.href
      if (targetUrl !== currentUrl) {
        NProgress.start()
      }
    }

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll('a[href]')
      anchorElements.forEach((anchor) => 
        anchor.addEventListener('click', handleAnchorClick)
      )
    }

    const mutationObserver = new MutationObserver(handleMutation)
    mutationObserver.observe(document, { childList: true, subtree: true })

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        NProgress.done()
        return target.apply(thisArg, argArray)
      }
    })

    return () => {
      mutationObserver.disconnect()
      NProgress.done()
    }
  }, [])

  useEffect(() => {
    NProgress.start()
    
    const timer = setTimeout(() => {
      NProgress.done()
    }, 500)

    return () => {
      clearTimeout(timer)
      NProgress.done()
    }
  }, [pathname, searchParams])

  return null
} 