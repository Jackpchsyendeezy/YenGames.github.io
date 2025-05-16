import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { Category } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryFilterProps {
  activeCategory: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ activeCategory, onChange }: CategoryFilterProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  useEffect(() => {
    // Scroll active category into view when it changes
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.querySelector('.active');
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeCategory]);

  if (isLoading) {
    return (
      <section className="mb-8">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Skeleton key={item} className="h-9 w-24 rounded-full" />
          ))}
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      <div 
        ref={scrollContainerRef}
        className="flex items-center space-x-2 overflow-x-auto pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-filter ${activeCategory === category.name ? 'active' : 'text-muted-foreground'}`}
            onClick={() => onChange(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
}
