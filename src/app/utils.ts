export const preloadImages = (selector: string) => {
  return new Promise((resolve) => {
    const images = document.querySelectorAll(selector);
    const totalImages = images.length;
    let loadedImages = 0;

    const imageLoaded = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        resolve(true);
      }
    };

    images.forEach(img => {
      if ((img as HTMLImageElement).complete) {
        imageLoaded();
      } else {
        img.addEventListener('load', imageLoaded);
      }
    });
  });
}; 