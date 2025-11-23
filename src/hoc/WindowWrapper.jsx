import React, { useLayoutEffect } from "react";
import useWindowStore from "#store/window";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
  const WrappedComponent = (props) => {
    const { windows, focusWindow } = useWindowStore();

    const { isOpen, zIndex } = windows[windowKey];
    const winRef = useRef(null);

    useGSAP(() => {
      const el = winRef.current;
      if (!el || !isOpen) return;
      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }
      );
    }, [isOpen]);

    useGSAP(() => {
      const el = winRef.current;

      if (!el) return;

      const draggable = Draggable.create(el, {
        onPress() {
          focusWindow(windowKey);
        },
      });

      return () => {
        if (draggable && draggable.length) {
          draggable[0].kill();
        }
      };
    });

    useLayoutEffect(() => {
      const el = winRef.current;
      if (!el) return;

      if (isOpen) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={winRef}
        style={{ zIndex }}
        className="absolute"
      >
        <Component {...props} />
      </section>
    );
  };

  WrappedComponent.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

export default WindowWrapper;
