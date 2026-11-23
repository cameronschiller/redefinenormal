/**
 * Photography. Each slot is null until an approved image is supplied, and the
 * site renders a clearly labelled development placeholder instead.
 *
 * To add a photo:
 *   1. Put the file in src/assets/photography/ (JPG/PNG, ideally ≥ 2400px on the long edge).
 *   2. Import it here and assign it, e.g.
 *        import hero from '../assets/photography/hero-portrait.jpg';
 *        export const heroPortrait: Photo | null = { src: hero, alt: 'Cameron Schiller, …' };
 * Astro optimises and resizes it automatically (AVIF/WebP, responsive sizes).
 */
import type { ImageMetadata } from 'astro';
import heroCutout from '../assets/photography/hero-cutout.png';
import speaker from '../assets/photography/speaker-portrait.jpg';
import racing from '../assets/photography/racing.jpg';

export type Photo = { src: ImageMetadata; alt: string };

/** Hero: a background-removed portrait (transparent PNG, waist-up, ~2000 × 2400). */
export const heroPortrait: Photo | null = { src: heroCutout, alt: 'Cameron Schiller, black-and-white portrait, hands clasped' };
/** Small supporting image beside the hero (e.g. a moment from competition or a jump). */
export const heroSupporting: Photo | null = null;
export const speakerPortrait: Photo | null = { src: speaker, alt: 'Cameron Schiller, studio portrait in a black shirt' };
/** Transformation section: a vertical racing photo (3:4, ≥ 1600 px tall). null = labelled placeholder. */
export const racingPhoto: Photo | null = { src: racing, alt: 'Cameron Schiller racing on a time-trial bike' };
