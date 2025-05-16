import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAllGames, useGamesByCategory, useSearchGames, usePopularGames, useNewGames } from "@/hooks/useGames";
import FeaturedGames from "@/components/FeaturedGames";
import CategoryFilter from "@/components/CategoryFilter";
import GameGrid from "@/components/GameGrid";
import SchoolSection from "@/components/SchoolSection";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Home() {
  // Parse query parameters
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const initialCategory = searchParams.get('category') || 'All Games';
  const searchQuery = searchParams.get('search') || '';
  
  // State
  const [activeCategory, setActiveCategory] = useLocalStorage('activeCategory', initialCategory);
  const [title, setTitle] = useState('Popular');
  
  // Queries
  const { data: allGames, isLoading: isLoadingAll } = useAllGames();
  const { data: filteredGames, isLoading: isLoadingFiltered } = useGamesByCategory(activeCategory);
  const { data: searchResults, isLoading: isLoadingSearch } = useSearchGames(searchQuery);
  const { data: popularGames, isLoading: isLoadingPopular } = usePopularGames();
  const { data: newGames, isLoading: isLoadingNew } = useNewGames();
  
  // Effect to update the active category and title based on URL params
  useEffect(() => {
    if (searchParams.get('category')) {
      setActiveCategory(searchParams.get('category') || 'All Games');
      setTitle(searchParams.get('category') || 'Popular');
    } else if (searchQuery) {
      setTitle('Search Results');
    } else {
      setTitle('Popular');
    }
  }, [location, searchQuery, setActiveCategory]);
  
  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setTitle(category === 'All Games' ? 'Popular' : category);
  };
  
  // Determine which games to display
  const getGamesToDisplay = () => {
    if (searchQuery) {
      return searchResults;
    }
    
    if (activeCategory === 'Popular') {
      return popularGames;
    }
    
    if (activeCategory === 'New') {
      return newGames;
    }
    
    return activeCategory === 'All Games' ? allGames : filteredGames;
  };
  
  // Determine if loading
  const isLoading = searchQuery 
    ? isLoadingSearch 
    : activeCategory === 'All Games' 
      ? isLoadingAll 
      : activeCategory === 'Popular' 
        ? isLoadingPopular 
        : activeCategory === 'New'
          ? isLoadingNew
          : isLoadingFiltered;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Games Carousel */}
      <FeaturedGames />
      
      {/* Category Filter */}
      <CategoryFilter 
        activeCategory={activeCategory} 
        onChange={handleCategoryChange} 
      />
      
      {/* Game Grid */}
      <GameGrid 
        title={title}
        games={getGamesToDisplay()}
        isLoading={isLoading}
      />
      
      {/* School Section */}
      <SchoolSection />
    </div>
  );
}
