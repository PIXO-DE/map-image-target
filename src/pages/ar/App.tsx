import { useState, useEffect } from "react";
import { playVideoComponent } from "../../misc/lib/target";
import { AFrameScene } from "../../templates/aframe.template";
import html from "../../misc/scene/index.html?raw";
import { splashImageComponent } from "../../misc/lib/splash-image";
import Navigation from "../../components/Navigation";
import logo from '/share.png';

const AR = () => {
  const [inDom, setInDom] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const observer = new MutationObserver(() => {
    const promptBox = document.querySelector('.prompt-box-8w');
    if (promptBox) {
      if (!inDom) {
        const paragraph = promptBox.querySelector('p');
        const cancelButton = promptBox.querySelector('.prompt-button-8w');
        const confirmButton = promptBox.querySelector('.button-primary-8w');
        
        if (paragraph) paragraph.innerHTML = '<strong>AR benötigt den Motion Sensor</strong>';
        if (cancelButton) cancelButton.innerHTML = 'abbrechen';
        if (confirmButton) confirmButton.innerHTML = 'weiter';
      }
      setInDom(true);
    } else if (inDom) {
      setInDom(false);
      observer.disconnect();
    }
  });

  useEffect(() => {
    observer.observe(document.body, { childList: true, subtree: true });
  
    navigator.geolocation.getCurrentPosition(
      () => {},
      errorCallback
    );
  
    const interval = setInterval(() => {
      const actionButton = document.getElementById('actionButton');
      const actionButtonText = document.getElementById('actionButtonText');
      const actionButtonImg = document.getElementById('actionButtonImg');
  
      if (actionButton && actionButtonText && actionButtonImg) {
        // Hapus teks
        actionButtonText.style.display = 'none';
  
        // Ganti gambar
        (actionButtonImg as HTMLImageElement).src = logo // <-- ganti path ini
  
        // (Opsional) Ganti ukuran atau style gambar
    actionButtonImg.style.width = '75px';
        actionButtonImg.style.height = '75px';
  
        clearInterval(interval);
      }
    }, 300); // Coba setiap 300ms
  
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [inDom]);

  const errorCallback = (error: GeolocationPositionError) => {
    if (error.code === error.PERMISSION_DENIED) {
      setErrorMessage('LOCATION PERMISSIONS DENIED. PLEASE ALLOW AND TRY AGAIN.');
    }
  };

  useEffect(() => {
    observer.observe(document.body, { childList: true });

    navigator.geolocation.getCurrentPosition(
      () => {},
      errorCallback
    );

    return () => {
      observer.disconnect();
    };
  }, [inDom]);
  return (
    <>
    {errorMessage && <div>{errorMessage}</div>}
      <AFrameScene
        sceneHtml={html}
        components={[
          { name: "play-video", val: playVideoComponent },
          { name: "splash-image", val: splashImageComponent },
        ]}
      />
      <Navigation to="/wimmelbild/quiz" />
    </>
  );
};

export default AR;
