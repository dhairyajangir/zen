'use client'

import { useEffect, useRef, useState } from 'react'

const TOTAL_FRAMES = 40

export default function HeroScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const currentFrameRef = useRef(0)
  const rafRef = useRef<number>(0)
  const viewportRef = useRef({ width: 0, height: 0 })
  const [loaded, setLoaded] = useState(false)
  const [textPhase, setTextPhase] = useState<'intro' | 'mid' | 'end'>('intro')

  useEffect(() => {
    const images: HTMLImageElement[] = []
    let loadedCount = 0

    const drawFrame = (index: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const img = images[Math.min(index, images.length - 1)]
      if (!img || !img.complete || img.naturalWidth === 0) return

      const { width: viewportWidth, height: viewportHeight } = viewportRef.current
      if (!viewportWidth || !viewportHeight) return

      const scale = Math.max(viewportWidth / img.naturalWidth, viewportHeight / img.naturalHeight)
      const x = (viewportWidth - img.naturalWidth * scale) / 2
      const y = (viewportHeight - img.naturalHeight * scale) / 2

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.clearRect(0, 0, viewportWidth, viewportHeight)
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale)
    }

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = `/frames-hd/ezgif-frame-${String(i).padStart(3, '0')}.jpg`
      img.onload = () => {
        loadedCount++
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true)
          drawFrame(0)
        }
      }
      images.push(img)
    }

    const onScroll = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const scrolled = -rect.top
      const totalScrollable = rect.height - window.innerHeight
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable))

      const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES))

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex))
      }

      if (progress < 0.2) setTextPhase('intro')
      else if (progress < 0.75) setTextPhase('mid')
      else setTextPhase('end')
    }

    const sizeCanvas = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const width = window.innerWidth
      const height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      viewportRef.current = { width, height }
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
      drawFrame(currentFrameRef.current)
    }

    sizeCanvas()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', sizeCanvas)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', sizeCanvas)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div ref={containerRef} style={{ height: '320vh' }} className="relative">
      <div className="sticky top-0 z-10 h-screen overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border border-white/20 border-t-white/60" />
              <p className="text-label" style={{ color: '#8c9293' }}>
                Entering the void
              </p>
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1s ease' }}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 38%, rgba(16,20,20,0.74) 100%)',
          }}
        />

        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-64"
          style={{ background: 'linear-gradient(to bottom, transparent, #101414 85%)' }}
        />

        <div className="absolute left-1/2 top-8 -translate-x-1/2">
          <p
            className="text-label"
            style={{
              opacity: textPhase === 'intro' ? 0.5 : 0,
              transition: 'opacity 0.8s ease',
            }}
          >
            Scroll to begin
          </p>
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-28 text-center md:pb-32"
          style={{
            opacity: textPhase === 'intro' ? 1 : 0,
            transform: textPhase === 'intro' ? 'translateY(0)' : 'translateY(-24px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            pointerEvents: textPhase === 'intro' ? 'auto' : 'none',
          }}
        >
          <p className="text-label mb-6" style={{ color: '#b1cbcf' }}>
            ZEN COSMOS
          </p>
          <h1 className="text-display glow-primary" style={{ maxWidth: '720px' }}>
            The universe exists
            <br />
            within your stillness.
          </h1>
          <p
            className="mt-6"
            style={{
              fontSize: '16px',
              fontWeight: 300,
              color: 'rgba(193,200,200,0.82)',
              letterSpacing: '0.05em',
              maxWidth: '420px',
              lineHeight: 1.7,
            }}
          >
            Return to the center of your being.
            <br />A journey of infinite silence awaits.
          </p>
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: textPhase === 'mid' ? 1 : 0,
            transition: 'opacity 1s ease',
            pointerEvents: 'none',
          }}
        >
          <p
            className="text-label animate-breathe"
            style={{ color: 'rgba(224,251,255,0.64)', fontSize: '13px', letterSpacing: '0.35em' }}
          >
            BREATHE IN
          </p>
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-24 text-center md:pb-28"
          style={{
            opacity: textPhase === 'end' ? 1 : 0,
            transform: textPhase === 'end' ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            pointerEvents: textPhase === 'end' ? 'auto' : 'none',
          }}
        >
          <h2 className="text-headline glow-primary mb-7" style={{ color: 'rgba(255,255,255,0.92)', maxWidth: '600px' }}>
            Dissolve into the cosmic field.
          </h2>
          <button className="btn-pill">Start Session</button>
        </div>
      </div>
    </div>
  )
}
