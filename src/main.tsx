import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Preload critical hero image before rendering
const heroImage = new Image();
heroImage.src = "/assets/niklas-fabienne-hero22.png";

const loader = document.getElementById("loader");

heroImage.onload = () => {
  // Image loaded, render app and hide loader
  createRoot(document.getElementById("root")!).render(<App />);
  
  // Small delay to ensure smooth transition
  requestAnimationFrame(() => {
    loader?.classList.add("loaded");
    setTimeout(() => {
      loader?.remove();
    }, 300);
  });
};

heroImage.onerror = () => {
  // If image fails to load, still render app
  console.error("Failed to preload hero image");
  createRoot(document.getElementById("root")!).render(<App />);
  loader?.classList.add("loaded");
  setTimeout(() => {
    loader?.remove();
  }, 300);
};
