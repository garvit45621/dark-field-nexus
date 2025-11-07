import { createContext, useContext, useState, useRef, ReactNode, useEffect } from "react";

interface Song {
  title: string;
  artist: string;
  src: string;
  startTime?: number;
  endTime?: number;
  loop?: boolean;
}

interface AudioContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  stopSong: () => void;
  togglePlay: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>({
    title: "MILA TOH MAREGA",
    artist: "Welcome Track",
    src: "/MILA TOH MAREGA.mp3",
    startTime: 20,
    endTime: 30,
    loop: true,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sync isPlaying state with actual audio state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    // Handle loop for segment playback
    const handleTimeUpdate = () => {
      if (currentSong?.endTime && audio.currentTime >= currentSong.endTime) {
        if (currentSong.loop) {
          audio.currentTime = currentSong.startTime || 0;
        } else {
          audio.pause();
        }
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentSong]);

  const playSong = (song: Song) => {
    setCurrentSong(song);

    if (audioRef.current) {
      const audio = audioRef.current;

      // Stop current playback
      audio.pause();
      audio.currentTime = 0;

      // Set new source
      audio.src = song.src;

      // Wait for the audio to load before setting time and playing
      const handleCanPlay = () => {
        console.log("Audio ready, setting time to", song.startTime || 0);

        // Set the start time
        if (song.startTime) {
          audio.currentTime = song.startTime;
        }

        // Try to play
        const playPromise = audio.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Playback started successfully");
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Error playing audio:", error);
              console.error("Error details:", error.name, error.message);
              setIsPlaying(false);
            });
        }

        audio.removeEventListener('canplay', handleCanPlay);
      };

      const handleError = (e: Event) => {
        console.error("Audio loading error:", e);
        audio.removeEventListener('error', handleError);
      };

      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('error', handleError);
      audio.load();
    }
  };

  const stopSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      console.log("Music stopped");
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
      // isPlaying state will be updated by event listeners
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        stopSong,
        togglePlay,
        audioRef,
      }}
    >
      {/* Global audio element - available on all routes */}
      <audio
        ref={audioRef}
        src={currentSong?.src || ""}
      />
      {children}
    </AudioContext.Provider>
  );
};
