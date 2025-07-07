import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Zap, Trophy, Users, Calendar, ArrowLeft, Search, Filter, Clock } from "lucide-react";

const Competitions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const competitions = [
    { 
      id: 1, 
      name: "World Chess Championship", 
      participants: 16, 
      prize: "$2M", 
      status: "live", 
      daysLeft: 5,
      description: "The ultimate chess competition featuring the world's best players",
      startDate: "2024-01-15",
      endDate: "2024-01-20"
    },
    { 
      id: 2, 
      name: "Rapid Tournament", 
      participants: 32, 
      prize: "$500K", 
      status: "upcoming", 
      daysLeft: 12,
      description: "Fast-paced rapid chess tournament with 15-minute games",
      startDate: "2024-01-27",
      endDate: "2024-01-28"
    },
    { 
      id: 3, 
      name: "Blitz Masters", 
      participants: 64, 
      prize: "$100K", 
      status: "upcoming", 
      daysLeft: 20,
      description: "Lightning-fast blitz chess for the quickest minds",
      startDate: "2024-02-05",
      endDate: "2024-02-06"
    },
    { 
      id: 4, 
      name: "Junior Championship", 
      participants: 128, 
      prize: "$50K", 
      status: "registration", 
      daysLeft: 30,
      description: "Exclusive tournament for players under 18 years old",
      startDate: "2024-02-15",
      endDate: "2024-02-18"
    },
    { 
      id: 5, 
      name: "Women's Grand Prix", 
      participants: 24, 
      prize: "$300K", 
      status: "upcoming", 
      daysLeft: 45,
      description: "Prestigious women's chess championship series",
      startDate: "2024-03-01",
      endDate: "2024-03-05"
    },
    { 
      id: 6, 
      name: "Online Bullet Tournament", 
      participants: 256, 
      prize: "$25K", 
      status: "completed", 
      daysLeft: 0,
      description: "Ultra-fast 1-minute games in online format",
      startDate: "2024-01-01",
      endDate: "2024-01-02"
    }
  ];

  const filteredCompetitions = competitions.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || comp.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "bg-chess-accent text-white";
      case "upcoming": return "bg-chess-primary/10 text-chess-primary";
      case "registration": return "bg-chess-secondary/10 text-chess-secondary";
      case "completed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "live": return "● LIVE";
      case "upcoming": return "UPCOMING";
      case "registration": return "OPEN REGISTRATION";
      case "completed": return "COMPLETED";
      default: return status.toUpperCase();
    }
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
                  <Zap className="h-6 w-6 text-chess-primary" />
                  All Competitions
                </h1>
                <p className="text-sm text-muted-foreground">Discover and join chess tournaments worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search competitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button 
              variant={filter === "live" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("live")}
            >
              Live
            </Button>
            <Button 
              variant={filter === "upcoming" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </Button>
            <Button 
              variant={filter === "registration" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("registration")}
            >
              Registration Open
            </Button>
          </div>
        </div>

        {/* Competition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCompetitions.map((comp) => (
            <Card key={comp.id} className="border-chess-primary/20 hover:border-chess-primary/50 transition-all duration-200 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg">{comp.name}</CardTitle>
                  <Badge className={getStatusColor(comp.status)}>
                    {getStatusText(comp.status)}
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  {comp.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-3 w-3" />
                      {comp.participants} players
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Trophy className="h-3 w-3" />
                      {comp.prize}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {comp.startDate} - {comp.endDate}
                    </span>
                  </div>

                  {comp.status !== "completed" && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {comp.status === "live" 
                        ? `Ends in ${comp.daysLeft} days` 
                        : `Starts in ${comp.daysLeft} days`
                      }
                    </div>
                  )}

                  <div className="pt-3 border-t border-border/30">
                    <Button 
                      className="w-full" 
                      variant={comp.status === "live" ? "default" : comp.status === "completed" ? "outline" : "default"}
                      disabled={comp.status === "completed"}
                    >
                      {comp.status === "live" ? "Join Live" : 
                       comp.status === "completed" ? "View Results" : 
                       "Register Now"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCompetitions.length === 0 && (
          <div className="text-center py-12">
            <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No competitions found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Competitions;