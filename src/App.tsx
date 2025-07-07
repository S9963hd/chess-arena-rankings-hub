import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Rankings from "./pages/Rankings";
import Competitions from "./pages/Competitions";
import JoinTournament from "./pages/JoinTournament";
import Profile from "./pages/Profile";
import StartPlaying from "./pages/StartPlaying";
import ScheduleMatch from "./pages/ScheduleMatch";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/join-tournament" element={<JoinTournament />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/start-playing" element={<StartPlaying />} />
          <Route path="/schedule-match" element={<ScheduleMatch />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
