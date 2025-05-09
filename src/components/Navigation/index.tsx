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
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  // Fungsi untuk mengontrol audio yang sedang diputar
  const toggleAudio = () => {
    if (isPlaying) {
      // Jika ada audio yang sedang diputar, pause audio tersebut
      if (activeAudioId) {
        document.dispatchEvent(new CustomEvent(`pauseAudio_${activeAudioId.replace('#', '')}`));
      } else {
        // Jika tidak ada audio aktif yang diketahui, pause semua audio
        document.dispatchEvent(new CustomEvent('pauseAllAudio'));
      }
      setIsPlaying(false);
    } else {
      // Jika tidak ada audio yang diputar, coba putar audio yang terakhir aktif
      if (activeAudioId) {
        document.dispatchEvent(new CustomEvent(`playAudio_${activeAudioId.replace('#', '')}`));
      } else {
        // Jika tidak ada audio aktif yang diketahui, cari audio yang terakhir diputar
        const audioElements = document.querySelectorAll('audio');
        const lastPlayedAudio = Array.from(audioElements).find(audio => !audio.ended);
        
        if (lastPlayedAudio && lastPlayedAudio.id) {
          // Jika ada audio yang terakhir diputar, putar audio tersebut
          document.dispatchEvent(new CustomEvent(`playAudio_${lastPlayedAudio.id}`));
          setActiveAudioId(`#${lastPlayedAudio.id}`);
        } else {
          // Jika tidak ada audio yang terakhir diputar, putar audio pertama
          const firstAudio = audioElements[0];
          if (firstAudio && firstAudio.id) {
            document.dispatchEvent(new CustomEvent(`playAudio_${firstAudio.id}`));
            setActiveAudioId(`#${firstAudio.id}`);
          }
        }
      }
      setIsPlaying(true);
    }
  };

  // Mendeteksi status audio saat komponen dimuat
  useEffect(() => {
    // Fungsi untuk memeriksa status audio
    const checkAudioStatus = () => {
      const audioElements = document.querySelectorAll('audio');
      const anyPlaying = Array.from(audioElements).some(audio => !audio.paused);
      setIsPlaying(anyPlaying);
      
      // Cari audio yang sedang diputar
      const playingAudio = Array.from(audioElements).find(audio => !audio.paused);
      if (playingAudio && playingAudio.id) {
        setActiveAudioId(`#${playingAudio.id}`);
      }
    };

    // Periksa status awal
    checkAudioStatus();

    // Tambahkan event listener untuk custom event dari target.ts
    const handleAudioStarted = (event: CustomEvent) => {
      setIsPlaying(true);
      if (event.detail && event.detail.audioId) {
        setActiveAudioId(event.detail.audioId);
      }
    };

    const handleAudioPaused = () => {
      // Periksa apakah masih ada audio lain yang diputar
      checkAudioStatus();
    };

    // Tambahkan event listener untuk semua audio
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.addEventListener('play', checkAudioStatus);
      audio.addEventListener('pause', checkAudioStatus);
      audio.addEventListener('ended', checkAudioStatus);
    });

    // Tambahkan event listener untuk custom event
    document.addEventListener('audioStarted', handleAudioStarted as EventListener);
    document.addEventListener('audioPaused', handleAudioPaused);
    document.addEventListener('targetLost', handleAudioPaused);

    // Bersihkan event listener saat komponen unmount
    return () => {
      audioElements.forEach(audio => {
        audio.removeEventListener('play', checkAudioStatus);
        audio.removeEventListener('pause', checkAudioStatus);
        audio.removeEventListener('ended', checkAudioStatus);
      });
      document.removeEventListener('audioStarted', handleAudioStarted as EventListener);
      document.removeEventListener('audioPaused', handleAudioPaused);
      document.removeEventListener('targetLost', handleAudioPaused);
    };
  }, []);

  return (
    <div className="flex flex-row  justify-between items-center fixed bottom-0 left-0 right-0 p-1 gap-4 z-50 ">
      <button
        onClick={toggleAudio}
      >
        {isPlaying ? (
           <img src={play} className="w-full h-[100px] object-contain" />
        ) : (
          <img src={play} className="w-full h-[100px] object-contain"  />
        )}
      </button>
      
      <button
        onClick={() => (window.location.href = to)}
      >
        <img src={logo} className="w-full h-[125px] object-contain" />
      </button>

    </div>
  );
};

export default Navigation;