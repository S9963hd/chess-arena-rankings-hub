import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Trophy, Crown, Zap, Users, Calendar, ArrowRight, Star, Edit, Save, X, Plus, Minus } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [editingPlayer, setEditingPlayer] = useState<number | null>(null);
  const [players, setPlayers] = useState([
    { id: 1, name: "Magnus Carlsen", rating: 2847, avatar: "/api/placeholder/40/40", rank: 1, points: 12.5 },
    { id: 2, name: "Fabiano Caruana", rating: 2820, avatar: "/api/placeholder/40/40", rank: 2, points: 11.0 },
    { id: 3, name: "Ding Liren", rating: 2810, avatar: "/api/placeholder/40/40", rank: 3, points: 10.5 },
    { id: 4, name: "Ian Nepomniachtchi", rating: 2795, avatar: "/api/placeholder/40/40", rank: 4, points: 10.0 },
    { id: 5, name: "Anish Giri", rating: 2780, avatar: "/api/placeholder/40/40", rank: 5, points: 9.5 },
  ]);
  const [editForm, setEditForm] = useState({ name: "", rating: 0 });

  const handleEdit = (player: any) => {
    setEditingPlayer(player.id);
    setEditForm({ name: player.name, rating: player.rating });
  };

  const handleSave = (playerId: number) => {
    setPlayers(players.map(player => 
      player.id === playerId 
        ? { ...player, name: editForm.name, rating: editForm.rating }
        : player
    ));
    setEditingPlayer(null);
  };

  const handleCancel = () => {
    setEditingPlayer(null);
    setEditForm({ name: "", rating: 0 });
  };

  const handlePointsChange = (playerId: number, change: number) => {
    setPlayers(players.map(player => 
      player.id === playerId 
        ? { ...player, points: Math.max(0, player.points + change) }
        : player
    ));
  };

  const activeCompetitions = [
    { id: 1, name: "World Chess Championship", participants: 16, prize: "$2M", status: "live", daysLeft: 5 },
    { id: 2, name: "Rapid Tournament", participants: 32, prize: "$500K", status: "upcoming", daysLeft: 12 },
    { id: 3, name: "Blitz Masters", participants: 64, prize: "$100K", status: "upcoming", daysLeft: 20 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-chess-primary-light via-background to-muted" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <Crown className="h-12 w-12 text-chess-primary mr-3" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-chess-primary to-chess-secondary bg-clip-text text-transparent">
                ChessArena
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Compete in prestigious tournaments, climb the rankings, and prove your chess mastery in our global arena.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/join-tournament">
                <Button size="lg" className="h-12 px-8">
                  <Zap className="h-4 w-4 mr-2" />
                  Join Tournament
                </Button>
              </Link>
              <Link to="/rankings">
                <Button variant="outline" size="lg" className="h-12 px-8">
                  View Rankings
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="backdrop-blur-sm border-chess-primary/20 shadow-lg">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-chess-gold mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground">156</div>
              <div className="text-sm text-muted-foreground">Active Tournaments</div>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-sm border-chess-primary/20 shadow-lg">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-chess-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground">12.4K</div>
              <div className="text-sm text-muted-foreground">Registered Players</div>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-sm border-chess-primary/20 shadow-lg">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-chess-accent mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground">8</div>
              <div className="text-sm text-muted-foreground">Live Matches</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <Card className="border-chess-primary/20 shadow-lg">
            <CardHeader className="border-b border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-chess-gold" />
                    Global Rankings
                  </CardTitle>
                  <CardDescription>Top chess masters worldwide</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-chess-primary-light text-chess-primary">
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {players.map((player, index) => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-4 border-b border-border/30 last:border-b-0 hover:bg-muted/50 transition-colors ${
                      index === 0 ? 'bg-chess-gold/5' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        index === 0 ? 'bg-chess-gold text-white' :
                        index === 1 ? 'bg-muted text-foreground' :
                        index === 2 ? 'bg-chess-secondary/30 text-foreground' :
                        'bg-muted/50 text-muted-foreground'
                      }`}>
                        {player.rank}
                      </div>
                      <Avatar className="h-10 w-10 border-2 border-chess-primary/20">
                        <AvatarImage src={player.avatar} alt={player.name} />
                        <AvatarFallback className="bg-chess-primary text-white">
                          {player.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        {editingPlayer === player.id ? (
                          <div className="space-y-2">
                            <Input 
                              value={editForm.name}
                              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                              className="h-8 text-sm"
                              placeholder="Player name"
                            />
                            <Input 
                              type="number"
                              value={editForm.rating}
                              onChange={(e) => setEditForm({...editForm, rating: parseInt(e.target.value) || 0})}
                              className="h-8 text-sm"
                              placeholder="Rating"
                            />
                          </div>
                        ) : (
                          <div>
                            <div className="font-semibold text-foreground flex items-center gap-1">
                              {player.name}
                              {index === 0 && <Crown className="h-4 w-4 text-chess-gold" />}
                            </div>
                            <div className="text-sm text-muted-foreground">Rating: {player.rating}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right mr-3">
                        <div className="font-bold text-chess-primary">{player.points} pts</div>
                        <div className="text-xs text-muted-foreground">Tournament points</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => handlePointsChange(player.id, -0.5)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => handlePointsChange(player.id, 0.5)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-1">
                        {editingPlayer === player.id ? (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => handleSave(player.id)}
                            >
                              <Save className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={handleCancel}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => handleEdit(player)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border/50">
                <Link to="/rankings" className="w-full">
                  <Button variant="outline" className="w-full">
                    View Full Rankings
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Active Competitions */}
          <Card className="border-chess-primary/20 shadow-lg">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-chess-primary" />
                Active Competitions
              </CardTitle>
              <CardDescription>Join live and upcoming tournaments</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {activeCompetitions.map((comp) => (
                  <div key={comp.id} className="p-4 rounded-lg border border-border/50 hover:border-chess-primary/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{comp.name}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {comp.participants} players
                          </span>
                          <span className="flex items-center gap-1">
                            <Trophy className="h-3 w-3" />
                            {comp.prize}
                          </span>
                        </div>
                      </div>
                      <Badge 
                        variant={comp.status === 'live' ? 'default' : 'secondary'}
                        className={comp.status === 'live' ? 'bg-chess-accent text-white' : ''}
                      >
                        {comp.status === 'live' ? '● LIVE' : 'UPCOMING'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {comp.status === 'live' ? `Ends in ${comp.daysLeft} days` : `Starts in ${comp.daysLeft} days`}
                      </span>
                      <Button 
                        size="sm" 
                        variant={comp.status === 'live' ? 'default' : 'outline'}
                        className={comp.status === 'live' ? 'bg-chess-primary hover:bg-chess-primary/90' : ''}
                      >
                        {comp.status === 'live' ? 'Join Live' : 'Register'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/competitions" className="w-full">
                <Button className="w-full mt-4" variant="outline">
                  View All Competitions
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/start-playing">
              <Card className="border-chess-primary/20 hover:border-chess-primary/50 transition-colors cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-chess-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-chess-primary/20 transition-colors">
                    <Zap className="h-6 w-6 text-chess-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Start Playing</h3>
                  <p className="text-sm text-muted-foreground">Find opponents and start your chess journey</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/schedule-match">
              <Card className="border-chess-primary/20 hover:border-chess-primary/50 transition-colors cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-chess-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-chess-secondary/20 transition-colors">
                    <Calendar className="h-6 w-6 text-chess-secondary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Schedule Match</h3>
                  <p className="text-sm text-muted-foreground">Plan your next competitive game</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/profile">
              <Card className="border-chess-primary/20 hover:border-chess-primary/50 transition-colors cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-chess-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-chess-accent/20 transition-colors">
                    <Star className="h-6 w-6 text-chess-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">View Profile</h3>
                  <p className="text-sm text-muted-foreground">Check your stats and achievements</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;