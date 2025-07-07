import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Star, Trophy, Target, Calendar, Edit, Save, X, Camera } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    rating: 2156,
    title: "Candidate Master",
    country: "United States",
    joinDate: "January 2023",
    bio: "Passionate chess player with focus on tactical play and endgame mastery."
  });

  const stats = {
    totalGames: 487,
    wins: 298,
    draws: 124,
    losses: 65,
    winRate: 61.2,
    currentStreak: 8
  };

  const recentGames = [
    { id: 1, opponent: "Magnus Carlsen", result: "win", rating: 2847, date: "2024-01-10", time: "15+10" },
    { id: 2, opponent: "Fabiano Caruana", result: "draw", rating: 2820, date: "2024-01-08", time: "5+3" },
    { id: 3, opponent: "Ding Liren", result: "win", rating: 2810, date: "2024-01-05", time: "15+10" },
    { id: 4, opponent: "Ian Nepomniachtchi", result: "loss", rating: 2795, date: "2024-01-03", time: "3+2" },
  ];

  const achievements = [
    { id: 1, title: "First Victory", description: "Won your first game", earned: "Jan 2023", icon: "🏆" },
    { id: 2, title: "Rating Milestone", description: "Reached 2000 rating", earned: "Mar 2023", icon: "⭐" },
    { id: 3, title: "Tournament Winner", description: "Won a tournament", earned: "Jun 2023", icon: "👑" },
    { id: 4, title: "Win Streak", description: "Won 10 games in a row", earned: "Dec 2023", icon: "🔥" },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case "win": return "text-green-600";
      case "draw": return "text-yellow-600";
      case "loss": return "text-red-600";
      default: return "text-muted-foreground";
    }
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case "win": return "W";
      case "draw": return "D";
      case "loss": return "L";
      default: return "?";
    }
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
                <Star className="h-6 w-6 text-chess-primary" />
                My Profile
              </h1>
              <p className="text-sm text-muted-foreground">View and manage your chess profile</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="border-chess-primary/20 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-chess-primary/20">
                  <AvatarImage src="/api/placeholder/96/96" alt={profileData.name} />
                  <AvatarFallback className="bg-chess-primary text-white text-2xl">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 p-0">
                  <Camera className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input 
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          className="text-xl font-bold"
                        />
                        <Input 
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          placeholder="Bio"
                        />
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{profileData.name}</h2>
                        <p className="text-muted-foreground">{profileData.bio}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-chess-primary">{profileData.rating}</div>
                    <div className="text-sm text-muted-foreground">Current Rating</div>
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-foreground">{profileData.title}</div>
                    <div className="text-sm text-muted-foreground">Title</div>
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-foreground">{profileData.country}</div>
                    <div className="text-sm text-muted-foreground">Country</div>
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-foreground">{profileData.joinDate}</div>
                    <div className="text-sm text-muted-foreground">Member Since</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="games">Recent Games</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-chess-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-chess-gold" />
                    Game Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Games</span>
                      <span className="font-semibold">{stats.totalGames}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Wins</span>
                      <span className="font-semibold text-green-600">{stats.wins}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Draws</span>
                      <span className="font-semibold text-yellow-600">{stats.draws}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Losses</span>
                      <span className="font-semibold text-red-600">{stats.losses}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-chess-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-chess-primary" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Win Rate</span>
                      <span className="font-semibold">{stats.winRate}%</span>
                    </div>
                    <Progress value={stats.winRate} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Current Streak</span>
                    <span className="font-semibold text-green-600">{stats.currentStreak} wins</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="games" className="space-y-6">
            <Card className="border-chess-primary/20">
              <CardHeader>
                <CardTitle>Recent Games</CardTitle>
                <CardDescription>Your last played games</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentGames.map((game) => (
                    <div key={game.id} className="flex items-center justify-between p-3 border border-border/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getResultColor(game.result)}`}>
                          {getResultIcon(game.result)}
                        </div>
                        <div>
                          <div className="font-semibold">{game.opponent}</div>
                          <div className="text-sm text-muted-foreground">Rating: {game.rating}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">{game.date}</div>
                        <div className="text-sm text-muted-foreground">{game.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="border-chess-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <div className="font-semibold">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground">{achievement.description}</div>
                        <div className="text-xs text-muted-foreground">Earned: {achievement.earned}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-chess-primary/20">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={profileData.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" value={profileData.country} />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;