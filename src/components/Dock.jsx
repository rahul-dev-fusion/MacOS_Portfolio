import { dockApps } from "#constants";
import { Tooltip } from "react-tooltip";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Dock = () => {
  const docRef = useRef(null);

  useGSAP(() => {
    const dock = docRef.current;
    if (!dock) return () => {};

    const icons = dock.querySelectorAll(".dock-icon");

    const animateIcon = (mouseX) => {
      const left = dock.getBoundingClientRect().left;
      icons.forEach((icon) => {
        const iconRect = icon.getBoundingClientRect();
        const iconCenterX = iconRect.left - left + iconRect.width / 2;
        const distance = Math.abs(mouseX - iconCenterX);
        const intensity = Math.exp(-(distance ** 2.5) / 10000);

        gsap.to(icon, {
          scale: 1 + intensity * 0.25,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power2.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();
      animateIcon(e.clientX - left);
    };

    const handleMouseLeave = () => {
      icons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        });
      });
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", handleMouseLeave);
    };
  });

  const toggleApp = (app) => {
    console.log("App to be opened:", app);
  };

  return (
    <section id="dock">
      <div ref={docRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="dock-item">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen })}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
