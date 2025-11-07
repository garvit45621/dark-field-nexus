import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  return (
    <>
      {/* Audio Element - Replace src with actual song URL */}
      <audio
        ref={audioRef}
        src="https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/8c/0a/3d/8c0a3d3e-0d0a-0b5e-8a7e-6e0f5e5a5e5e/mzaf_1234567890123456789.plus.aac.p.m4a"
        loop
      />

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
              <p className="font-black text-foreground text-sm">Bambino Bole</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Amrit Maan × Sidhu Moosewala
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={togglePlay}
                variant="deadly"
                size="icon"
                className="h-10 w-10"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>

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
            </div>

            <p className="text-xs text-muted-foreground text-center pt-2 border-t border-deadly-border">
              Replace audio source with actual song file
            </p>
          </Card>
        )}
      </div>
    </>
  );
};

export default MusicPlayer;
