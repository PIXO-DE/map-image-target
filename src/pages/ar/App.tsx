import { playVideoComponent } from "../../misc/lib/target";
import { AFrameScene } from "../../templates/aframe.template";
import html from "../../misc/scene/index.html?raw";
import { splashImageComponent } from "../../misc/lib/splash-image";
import Navigation from "../../components/Navigation";

const AR = () => {
  return (
    <>
      <AFrameScene
        sceneHtml={html}
        components={[
          { name: "play-video", val: playVideoComponent },
          { name: "splash-image", val: splashImageComponent },
        ]}
      />
      <Navigation to="/quiz" />
    </>
  );
};

export default AR;
