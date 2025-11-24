import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function DogFollower() {
  const wrapperRef = useRef(null);
  const imgRef = useRef(null);

  const [isRunning, setIsRunning] = useState(true);
  const [isFacingRight, setIsFacingRight] = useState(false);

  const sitTimeoutRef = useRef(null);
  const animRef = useRef(null);

  const SPEED = 300;

  useEffect(() => {
    const handleMouseMove = (e) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      setIsRunning(true);

      clearTimeout(sitTimeoutRef.current);
      if (animRef.current) animRef.current.kill();

      const rect = wrapper.getBoundingClientRect();
      const currentX = rect.left + rect.width / 2;
      const currentY = rect.top + rect.height / 2;

      const targetX = e.clientX;
      const targetY = e.clientY;

      const dx = targetX - currentX;
      const dy = targetY - currentY;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const duration = distance / SPEED;

      setIsFacingRight(dx < 0);

      animRef.current = gsap.to(wrapper, {
        x: targetX,
        y: targetY,
        duration,
        ease: "linear",
        onComplete: () => {
          sitTimeoutRef.current = setTimeout(() => {
            setIsRunning(false);
          }, 300);
        },
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        left: -24,
        top: 12,
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
      }}
    >
      <img
        ref={imgRef}
        src={isRunning ? "icons/running-dog.gif" : "icons/sitting-dog.gif"}
        width={isRunning ? 40 : 30}
        alt="dog"
        style={{
          transform: `scaleX(${isFacingRight ? 1 : -1})`,
          transformOrigin: "center",
        }}
      />
    </div>
  );
}
