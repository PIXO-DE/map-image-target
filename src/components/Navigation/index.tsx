import React, { useState, useEffect } from "react";
import play from "/audio.png";
import logo from "/logo.png";

interface NavigationProps {
  to: string;
  icon?: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({
  to,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Fungsi untuk mengontrol audio yang sedang diputar
  const toggleAudio = () => {
    // Mendapatkan semua elemen audio di halaman
    const audioElements = document.querySelectorAll('audio');
    
    if (isPlaying) {
      // Jika sedang diputar, pause semua audio
      audioElements.forEach(audio => {
        if (!audio.paused) {
          audio.pause();
        }
      });
      setIsPlaying(false);
    } else {
      // Jika tidak diputar, cari audio yang terakhir aktif atau yang pertama
      const activeAudio = Array.from(audioElements).find(audio => !audio.ended) || audioElements[0];
      
      if (activeAudio) {
        activeAudio.play();
        setIsPlaying(true);
      }
    }
  };

  // Mendeteksi status audio saat komponen dimuat
  useEffect(() => {
    const checkAudioStatus = () => {
      const audioElements = document.querySelectorAll('audio');
      const anyPlaying = Array.from(audioElements).some(audio => !audio.paused);
      setIsPlaying(anyPlaying);
    };

    // Periksa status awal
    checkAudioStatus();

    // Tambahkan event listener untuk semua audio
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.addEventListener('play', checkAudioStatus);
      audio.addEventListener('pause', checkAudioStatus);
      audio.addEventListener('ended', checkAudioStatus);
    });

    // Bersihkan event listener saat komponen unmount
    return () => {
      audioElements.forEach(audio => {
        audio.removeEventListener('play', checkAudioStatus);
        audio.removeEventListener('pause', checkAudioStatus);
        audio.removeEventListener('ended', checkAudioStatus);
      });
    };
  }, []);

  return (
    <div className="flex flex-row  justify-between items-center fixed bottom-0 left-0 right-0 p-4 gap-4 z-50 ">
      <button
        onClick={toggleAudio}
      >
        {isPlaying ? (
           <img src={play} className="w-full h-[75px] object-cover" />
        ) : (
          <img src={play} className="w-full h-[75px] object-cover"  />
        )}
      </button>
      
      <button
        onClick={() => (window.location.href = to)}
      >
        <img src={logo} className="w-full h-[100px] object-cover" />
      </button>

    </div>
  );
};

export default Navigation;