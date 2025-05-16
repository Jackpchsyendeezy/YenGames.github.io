import { useState } from "react";
import { Link, useLocation } from "wouter";
import SearchBar from "./SearchBar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo section */}
          <Link href="/">
            <a className="flex items-center space-x-2">
              <svg className="h-10 w-10 rounded-full bg-accent text-white p-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 10C17 11.1 16.1 12 15 12C13.9 12 13 11.1 13 10C13 8.9 13.9 8 15 8C16.1 8 17 8.9 17 10Z" fill="currentColor"/>
                <path d="M11 10C11 11.1 10.1 12 9 12C7.9 12 7 11.1 7 10C7 8.9 7.9 8 9 8C10.1 8 11 8.9 11 10Z" fill="currentColor"/>
                <path d="M7.05 16.87C7.64 16.34 8.35 16 9.14 16H14.86C15.65 16 16.36 16.34 16.95 16.87L20 19.5V4C20 2.9 19.1 2 18 2H6C4.9 2 4 2.9 4 4V19.5L7.05 16.87Z" fill="currentColor"/>
                <path d="M18 22H6C4.9 22 4 21.1 4 20V19.5L7.05 16.87C7.64 16.34 8.35 16 9.14 16H14.86C15.65 16 16.36 16.34 16.95 16.87L20 19.5V20C20 21.1 19.1 22 18 22Z" fill="currentColor"/>
              </svg>
              <span className="font-poppins font-bold text-2xl text-white">Yendes<span className="text-accent">Games</span></span>
            </a>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <a className={`nav-link ${isActive("/") ? "active text-white" : "text-muted-foreground"}`}>
                Home
              </a>
            </Link>
            <Link href="/?category=Popular">
              <a className={`nav-link ${location.includes("Popular") ? "active text-white" : "text-muted-foreground"}`}>
                Popular
              </a>
            </Link>
            <Link href="/?category=New">
              <a className={`nav-link ${location.includes("New") ? "active text-white" : "text-muted-foreground"}`}>
                New Games
              </a>
            </Link>
            <Link href="/about">
              <a className={`nav-link ${isActive("/about") ? "active text-white" : "text-muted-foreground"}`}>
                About
              </a>
            </Link>
          </nav>
          
          {/* Search Bar */}
          <div className="hidden md:flex relative">
            <SearchBar />
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 py-4">
              <Link href="/">
                <a className={`nav-link ${isActive("/") ? "active" : ""} px-4 py-2`}>
                  Home
                </a>
              </Link>
              <Link href="/?category=Popular">
                <a className={`nav-link ${location.includes("Popular") ? "active" : ""} px-4 py-2 text-muted-foreground`}>
                  Popular
                </a>
              </Link>
              <Link href="/?category=New">
                <a className={`nav-link ${location.includes("New") ? "active" : ""} px-4 py-2 text-muted-foreground`}>
                  New Games
                </a>
              </Link>
              <Link href="/about">
                <a className={`nav-link ${isActive("/about") ? "active" : ""} px-4 py-2 text-muted-foreground`}>
                  About
                </a>
              </Link>
              <div className="relative px-4 mt-2">
                <SearchBar />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
