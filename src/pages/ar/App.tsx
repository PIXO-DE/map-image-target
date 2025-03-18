import { playVideoComponent } from "../../misc/lib/target";
import { AFrameScene } from "../../templates/aframe.template";
import html from "../../misc/scene/index.html?raw";

const AR = () => {
  return (
    <>
      <AFrameScene
        sceneHtml={html}
        components={[
          { name: "play-video", val: playVideoComponent },
        ]}
      />
    </>
  );
};

export default AR;
