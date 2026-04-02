'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpAnimationProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export default function CountUpAnimation({ end, suffix = '', duration = 2000 }: CountUpAnimationProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-[#2C2825]" style={{ fontFamily: "'Playfair Display', serif" }}>
        {count.toLocaleString()}{suffix}
      </div>
    </div>
  );
}
