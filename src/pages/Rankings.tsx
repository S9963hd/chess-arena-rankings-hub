import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Trophy, Crown, ArrowLeft, Edit, Save, X, Plus, Minus, Search } from "lucide-react";

const Rankings = () => {
  const [editingPlayer, setEditingPlayer] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [players, setPlayers] = useState([
    { id: 1, name: "Magnus Carlsen", rating: 2847, avatar: "/api/placeholder/40/40", rank: 1, points: 12.5, country: "Norway" },
    { id: 2, name: "Fabiano Caruana", rating: 2820, avatar: "/api/placeholder/40/40", rank: 2, points: 11.0, country: "USA" },
    { id: 3, name: "Ding Liren", rating: 2810, avatar: "/api/placeholder/40/40", rank: 3, points: 10.5, country: "China" },
    { id: 4, name: "Ian Nepomniachtchi", rating: 2795, avatar: "/api/placeholder/40/40", rank: 4, points: 10.0, country: "Russia" },
    { id: 5, name: "Anish Giri", rating: 2780, avatar: "/api/placeholder/40/40", rank: 5, points: 9.5, country: "Netherlands" },
    { id: 6, name: "Wesley So", rating: 2770, avatar: "/api/placeholder/40/40", rank: 6, points: 9.0, country: "USA" },
    { id: 7, name: "Levon Aronian", rating: 2765, avatar: "/api/placeholder/40/40", rank: 7, points: 8.5, country: "Armenia" },
    { id: 8, name: "Maxime Vachier-Lagrave", rating: 2760, avatar: "/api/placeholder/40/40", rank: 8, points: 8.0, country: "France" },
  ]);
  const [editForm, setEditForm] = useState({ name: "", rating: 0 });

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-chess-gold" />
                  Global Rankings
                </h1>
                <p className="text-sm text-muted-foreground">Complete leaderboard of all chess players</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-chess-primary-light text-chess-primary">
              Live Updates
            </Badge>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search players or countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Filter by Country</Button>
            <Button variant="outline" size="sm">Sort by Rating</Button>
          </div>
        </div>

        {/* Rankings Table */}
        <Card className="border-chess-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle>Complete Rankings</CardTitle>
            <CardDescription>
              Showing {filteredPlayers.length} of {players.length} players
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {filteredPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-4 border-b border-border/30 last:border-b-0 hover:bg-muted/50 transition-colors ${
                    index === 0 ? 'bg-chess-gold/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${
                      index === 0 ? 'bg-chess-gold text-white' :
                      index === 1 ? 'bg-muted text-foreground' :
                      index === 2 ? 'bg-chess-secondary/30 text-foreground' :
                      'bg-muted/50 text-muted-foreground'
                    }`}>
                      {player.rank}
                    </div>
                    <Avatar className="h-12 w-12 border-2 border-chess-primary/20">
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
                          <div className="font-semibold text-foreground flex items-center gap-2">
                            {player.name}
                            {index === 0 && <Crown className="h-4 w-4 text-chess-gold" />}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <span>Rating: {player.rating}</span>
                            <span>•</span>
                            <span>{player.country}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold text-chess-primary text-lg">{player.points}</div>
                      <div className="text-xs text-muted-foreground">points</div>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Rankings;