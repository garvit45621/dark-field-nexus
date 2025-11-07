import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skull } from "lucide-react";
import MusicPlayer from "@/components/MusicPlayer";
import { useAudio } from "@/contexts/AudioContext";

const Index = () => {
  const { playSong, currentSong } = useAudio();

  // Auto-play MILA TOH MAREGA when landing on homepage
  useEffect(() => {
    // Only auto-play if it's the default welcome song
    if (currentSong?.title === "MILA TOH MAREGA") {
      playSong({
        title: "MILA TOH MAREGA",
        artist: "Welcome Track",
        src: "/MILA TOH MAREGA.mp3",
        startTime: 20,
        endTime: 30,
        loop: true,
      });
    }
  }, []); // Run only on mount
  const fieldingTeam = [
    "Elite members-Ronit Yadav",
    "Elite members-Nitesh Samota",
    "Elite members-Harsh Kumar",
    "Elite members-Ankesh Raj",
    "Himanshu Kaushik",
    "Anand Mishra"
  ];

  return (
    <div className="min-h-screen bg-deadly-darker py-8 px-4">
      <MusicPlayer />
      <div className="max-w-md mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Skull className="w-12 h-12 text-deadly-red deadly-text-glow" />
            <h1 className="text-4xl font-black text-foreground deadly-text-glow uppercase tracking-tight">
              BMSIT<br />Disconnect
            </h1>
          </div>
          <p className="text-muted-foreground text-sm uppercase tracking-wider">
            Enter at your own risk
          </p>
        </div>

        {/* Fielding Team */}
        <Card className="bg-card border-deadly-border p-6 space-y-4">
          <h2 className="text-xl font-black text-deadly-red deadly-text-glow uppercase tracking-wide text-center">
            Fielding Team
          </h2>
          <div className="space-y-2">
            {fieldingTeam.map((member, index) => {
              const isElite = member.toLowerCase().includes("elite");
              return (
                <div
                  key={index}
                  className={`${
                    isElite
                      ? "bg-deadly-red/20 border-deadly-red deadly-glow"
                      : "bg-secondary border-deadly-border"
                  } border rounded-lg p-3 text-center font-bold text-foreground hover:bg-muted transition-colors`}
                >
                  {member}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link to="/set-fielding" className="block">
            <Button variant="deadly" className="w-full h-14 text-lg" size="lg">
              Set Fielding
            </Button>
          </Link>
          
          <Link to="/save-from-fielding" className="block">
            <Button variant="deadly" className="w-full h-14 text-lg" size="lg">
              Save from Fielding
            </Button>
          </Link>
          
          <Link to="/join-team" className="block">
            <Button variant="deadly" className="w-full h-14 text-lg" size="lg">
              Join Fielding Team
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground uppercase tracking-widest pt-4">
          No escape, no mercy
        </div>
      </div>
    </div>
  );
};

export default Index;
