import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/">
          <a className="text-muted-foreground hover:text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Games
          </a>
        </Link>
      </div>
      
      <div className="bg-secondary rounded-xl overflow-hidden shadow-lg">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
            alt="About YendesGames"
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white">About YendesGames</h1>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              YendesGames was created to provide Park City High School students with a collection of fun, engaging games that can be played during breaks or free time. Our platform features a wide variety of games across different genres, all accessible directly from your browser without any downloads or installations required.
            </p>
            <p className="text-muted-foreground">
              We believe that short gaming breaks can help refresh your mind and improve focus when returning to studies. That's why we've curated this collection of browser-based games that are quick to load and easy to play.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">About Park City High School</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                  alt="Park City High School" 
                  className="rounded-lg shadow-lg w-full mb-4"
                />
              </div>
              <div className="md:w-1/2">
                <p className="text-muted-foreground mb-4">
                  Park City High School is located in Park City, Utah, and is known for its excellent academic programs, athletics, and extracurricular activities. The school promotes a balanced approach to education, recognizing the importance of both academic achievement and mental wellbeing.
                </p>
                <p className="text-muted-foreground mb-4">
                  We created YendesGames with PCHS students in mind, knowing that short breaks between study sessions can help improve overall productivity and mental health.
                </p>
                <a 
                  href="https://pchs.pcschools.us/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-accent hover:underline"
                >
                  Visit the official PCHS website
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How to Use YendesGames</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background p-5 rounded-lg">
                <div className="bg-accent/20 text-accent rounded-full w-10 h-10 flex items-center justify-center mb-4">1</div>
                <h3 className="text-lg font-bold mb-2">Browse Games</h3>
                <p className="text-muted-foreground">
                  Explore our collection of games categorized by genre. Use the filter options to find games that interest you.
                </p>
              </div>
              <div className="bg-background p-5 rounded-lg">
                <div className="bg-accent/20 text-accent rounded-full w-10 h-10 flex items-center justify-center mb-4">2</div>
                <h3 className="text-lg font-bold mb-2">Select a Game</h3>
                <p className="text-muted-foreground">
                  Click on any game card to view more details about the game, including its description and controls.
                </p>
              </div>
              <div className="bg-background p-5 rounded-lg">
                <div className="bg-accent/20 text-accent rounded-full w-10 h-10 flex items-center justify-center mb-4">3</div>
                <h3 className="text-lg font-bold mb-2">Play!</h3>
                <p className="text-muted-foreground">
                  Click the "Play Now" button to launch the game in a new tab, ready for you to enjoy during your break.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-6">
              Have a game suggestion or feedback? We'd love to hear from you! Use the button below to send us a message.
            </p>
            <Button className="bg-accent hover:bg-accent/80">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Contact Us
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
