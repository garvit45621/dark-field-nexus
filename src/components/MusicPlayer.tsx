import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music, Pause, Play, Volume2, VolumeX, X, SkipBack, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useAudio } from "@/contexts/AudioContext";

const MusicPlayer = () => {
  const { currentSong, isPlaying, togglePlay, audioRef } = useAudio();
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Auto-expand when song starts playing
  useEffect(() => {
    if (isPlaying && currentSong) {
      setIsExpanded(true);
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Update time and duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
    };
  }, [audioRef]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      console.log("Toggled mute to:", !isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.duration,
        audioRef.current.currentTime + 5
      );
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Debug: Log audio state
  useEffect(() => {
    if (audioRef.current) {
      console.log("MusicPlayer - Audio src:", audioRef.current.src);
      console.log("MusicPlayer - Audio paused:", audioRef.current.paused);
      console.log("MusicPlayer - Current time:", audioRef.current.currentTime);
      console.log("MusicPlayer - Volume:", audioRef.current.volume);
      console.log("MusicPlayer - Muted:", audioRef.current.muted);
    }
  }, [isPlaying, currentSong]);

  return (
    <>
      {/* Floating Music Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isExpanded ? (
          <Button
            onClick={() => setIsExpanded(true)}
            variant="deadly"
            size="icon"
            className="w-14 h-14 rounded-full deadly-glow-intense"
          >
            <Music className="w-6 h-6" />
          </Button>
        ) : (
          <Card className="bg-card border-deadly-border p-4 space-y-4 deadly-glow w-72">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-deadly-red" />
                <h3 className="font-black text-sm uppercase tracking-wide text-foreground">
                  Now Playing
                </h3>
              </div>
              <Button
                onClick={() => setIsExpanded(false)}
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-deadly-red"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-1">
              <p className="font-black text-foreground text-sm">{currentSong?.title || "No Song"}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {currentSong?.artist || "Unknown Artist"}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Slider
                value={[currentTime]}
                onValueChange={handleSeek}
                max={duration || 100}
                step={0.1}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-2">
              <Button
                onClick={skipBackward}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-foreground hover:text-deadly-red"
              >
                <SkipBack className="w-4 h-4" />
              </Button>

              <Button
                onClick={togglePlay}
                variant="deadly"
                size="icon"
                className="h-12 w-12"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </Button>

              <Button
                onClick={skipForward}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-foreground hover:text-deadly-red"
              >
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            {/* Volume Controls */}
            <div className="flex items-center gap-3 pt-2 border-t border-deadly-border">
              <Button
                onClick={toggleMute}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-foreground hover:text-deadly-red"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>

              <div className="flex-1">
                <Slider
                  value={[volume]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
              </div>
              <span className="text-xs text-muted-foreground w-8 text-right">{volume}</span>
            </div>

            <p className="text-xs text-muted-foreground text-center pt-2 border-t border-deadly-border">
              {currentSong?.title || "No Song"} – {currentSong?.artist || "Unknown"}
            </p>
          </Card>
        )}
      </div>
    </>
  );
};

export default MusicPlayer;
