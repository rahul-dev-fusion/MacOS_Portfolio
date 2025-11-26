import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function DogFollower() {
  const wrapperRef = useRef(null);
  const imgRef = useRef(null);

  const [isRunning, setIsRunning] = useState(true);
  const [isFacingRight, setIsFacingRight] = useState(false);

  const sitTimeoutRef = useRef(null);
  const animRef = useRef(null);

  const SPEED = 250;

  // Hide default cursor when running
  useEffect(() => {
    if (isRunning) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [isRunning]);

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

      setIsFacingRight(dx > 0);

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

      // Position lollipop near cursor
      const lollipop = document.getElementById("lollipop");
      if (lollipop) {
        lollipop.style.left = e.clientX + "px";
        lollipop.style.top = e.clientY + "px";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
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
          width={isRunning ? 50 : 30}
          alt="dog"
          style={{
            transform: `scaleX(${isFacingRight ? 1 : -1})`,
            transformOrigin: "center",
          }}
        />
      </div>

      {isRunning && (
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            pointerEvents: "none",
            zIndex: 1000,
          }}
          id="lollipop-container"
        >
          <img
            src="icons/lollipop.svg"
            width={24}
            alt="lollipop"
            style={{
              position: "fixed",
              pointerEvents: "none",
            }}
            id="lollipop"
          />
        </div>
      )}
    </>
  );
}
