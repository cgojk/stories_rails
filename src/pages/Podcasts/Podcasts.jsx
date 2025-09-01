



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import CardsEntry from "../../components/CardsEntry.jsx";

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const API = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

  // Fetch podcasts
  useEffect(() => {
    fetch(`${API}/podcasts`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setPodcasts(data))
      .catch((err) => console.error("Failed to fetch podcasts:", err));
  }, [API]);

  // Update search term and suggestions
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const matchedTitles = podcasts
        .map((p) => p.name)
        .filter((name) => name.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(matchedTitles.slice(0, 5)); // show max 5 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (title) => {
    setSearchTerm(title);
    setSuggestions([]);
  };

  // Filter podcasts based on search
  const filteredPodcasts = podcasts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="podcast-section container">
      <img src="/images/micro.png" alt="Microphone" className="big-icon" />

      <div className="title-add-story">
        <h1 className="title_section__podcasts">Voices from the station</h1>
        <div className="add_story">
          <Link to="/add-story">
            <button className="btn_add_story">  Add your own story</button>
          </Link>
        </div>
      </div>

      <p className="title_section-sm__podcasts">
        Discover personal journeys from everyday people that will keep you on
        the edge of your seat.
      </p>

      {/* Search bar with icon and suggestions */}
      <div className="search-bar">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search by podcast title..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-button">
            <FaSearch />
          </button>

          {suggestions.length > 0 && (
            <ul className="search-suggestions">
              {suggestions.map((title, index) => (
                <li key={index} onClick={() => handleSuggestionClick(title)}>
                  {title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Podcast cards */}
      <div className="contacts">
        {filteredPodcasts.map((p) => (
          <CardsEntry
            key={p._id || p.id}
            id={p._id || p.id}
            img={p.image}
            alt={`Image of ${p.name}`}
            category={p.category}
            name={p.name}
            description={p.description}
            duration={`Duration: ${p.duration} min`}
            audioUrl={p.audioUrl}
          />
        ))}
      </div>
    </section>
  );
}