import { Link } from "wouter";

export default function SchoolSection() {
  return (
    <section className="mt-16 bg-secondary rounded-xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
            alt="Park City High School" 
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold font-poppins mb-4">Park City <span className="text-accent">High School</span></h2>
          <p className="text-muted-foreground mb-4">
            Experience the best unblocked games collection curated for Park City High School students. Take a break and enjoy these games during your free time.
          </p>
          <p className="text-muted-foreground mb-6">
            This collection features a variety of games across multiple genres, all playable directly in your browser without any downloads or installations required.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <Link href="/about">
              <a className="inline-flex justify-center items-center px-4 py-2 bg-accent hover:bg-opacity-80 transition rounded-lg font-medium">
                Learn More 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </Link>
            <a 
              href="https://pchs.pcschools.us/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex justify-center items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 transition rounded-lg font-medium"
            >
              School Website
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
