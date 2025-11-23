import WindowControls from "#components/WindowControls";
import { techStack } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { Check, Flag } from "lucide-react";
import React from "react";

const Terminal = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="terminal" />
        <h2>Tech Stacks</h2>
      </div>

      <div className="techstack">
        <p>
          <span className="font-bold">@rahul-Macbook-Air % </span>
          show tech stacks
        </p>

        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        <ul className="content">
          {techStack.map(({ category, items: technologies }) => (
            <li key={category} className="flex items-center">
              <Check className="check" size={20} />
              <h3>{category}</h3>
              <ul>
                {technologies.map((tech, index) => (
                  <li key={index}>
                    {tech}
                    {index < technologies.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="footnote">
          <p>
            <Check size={20} /> 6 OF 6 Stacks Loaded Successfully (100%)
          </p>
          <p className="text-black">
            <Flag size={15} fill="black" />
            Render time : 9ms
          </p>
        </div>
      </div>
    </>
  );
};

const WrappedTerminal = WindowWrapper(Terminal, "terminal");

export default WrappedTerminal;
