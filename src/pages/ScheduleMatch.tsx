import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ArrowLeft, Calendar as CalendarIcon, Clock, Users, Plus, Trash2 } from "lucide-react";

const ScheduleMatch = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    opponent: "",
    timeControl: "",
    gameType: "",
    time: "",
    notes: ""
  });

  const [scheduledMatches, setScheduledMatches] = useState([
    {
      id: 1,
      opponent: "ChessMaster2024",
      date: "2024-01-15",
      time: "14:00",
      timeControl: "15+10",
      gameType: "rapid",
      status: "confirmed"
    },
    {
      id: 2,
      opponent: "TacticalGenius",
      date: "2024-01-17",
      time: "19:30",
      timeControl: "5+3",
      gameType: "blitz",
      status: "pending"
    },
    {
      id: 3,
      opponent: "EndgameWizard",
      date: "2024-01-20",
      time: "16:00",
      timeControl: "90+30",
      gameType: "classical",
      status: "confirmed"
    }
  ]);

  const timeControls = [
    { value: "1+0", label: "1+0 (Bullet)" },
    { value: "1+1", label: "1+1 (Bullet)" },
    { value: "3+0", label: "3+0 (Blitz)" },
    { value: "3+2", label: "3+2 (Blitz)" },
    { value: "5+0", label: "5+0 (Blitz)" },
    { value: "5+3", label: "5+3 (Blitz)" },
    { value: "10+0", label: "10+0 (Rapid)" },
    { value: "15+10", label: "15+10 (Rapid)" },
    { value: "30+0", label: "30+0 (Rapid)" },
    { value: "60+0", label: "60+0 (Classical)" },
    { value: "90+30", label: "90+30 (Classical)" }
  ];

  const gameTypes = [
    { value: "bullet", label: "Bullet" },
    { value: "blitz", label: "Blitz" },
    { value: "rapid", label: "Rapid" },
    { value: "classical", label: "Classical" }
  ];

  const handleScheduleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    const newMatch = {
      id: scheduledMatches.length + 1,
      opponent: formData.opponent,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: formData.time,
      timeControl: formData.timeControl,
      gameType: formData.gameType,
      status: "pending"
    };

    setScheduledMatches([...scheduledMatches, newMatch]);
    
    // Reset form
    setFormData({
      opponent: "",
      timeControl: "",
      gameType: "",
      time: "",
      notes: ""
    });
    setSelectedDate(undefined);
  };

  const handleDeleteMatch = (matchId: number) => {
    setScheduledMatches(scheduledMatches.filter(match => match.id !== matchId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
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
                <CalendarIcon className="h-6 w-6 text-chess-primary" />
                Schedule Match
              </h1>
              <p className="text-sm text-muted-foreground">Plan your next competitive games</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Schedule New Match */}
          <div>
            <Card className="border-chess-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-chess-primary" />
                  Schedule New Match
                </CardTitle>
                <CardDescription>Plan a future chess game with an opponent</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleScheduleMatch} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="opponent">Opponent Username</Label>
                    <Input
                      id="opponent"
                      value={formData.opponent}
                      onChange={(e) => setFormData({...formData, opponent: e.target.value})}
                      placeholder="Enter opponent's username"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Game Type</Label>
                      <Select onValueChange={(value) => setFormData({...formData, gameType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select game type" />
                        </SelectTrigger>
                        <SelectContent>
                          {gameTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Time Control</Label>
                      <Select onValueChange={(value) => setFormData({...formData, timeControl: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time control" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeControls.map((control) => (
                            <SelectItem key={control.value} value={control.value}>
                              {control.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Any additional notes about the match..."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Schedule Match
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Scheduled Matches */}
          <div>
            <Card className="border-chess-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-chess-primary" />
                  Scheduled Matches
                </CardTitle>
                <CardDescription>Your upcoming and pending games</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scheduledMatches.map((match) => (
                    <div key={match.id} className="p-4 border border-border/30 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-semibold text-foreground">{match.opponent}</div>
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(match.date), "PPP")} at {match.time}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(match.status)}>
                            {match.status}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteMatch(match.id)}
                            className="h-6 w-6 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {match.timeControl}
                        </span>
                        <span className="capitalize">{match.gameType}</span>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1">
                          Edit
                        </Button>
                        <Button size="sm" className="flex-1">
                          {match.status === "pending" ? "Confirm" : "Join Game"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {scheduledMatches.length === 0 && (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No scheduled matches</h3>
                    <p className="text-muted-foreground">Schedule your first match to get started</p>
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

export default ScheduleMatch;