import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Zap, Trophy, Users, Calendar, ArrowLeft, Clock, Star } from "lucide-react";

const JoinTournament = () => {
  const [selectedTournament, setSelectedTournament] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    rating: "",
    experience: "",
    motivation: "",
    agreeTerms: false
  });

  const availableTournaments = [
    { 
      id: "rapid", 
      name: "Rapid Tournament", 
      participants: 32, 
      prize: "$500K", 
      status: "upcoming", 
      daysLeft: 12,
      requirements: "Rating: 2000+",
      entryFee: "$50"
    },
    { 
      id: "blitz", 
      name: "Blitz Masters", 
      participants: 64, 
      prize: "$100K", 
      status: "upcoming", 
      daysLeft: 20,
      requirements: "Rating: 1800+",
      entryFee: "$25"
    },
    { 
      id: "junior", 
      name: "Junior Championship", 
      participants: 128, 
      prize: "$50K", 
      status: "registration", 
      daysLeft: 30,
      requirements: "Age: Under 18",
      entryFee: "$15"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tournament registration:", { selectedTournament, ...formData });
    // Handle registration logic here
  };

  const selectedTournamentData = availableTournaments.find(t => t.id === selectedTournament);

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
                Join Tournament
              </h1>
              <p className="text-sm text-muted-foreground">Register for upcoming chess competitions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Tournaments */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Available Tournaments</h2>
              <div className="space-y-4">
                {availableTournaments.map((tournament) => (
                  <Card 
                    key={tournament.id} 
                    className={`cursor-pointer transition-all border-chess-primary/20 hover:border-chess-primary/50 ${
                      selectedTournament === tournament.id ? 'ring-2 ring-chess-primary border-chess-primary' : ''
                    }`}
                    onClick={() => setSelectedTournament(tournament.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-foreground">{tournament.name}</h3>
                        <Badge variant="secondary" className="bg-chess-primary-light text-chess-primary">
                          {tournament.status === 'upcoming' ? 'UPCOMING' : 'OPEN'}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {tournament.participants} players
                          </span>
                          <span className="flex items-center gap-1">
                            <Trophy className="h-3 w-3" />
                            {tournament.prize}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Starts in {tournament.daysLeft} days
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {tournament.entryFee}
                          </span>
                        </div>
                        <div className="text-xs">
                          Requirements: {tournament.requirements}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div>
            <Card className="border-chess-primary/20">
              <CardHeader>
                <CardTitle>Tournament Registration</CardTitle>
                <CardDescription>
                  {selectedTournamentData 
                    ? `Register for ${selectedTournamentData.name}` 
                    : "Select a tournament to register"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedTournamentData ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rating">Chess Rating</Label>
                      <Input
                        id="rating"
                        type="number"
                        value={formData.rating}
                        onChange={(e) => setFormData({...formData, rating: e.target.value})}
                        placeholder="Enter your chess rating"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience Level</Label>
                      <Select onValueChange={(value) => setFormData({...formData, experience: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner (0-1200)</SelectItem>
                          <SelectItem value="intermediate">Intermediate (1200-1800)</SelectItem>
                          <SelectItem value="advanced">Advanced (1800-2200)</SelectItem>
                          <SelectItem value="expert">Expert (2200+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivation">Why do you want to participate?</Label>
                      <Textarea
                        id="motivation"
                        value={formData.motivation}
                        onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                        placeholder="Tell us about your motivation..."
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => setFormData({...formData, agreeTerms: checked as boolean})}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the tournament rules and terms of service
                      </Label>
                    </div>

                    <div className="pt-4 border-t border-border/30">
                      <div className="mb-4 p-3 bg-chess-primary-light rounded-lg">
                        <div className="text-sm font-medium text-chess-primary mb-1">
                          Registration Summary
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Tournament: {selectedTournamentData.name}<br />
                          Entry Fee: {selectedTournamentData.entryFee}<br />
                          Prize Pool: {selectedTournamentData.prize}
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={!formData.agreeTerms}
                      >
                        Register for Tournament
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Select a tournament from the left to begin registration</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTournament;