import Navbar from "#components/Navbar";
import Welcome from "#components/Welcome";
import Dock from "#components/Dock";
import React from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import Terminal from "#windows/Terminal";
import Safari from "#windows/Safari";
import Resume from "#windows/Resume";
import Finder from "#windows/Finder";
import Text from "#windows/Text";
import Image from "#windows/Image";
import Contact from "#windows/Contact";
import Home from "#components/Home";
import Photos from "#windows/Photos";
import DogFollower from "#components/DogFollower";
import useDogFollowerStore from "#store/dogFollower";

gsap.registerPlugin(Draggable);

const App = () => {
  const { isVisible } = useDogFollowerStore();

  return (
    <main>
      <Navbar />
      <Home />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photos />
      {isVisible && <DogFollower />}
    </main>
  );
};

export default App;
