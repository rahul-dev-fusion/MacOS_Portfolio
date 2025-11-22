import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Font_Weight = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, index) => (
    <span
      key={index}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return;
  const letters = container.querySelectorAll("span");
  const { min, max } = Font_Weight[type];

  const animateLetter = (letter, Weight, duration = 0.25) => {
    return gsap.to(letter, {
      fontVariationSettings: `'wght' ${Weight}`,
      duration: duration,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (event) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = event.clientX - left;

    letters.forEach((letter) => {
      const letterRect = letter.getBoundingClientRect();
      const letterX = letterRect.left - left + letterRect.width / 2;
      const distance = Math.abs(mouseX - letterX);
      const intensity = Math.exp(-(distance ** 2) / 20000);

      const newWeight = min + (max - min) * intensity;

      animateLetter(letter, newWeight, 0.1);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, Font_Weight[type].default, 0.3);
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const titleCleanUp = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      titleCleanUp && titleCleanUp();
      subtitleCleanup && subtitleCleanup();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Rahul! Welcome to my ",
          "text-3xl font-georama",
          100
        )}
      </p>
      <h1 ref={titleRef} className="mt-6">
        {renderText("portfolio", "text-9xl italic font-georama", 400)}
      </h1>

      <div className="small-screen">
        <p>This Portfolio is designed for desktop screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;
