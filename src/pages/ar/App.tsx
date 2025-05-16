import { useState, useEffect } from 'react';
import { playVideoComponent } from "../../misc/lib/target";
import { AFrameScene } from "../../templates/aframe.template";
import html from "../../misc/scene/index.html?raw";
import { splashImageComponent } from "../../misc/lib/splash-image";
import Navigation from "../../components/Navigation";
import logo from '../../assets/logo.png';

const AR = () => {
  const [inDom, setInDom] = useState(false);

  const observer = new MutationObserver(() => {
    const promptBox = document.querySelector('.prompt-box-8w');
    if (promptBox) {
      if (!inDom) {
        const paragraph = promptBox.querySelector('p');
        const promptButton = promptBox.querySelector('.prompt-button-8w');
        const primaryButton = promptBox.querySelector('.button-primary-8w');
        
        if (paragraph) paragraph.innerHTML = '<strong>AR benötigt den Motion Sensor</strong>';
        if (promptButton) promptButton.innerHTML = 'abbrechen';
        if (primaryButton) primaryButton.innerHTML = 'weiter';
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
      (error) => {
        console.error('Error getting geolocation:', error);
      }
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
        actionButtonImg.style.width = '40px';
        actionButtonImg.style.height = '40px';
  
        clearInterval(interval);
      }
    }, 300); // Coba setiap 300ms
  
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [inDom]);
  return (
    <>
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
