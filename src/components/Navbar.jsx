import dayjs from "dayjs";

import React from "react";
import { navIcons, navLinks } from "#constants";
import useWindowStore from "#store/window";
import useDogFollowerStore from "#store/dogFollower";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const { toggleDogFollower, isVisible } = useDogFollowerStore();

  const handleIconClick = (id) => {
    if (id === 5) {
      toggleDogFollower();
    }
  };

  return (
    <nav>
      <div>
        <img src="images/logo.svg" alt="Logo" />
        <p className="font-bold">Rahul's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id} onClick={() => handleIconClick(id)}>
              <img
                src={img}
                alt={`icon-${id}`}
                className={
                  id === 5 ? `icon h-6 ${isVisible ? "bg-white/50" : ""}` : "icon"
                }
              />
            </li>
          ))}
        </ul>
        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
