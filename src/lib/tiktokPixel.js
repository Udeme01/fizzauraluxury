// src/lib/tiktokPixel.js

// Safely fires a TikTok event — does nothing if the pixel hasn't loaded
// (e.g. ad blockers, or the script hasn't finished loading yet)
export const trackTikTokEvent = (eventName, params = {}) => {
  if (typeof window !== "undefined" && window.ttq) {
    window.ttq.track(eventName, params);
  }
};
