'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface CarouselSlide {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  imageUrl: string;
  /** link de ação mostrado abaixo da descrição */
  href?: string;
  hrefLabel?: string;
  /** abre em nova aba (ex.: site de demonstração) */
  external?: boolean;
  /** resultado medido, mostrado em destaque quando existir */
  result?: string;
}

export interface CarouselLabels {
  prev: string;
  next: string;
  goTo: string;
  resultLabel: string;
}

interface ElegantCarouselProps {
  slides: CarouselSlide[];
  labels: CarouselLabels;
  slideDuration?: number;
}

const TRANSITION_DURATION = 800;

/** Cor da imagem escurecida para texto sobre branco (mantém o tom, ganha contraste). */
const legibleAccent = (hex: string) =>
  `color-mix(in srgb, ${hex} 62%, #0F172A)`;

/**
 * Carrossel de casos: texto à esquerda, imagem à direita, troca automática
 * com pausa no hover, setas, indicadores e arrastar no toque.
 */
export default function ElegantCarousel({ slides, labels, slideDuration = 7000 }: ElegantCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const count = slides.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (count === 0 || isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setProgress(0);

      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, TRANSITION_DURATION / 2);
    },
    [count, isTransitioning, currentIndex]
  );

  const goNext = useCallback(() => {
    goToSlide((currentIndex + 1) % count);
  }, [currentIndex, count, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + count) % count);
  }, [currentIndex, count, goToSlide]);

  useEffect(() => {
    if (isPaused || count < 2) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 100 / (slideDuration / 50)));
    }, 50);

    intervalRef.current = setInterval(() => {
      goNext();
    }, slideDuration);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, isPaused, goNext, count, slideDuration]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  if (count === 0) return null;

  const currentSlide = slides[Math.min(currentIndex, count - 1)];
  const state = isTransitioning ? 'transitioning' : 'visible';

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* fundo com o tom do caso atual */}
      <div
        className="carousel-bg-wash"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${currentSlide.accent}18 0%, transparent 70%)`,
        }}
      />

      <div className="carousel-inner">
        <div className="carousel-content">
          <div className="carousel-content-inner">
            <div className={`carousel-collection-num ${state}`}>
              <span className="carousel-num-line" />
              <span className="carousel-num-text">
                {String(currentIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
            </div>

            <h3 className={`carousel-title ${state}`}>{currentSlide.title}</h3>

            <p className={`carousel-subtitle ${state}`} style={{ color: legibleAccent(currentSlide.accent) }}>
              {currentSlide.subtitle}
            </p>

            <p className={`carousel-description ${state}`}>{currentSlide.description}</p>

            {currentSlide.result && (
              <p className={`carousel-result ${state}`} style={{ borderColor: currentSlide.accent }}>
                <span className="carousel-result-value">{currentSlide.result}</span>
                <span className="carousel-result-label">{labels.resultLabel}</span>
              </p>
            )}

            {currentSlide.href && (
              <a
                href={currentSlide.href}
                {...(currentSlide.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`carousel-link ${state}`}
                style={{ color: legibleAccent(currentSlide.accent) }}
              >
                {currentSlide.hrefLabel}
              </a>
            )}

            <div className="carousel-nav-arrows">
              <button onClick={goPrev} className="carousel-arrow-btn" aria-label={labels.prev}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={goNext} className="carousel-arrow-btn" aria-label={labels.next}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="carousel-image-container">
          <div className={`carousel-image-frame ${state}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={currentSlide.imageUrl} alt={currentSlide.title} className="carousel-image" />
            <div
              className="carousel-image-overlay"
              style={{ background: `linear-gradient(135deg, ${currentSlide.accent}22 0%, transparent 50%)` }}
            />
          </div>
          <div className="carousel-frame-corner carousel-frame-corner--tl" style={{ borderColor: currentSlide.accent }} />
          <div className="carousel-frame-corner carousel-frame-corner--br" style={{ borderColor: currentSlide.accent }} />
        </div>
      </div>

      <div className="carousel-progress-bar">
        {slides.map((slide, index) => (
          <button
            key={`${slide.title}-${index}`}
            onClick={() => goToSlide(index)}
            className={`carousel-progress-item ${index === currentIndex ? 'active' : ''}`}
            aria-label={`${labels.goTo} ${index + 1}: ${slide.title}`}
            aria-current={index === currentIndex}
          >
            <div className="carousel-progress-track">
              <div
                className="carousel-progress-fill"
                style={{
                  width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                  backgroundColor: index === currentIndex ? currentSlide.accent : undefined,
                }}
              />
            </div>
            <span className="carousel-progress-label">{slide.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
