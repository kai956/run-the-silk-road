import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Preload images utility
export const preloadImages = (selector: string) => {
  return new Promise((resolve) => {
    const images = document.querySelectorAll(selector);
    const total = images.length;
    let loaded = 0;

    const imageLoaded = () => {
      loaded++;
      if (loaded === total) {
        resolve(true);
      }
    };

    images.forEach((img) => {
      if (img instanceof HTMLImageElement) {
        if (img.complete) {
          imageLoaded();
        } else {
          img.addEventListener('load', imageLoaded);
          img.addEventListener('error', imageLoaded);
        }
      }
    });

    if (total === 0) {
      resolve(true);
    }
  });
}; 