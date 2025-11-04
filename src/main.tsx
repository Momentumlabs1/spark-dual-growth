import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Preload critical hero image before rendering
const heroImage = new Image();
heroImage.src = "/assets/niklas-fabienne-hero22.png";

const loader = document.getElementById("loader");

// Helper to render app and hide loader
const startApp = () => {
  createRoot(document.getElementById("root")!).render(<App />);
  requestAnimationFrame(() => {
    loader?.classList.add("loaded");
    setTimeout(() => {
      loader?.remove();
    }, 300);
  });
};

// Prefer decode() to ensure the image is fully decoded before showing UI
const fontReady = (document as any).fonts?.ready ?? Promise.resolve();

const waitForHero = (async () => {
  try {
    // Prefer decode when available to ensure the image is fully decoded
    await (heroImage as any).decode?.();
  } catch {
    // ignore decode errors
  }
  // Ensure the image has at least finished loading
  await new Promise<void>((resolve) => {
    if ((heroImage as any).complete) {
      resolve();
    } else {
      heroImage.addEventListener("load", () => resolve(), { once: true });
      heroImage.addEventListener("error", () => resolve(), { once: true });
    }
  });
})();

Promise.allSettled([waitForHero, fontReady]).then(() => {
  startApp();
}).catch(() => {
  // Fallback: render anyway if promises reject
  startApp();
});
