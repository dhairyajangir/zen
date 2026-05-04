'use client';

import Image from "next/image";
import { useEffect } from "react";
import HeroScroll from "@/components/HeroScroll";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.18 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="stitch-page">
      <HeroScroll />

      <main className="content-wrap">
        <section className="split reveal">
          <div>
            <p className="kicker">Philosophy 01</p>
            <h2>Dissolve into the cosmic field.</h2>
            <p className="body">
              In the depth of silence, the boundaries of the self begin to blur. Our journey is not about
              finding something new, but about letting go of the noise and reconnecting with the quiet pulse
              of the void.
            </p>
            <div className="tags">
              <span>Weightless</span>
              <span>Infinite</span>
            </div>
          </div>
          <div className="photo-card">
            <Image src="/stitch/i1.png" alt="Cosmic figure" fill className="cover" />
          </div>
        </section>

        <section className="breath-clock reveal">
          <div className="ring">
            <div className="ring-inner">
              <Image src="/stitch/i3.png" alt="Energy aura" width={130} height={176} className="center-art" />
              <p className="time">12:00</p>
              <p className="sub">Breathe In</p>
            </div>
          </div>
          <div className="clock-controls">
            <button>↺</button>
            <button className="active">⏸</button>
            <button>☾</button>
          </div>
        </section>

        <section className="freq reveal">
          <h3>Vibrational Frequencies</h3>
          <p>Choose the acoustic texture of your journey.</p>
          <div className="grid">
            <article>
              <Image src="/stitch/i5.png" alt="Starlit echoes" fill className="cover" />
              <div><h4>Starlit Echoes</h4><small>High Frequency - 432Hz</small></div>
            </article>
            <article>
              <Image src="/stitch/i7.png" alt="Deep calm" fill className="cover" />
              <div><h4>Deep Calm</h4><small>Low Resonance - 174Hz</small></div>
            </article>
            <article>
              <Image src="/stitch/i2.png" alt="Void pulse" fill className="cover" />
              <div><h4>Void Pulse</h4><small>Pure Silence - 0Hz</small></div>
            </article>
          </div>
        </section>

        <section className="align reveal">
          <div>
            <h3>Your Alignment</h3>
            <div className="metrics">
              <div>
                <small>Total Stillness</small>
                <p>142h</p>
              </div>
              <div>
                <small>Current Streak</small>
                <p>12d</p>
              </div>
            </div>
            <div className="bar"><span /></div>
          </div>
          <div className="align-art">
            <Image src="/stitch/i4.png" alt="Alignment" fill className="cover" />
          </div>
        </section>
      </main>
    </div>
  );
}
