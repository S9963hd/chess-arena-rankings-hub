import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Zap, Clock, Users, Target, Play, Shuffle } from "lucide-react";

const StartPlaying = () => {
  const [gameType, setGameType] = useState("");
  const [timeControl, setTimeControl] = useState("");
  const [ratingRange, setRatingRange] = useState([2000, 2200]);
  const [isSearching, setIsSearching] = useState(false);

  const gameTypes = [
    { id: "blitz", name: "Blitz", description: "3-5 minute games", icon: "⚡" },
    { id: "rapid", name: "Rapid", description: "10-15 minute games", icon: "🏃" },
    { id: "classical", name: "Classical", description: "30+ minute games", icon: "🏛️" },
    { id: "bullet", name: "Bullet", description: "1-2 minute games", icon: "🚀" }
  ];

  const timeControls = {
    bullet: ["1+0", "1+1", "2+1"],
    blitz: ["3+0", "3+2", "5+0", "5+3"],
    rapid: ["10+0", "10+5", "15+10", "30+0"],
    classical: ["60+0", "90+30", "120+0"]
  };

  const onlineUsers = [
    { id: 1, name: "ChessMaster2024", rating: 2156, status: "Looking for game", gameType: "blitz" },
    { id: 2, name: "TacticalGenius", rating: 2089, status: "In game", gameType: "rapid" },
    { id: 3, name: "EndgameWizard", rating: 2234, status: "Looking for game", gameType: "classical" },
    { id: 4, name: "BlitzKing", rating: 1987, status: "Looking for game", gameType: "blitz" },
    { id: 5, name: "QueenSacrifice", rating: 2301, status: "Looking for game", gameType: "rapid" }
  ];

  const handleStartSearch = () => {
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setIsSearching(false);
      // Handle match found
    }, 3000);
  };

  const handleQuickMatch = () => {
    setIsSearching(true);
    // Handle quick match logic
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  const handleChallengeUser = (userId: number) => {
    console.log("Challenging user:", userId);
    // Handle challenge logic
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Zap className="h-6 w-6 text-chess-primary" />
                Start Playing
              </h1>
              <p className="text-sm text-muted-foreground">Find opponents and start your chess journey</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Setup */}
          <div className="lg:col-span-2 space-y-6">
            {/* Game Type Selection */}
            <Card className="border-chess-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-chess-primary" />
                  Choose Game Type
                </CardTitle>
                <CardDescription>Select your preferred game format</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {gameTypes.map((type) => (
                    <Card 
                      key={type.id}
                      className={`cursor-pointer transition-all border-chess-primary/20 hover:border-chess-primary/50 ${
                        gameType === type.id ? 'ring-2 ring-chess-primary border-chess-primary' : ''
                      }`}
                      onClick={() => setGameType(type.id)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{type.icon}</div>
                        <div className="font-semibold text-sm">{type.name}</div>
                        <div className="text-xs text-muted-foreground">{type.description}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Time Control */}
            {gameType && (
              <Card className="border-chess-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-chess-primary" />
                    Time Control
                  </CardTitle>
                  <CardDescription>Select time limits for your game</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {timeControls[gameType as keyof typeof timeControls]?.map((time) => (
                      <Button
                        key={time}
                        variant={timeControl === time ? "default" : "outline"}
                        onClick={() => setTimeControl(time)}
                        className="h-12"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Rating Range */}
            <Card className="border-chess-primary/20">
              <CardHeader>
                <CardTitle>Opponent Rating Range</CardTitle>
                <CardDescription>Choose the rating range for your opponents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Rating: {ratingRange[0]} - {ratingRange[1]}</Label>
                  <Slider
                    value={ratingRange}
                    onValueChange={setRatingRange}
                    max={3000}
                    min={800}
                    step={50}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Beginner (800)</span>
                  <span>Expert (3000)</span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleStartSearch}
                disabled={!gameType || !timeControl || isSearching}
                className="w-full h-12"
                size="lg"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Searching for opponent...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Game
                  </>
                )}
              </Button>
              
              <Button 
                onClick={handleQuickMatch}
                variant="outline"
                className="w-full h-12"
                size="lg"
              >
                <Shuffle className="h-4 w-4 mr-2" />
                Quick Match (Any settings)
              </Button>
            </div>
          </div>

          {/* Online Users */}
          <div>
            <Card className="border-chess-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-chess-primary" />
                  Online Players
                </CardTitle>
                <CardDescription>Challenge other players directly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {onlineUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border border-border/30 rounded-lg">
                      <div>
                        <div className="font-semibold text-sm">{user.name}</div>
                        <div className="text-xs text-muted-foreground">Rating: {user.rating}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <div className={`w-2 h-2 rounded-full ${
                            user.status === "Looking for game" ? "bg-green-500" : "bg-yellow-500"
                          }`}></div>
                          <span className="text-xs text-muted-foreground">{user.status}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge variant="secondary" className="text-xs">
                          {user.gameType}
                        </Badge>
                        {user.status === "Looking for game" && (
                          <Button 
                            size="sm" 
                            className="h-6 text-xs"
                            onClick={() => handleChallengeUser(user.id)}
                          >
                            Challenge
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-chess-primary-light rounded-lg">
                  <div className="text-sm font-medium text-chess-primary mb-1">
                    {onlineUsers.filter(u => u.status === "Looking for game").length} players looking for games
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Average wait time: 30 seconds
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPlaying;