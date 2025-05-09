import React, { useState, useEffect, useRef } from "react";
import play from "/audio.png";
import pauseIcon from "/pause.png";
import logo from "/logo.png";
import audioFile from "/m1.mp3";

interface NavigationProps {
  to: string;
  icon?: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({
  to,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Inisialisasi audio element
    audioRef.current = new Audio(audioFile);
    audioRef.current.id = "backgroundAudio";
    
    // Tambahkan event listener
    if (audioRef.current) {
      audioRef.current.addEventListener('play', () => setIsPlaying(true));
      audioRef.current.addEventListener('pause', () => setIsPlaying(false));
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    }

    return () => {
      // Bersihkan event listener saat komponen unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('play', () => setIsPlaying(true));
        audioRef.current.removeEventListener('pause', () => setIsPlaying(false));
        audioRef.current.removeEventListener('ended', () => setIsPlaying(false));
      }
    };
  }, []);

  // Fungsi untuk mengontrol audio yang sedang diputar
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="flex flex-row justify-between items-center fixed bottom-0 left-0 right-0 p-1 gap-4 z-50 ">
      <button
        onClick={toggleAudio}
      >
        {isPlaying ? (
           <img src={pauseIcon} className="w-full h-[100px] object-contain" />
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