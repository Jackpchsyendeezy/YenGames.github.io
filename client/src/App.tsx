import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import Home from "@/pages/Home";
import GamePage from "@/pages/GamePage";
import About from "@/pages/About";
import PopularGamesPage from "@/pages/PopularGamesPage";
import NewGamesPage from "@/pages/NewGamesPage";
import NotFound from "@/pages/not-found";

// Layout
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/game/:id" component={GamePage} />
      <Route path="/about" component={About} />
      <Route path="/popular" component={PopularGamesPage} />
      <Route path="/new" component={NewGamesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Header />
        <main className="min-h-screen">
          <Router />
        </main>
        <Footer />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;