import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calculator } from "lucide-react";
import { toast } from "sonner";
import { useAudio } from "@/contexts/AudioContext";

const SetFielding = () => {
  const navigate = useNavigate();
  const { playSong, stopSong, currentSong } = useAudio();

  // Stop MILA TOH MAREGA when entering this page
  useEffect(() => {
    if (currentSong?.title === "MILA TOH MAREGA") {
      stopSong();
    }
  }, []);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [hours, setHours] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    const hoursNum = parseFloat(hours);
    if (!hoursNum || hoursNum <= 0) {
      toast.error("Enter valid hours");
      return;
    }
    const price = hoursNum * 50; // ₹50 per hour
    setCalculatedPrice(price);
  };

  const handleSubmit = () => {
    if (!name || !place || !time) {
      toast.error("Fill all fields");
      return;
    }

    // Play the song BEFORE showing toast and navigating (7-17 seconds segment in loop)
    playSong({
      title: "Dus Don",
      artist: "Dada Sadhu HR × Gadi Number",
      src: "/dus-don.mp3",
      startTime: 7,
      endTime: 17,
      loop: true,
    });

    toast.success("Fielding Set Successfully!");

    // Navigate to homepage after a longer delay to ensure audio starts
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-deadly-darker py-8 px-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-deadly-red">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-3xl font-black text-deadly-red deadly-text-glow uppercase tracking-tight">
            Set Fielding
          </h1>
        </div>

        {/* Form */}
        <Card className="bg-card border-deadly-border p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground uppercase tracking-wide text-sm">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="bg-input border-deadly-border text-foreground font-bold"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="place" className="text-foreground uppercase tracking-wide text-sm">
              Place
            </Label>
            <Input
              id="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Enter location"
              className="bg-input border-deadly-border text-foreground font-bold"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-foreground uppercase tracking-wide text-sm">
              Time
            </Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-input border-deadly-border text-foreground font-bold"
            />
          </div>

          <div className="border-t border-deadly-border pt-6 space-y-4">
            <div className="flex items-center gap-2 text-deadly-red">
              <Calculator className="w-5 h-5" />
              <h3 className="font-black uppercase tracking-wide">Price Calculator</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hours" className="text-foreground uppercase tracking-wide text-sm">
                Hours
              </Label>
              <Input
                id="hours"
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Enter hours"
                className="bg-input border-deadly-border text-foreground font-bold"
              />
            </div>

            <Button
              onClick={calculatePrice}
              variant="deadly"
              className="w-full"
            >
              Calculate
            </Button>

            {calculatedPrice !== null && (
              <div className="bg-secondary border border-deadly-red rounded-lg p-4 text-center deadly-glow">
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                  Total Price
                </p>
                <p className="text-3xl font-black text-deadly-red deadly-text-glow">
                  ₹{calculatedPrice}
                </p>
              </div>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            variant="deadly"
            className="w-full h-12 text-lg"
          >
            Submit
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default SetFielding;
