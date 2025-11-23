import WindowControls from "#components/WindowControls";
import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import React from "react";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="p-5 space-y-5">
        <img
          src="images/adrian.jpg"
          alt="adrian"
          className="w-20 rounded-full"
        />

        <h3>Let's Connect</h3>
        <p>Got an idea ? A bug to squash? or just wannna talk? I'm in.</p>

        <ul>
          {socials.map(({ id, text, link, icon, bg }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                title={text}
              >
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const WrappedContact = WindowWrapper(Contact, "contact");

export default WrappedContact;
