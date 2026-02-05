import { useEffect, useState } from 'react';

interface Bird {
    id: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    delay: number;
    duration: number;
    size: number;
    rotation: number;
    opacity: number;
}

// Professional flock formation - V-shape inspired with natural asymmetry
const birds: Bird[] = [
    // Lead bird (center-top)
    { id: 1, startX: 0, startY: -120, endX: 0, endY: -28, delay: 0, duration: 1.4, size: 18, rotation: 0, opacity: 0.85 },

    // First wing pair (close to leader)
    { id: 2, startX: -80, startY: -100, endX: -45, endY: -22, delay: 0.15, duration: 1.5, size: 16, rotation: 8, opacity: 0.75 },
    { id: 3, startX: 85, startY: -95, endX: 48, endY: -24, delay: 0.12, duration: 1.55, size: 17, rotation: -6, opacity: 0.8 },

    // Second wing pair (mid distance)
    { id: 4, startX: -130, startY: -70, endX: -78, endY: -15, delay: 0.28, duration: 1.7, size: 15, rotation: 12, opacity: 0.7 },
    { id: 5, startX: 140, startY: -65, endX: 82, endY: -18, delay: 0.25, duration: 1.65, size: 16, rotation: -10, opacity: 0.72 },

    // Third wing pair (wider)
    { id: 6, startX: -160, startY: -35, endX: -105, endY: -8, delay: 0.42, duration: 1.85, size: 14, rotation: 15, opacity: 0.65 },
    { id: 7, startX: 170, startY: -30, endX: 110, endY: -10, delay: 0.38, duration: 1.8, size: 15, rotation: -14, opacity: 0.68 },

    // Trailing birds (slightly behind formation)
    { id: 8, startX: -100, startY: 20, endX: -62, endY: 8, delay: 0.55, duration: 2.0, size: 13, rotation: 18, opacity: 0.6 },
];

function BirdSVG({ size }: { size: number }) {
    return (
        <svg
            width={size}
            height={size * 0.5}
            viewBox="0 0 32 16"
            fill="none"
        >
            {/* Refined bird silhouette - more elegant swooping wings */}
            <path
                d="M16 8 C13 4, 8 2, 0 4 C6 5.5, 11 7, 14 8 C11 7, 6 8, 0 12 C8 9, 13 9, 16 8 Z"
                fill="currentColor"
            />
            <path
                d="M16 8 C19 4, 24 2, 32 4 C26 5.5, 21 7, 18 8 C21 7, 26 8, 32 12 C24 9, 19 9, 16 8 Z"
                fill="currentColor"
            />
            {/* Small body detail */}
            <ellipse cx="16" cy="8" rx="2" ry="1.5" fill="currentColor" />
        </svg>
    );
}

export function AnimatedBirds() {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimated(true), 400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
            {birds.map((bird) => (
                <div
                    key={bird.id}
                    className="absolute left-1/2 top-1/2"
                    style={{
                        transform: isAnimated
                            ? `translate(${bird.endX}px, ${bird.endY}px) rotate(${bird.rotation}deg) scale(1)`
                            : `translate(${bird.startX}px, ${bird.startY}px) rotate(${bird.rotation - 5}deg) scale(0.8)`,
                        opacity: isAnimated ? bird.opacity : 0,
                        transition: `transform ${bird.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${bird.delay}s, opacity ${bird.duration * 0.6}s ease-out ${bird.delay}s`,
                    }}
                >
                    {/* Bounce wrapper */}
                    <div
                        className="text-auxerta-accent"
                        style={{
                            filter: `drop-shadow(0 2px 4px rgba(155, 123, 199, ${bird.opacity * 0.3}))`,
                            animation: isAnimated
                                ? `settle-bounce 0.6s ease-out ${bird.delay + bird.duration}s`
                                : 'none',
                        }}
                    >
                        <BirdSVG size={bird.size} />
                    </div>
                </div>
            ))}

            {/* Settle bounce animation */}
            <style>{`
        @keyframes settle-bounce {
          0% { transform: translateY(0); }
          20% { transform: translateY(-5px) rotate(-2deg); }
          40% { transform: translateY(3px) rotate(1deg); }
          60% { transform: translateY(-2px) rotate(-0.5deg); }
          80% { transform: translateY(1px) rotate(0.3deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
        </div>
    );
}
