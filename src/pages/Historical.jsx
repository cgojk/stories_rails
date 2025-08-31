


import { useState, useEffect } from "react";
import HistoryEvent from "../components/HistoryEvent.jsx";

export default function Historical() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the API base URL from environment variables
  const API = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    fetch(`${API}/historical-events`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          setEvents([]);
          setLoading(false);
          return;
        }

        // Clean keys and trim string values + fix trailing '}' in URLs
        const cleanedData = data.map(event => {
          const cleanEvent = {};
          for (const key in event) {
            const cleanKey = key.trim();
            let value = event[key];

            if (typeof value === "string") {
              value = value.trim();
              // Remove trailing } and whitespace characters from strings (especially URLs)
              value = value.replace(/[\}\s]+$/, "");
            }

            cleanEvent[cleanKey] = value;
          }
          // Provide default image/title if missing
          if (!cleanEvent.image) cleanEvent.image = undefined;
          if (!cleanEvent.title) cleanEvent.title = "Untitled Event";
          return cleanEvent;
        });

        console.log("fetched and cleaned events:", cleanedData);
        setEvents(cleanedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [API]);

  if (loading) return <p>Loading historical events...</p>;
  if (error) return <p>Error loading events: {error}</p>;
  if (events.length === 0) return <p>No historical events found.</p>;

  return (
    <section className="container historical-events-page">
      <h1 className="title_section__history">Historical Events</h1>
      {events.map((event, index) => {
        console.log(`Event ${index} image URL:`, event.image);

        return (
          <HistoryEvent
            key={event._id}
            image={event.image}
            title={event.title}
            text={event.description}
            reverse={index % 2 === 1}
            initiallyVisible={index === 0}
            index={index}
          />
        );
      })}
    </section>
  );
}