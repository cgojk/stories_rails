

import { useRef, useEffect, useState } from "react";

export default function HistoryEvent({ image, title, text, reverse, initiallyVisible }) {
  // Provide safe fallback values for missing data
  const safeTitle = title || "Untitled Event";
  const safeImage = image || "/images/historical/default.jpg";
  const safeText = text || "Description not available.";

  console.log("Rendering HistoryEvent:", safeTitle, "with image URL:", safeImage);
  const ref = useRef(null);
  const [visible, setVisible] = useState(initiallyVisible || false);
  const [offsetY, setOffsetY] = useState(0);

  // Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, { threshold: 0.3 });

    const timer = setTimeout(() => {
      if (ref.current) observer.observe(ref.current);
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Scroll listener for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      let progress = (rect.top + rect.height / 2 - windowHeight / 2) / (windowHeight / 2);
      progress = Math.max(-1, Math.min(1, progress));
      setOffsetY(progress * 30);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // initial call on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`history-event ${visible ? "visible" : ""} ${reverse ? "reverse" : ""}`}
      style={{ overflow: "hidden" }}
    >
      <img
        src={safeImage}
        alt={safeTitle}
        onLoad={() => window.dispatchEvent(new Event("scroll"))}
        style={{
          transform: `translateY(${offsetY}px)`,
          transition: "transform 0.2s ease-out",
          willChange: "transform"
          
        }}
      />
      <div className="history-text">
        <h3>{safeTitle}</h3>
        <p>{safeText}</p>
      </div>
    </div>
  );
}