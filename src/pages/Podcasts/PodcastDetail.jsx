



import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { Tag, Clock, BookOpen } from "lucide-react";

const API = import.meta.env.VITE_API_BASE 

export default function PodcastDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [podcast, setPodcast] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!podcast) {
      fetch(`${API}/podcasts/${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch podcast");
          return res.json();
        })
        .then(data => {
          setPodcast(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id, podcast]);

  if (loading) return <p className="loading">Loading podcast...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!podcast) return <p className="error">No podcast found.</p>;

  const fullAudioUrl = podcast.audioUrl || null; // URL from DB (Cloudinary)
  const fullImageUrl = podcast.image || "/images/carousel/heritage.jpg";

  const handleLike = () => setLiked(true);

  return (
    <section className="podcast-detail-container">
      <div className="back-link">
        {/* Go back to previous page if set, otherwise home */}
        <Link to={location.state?.from || "/"}>← Back</Link>
      </div>

      <div className="podcast-card">
        <h1 className="podcast-title">{podcast.name}</h1>

        <img
          src={fullImageUrl}
          alt={`Image for ${podcast.name}`}
          className="podcast-image"
        />

        {fullAudioUrl && (
          <audio controls style={{ width: "100%" }}>
            <source src={fullAudioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}

        <div className="podcast-meta">
          <p><Tag size={18} /> {podcast.category}</p>
          <p><Clock size={18} /> {podcast.duration || "N/A"}</p>
          <p><BookOpen size={18} /> {podcast.description}</p>
        </div>

        <button
          className={`like-button ${liked ? "liked" : ""}`}
          onClick={handleLike}
          disabled={liked}
        >
          <FaHeart style={{ marginRight: "6px" }} />
          {liked ? "Thank you for your support!" : "Enjoyed this story? Show some love"}
        </button>
      </div>
    </section>
  );
}
