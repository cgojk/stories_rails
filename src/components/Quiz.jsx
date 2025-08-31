



import React from "react";
import CardsEntry from "./CardsEntry";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function Quiz() {
  const [podcasts, setPodcasts] = React.useState([]);

  React.useEffect(() => {
    async function fetchPodcasts() {
      try {
        const response = await fetch(`${BASE_URL}/api/podcasts`); // 
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          // Take only the first three podcasts and use Cloudinary URLs directly
          const firstThree = data.slice(0, 3).map(podcast => ({
            ...podcast,
            image: podcast.image || "/images/events.jpg", // fallback if missing
          }));
          setPodcasts(firstThree);
        }
      } catch (error) {
        console.error("Failed to fetch podcasts:", error);
      }
    }

    fetchPodcasts();
  }, []);

  return (
    <section className="quiz_wrapper">
      <h1 className="mission-title discover_stories_title">Discover Stories unknown about our station</h1>
      <section className="container section_quiz">
        <h2 className="title_section title_section_quiz">
          Listen the most recent stories from our community
        </h2>
        <p className="paragraph_quiz">
          Roma Street Station, beyond its historical and cultural heritage, hides fascinating
          stories shared by our community. Explore these tales below.
        </p>

        <section className="contacts" aria-live="polite">
          {podcasts.map((podcast, index) => (
            <CardsEntry
              key={podcast._id || index}
              id={podcast._id}
              img={podcast.image}   // Cloudinary URL directly
              name={podcast.name}   // Title
              category={podcast.category}
              description={podcast.description}
              duration={undefined}
            />
          ))}
        </section>
      </section>
    </section>
  );
}

