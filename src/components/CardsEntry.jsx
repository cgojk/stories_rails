


import { Link } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa";

export default function CardsEntry({ id, img, name, category, description, duration }) {
  // Use the image URL directly (Cloudinary URLs are absolute)
  const imageUrl = img || "/images/historical/fallback.png"; // fallback if no image

  return (
    <article className="contact-card">
      <span className={`genre-tag ${category?.toLowerCase()} selected`}>{category}</span>

      <Link
        to={`/podcasts/${id}`}
        aria-label={`View details for podcast "${name}", category: ${category}, description: ${description}, duration: ${duration}`}
      >
        <img className="card-image" src={imageUrl} alt={`podcast ${category}`} />
      </Link>

      <div className="wrapper_podcastinfo_story">
        <div className="title_genre">
          <h3 className="title_podcast_story">{name}</h3>
        </div>

        <div className="info-group">
          <p>{description}</p>
        </div>

        <div className="info-group">
          <p className="duration_podcast">{duration}</p>
        </div>

        <div className="info-group_btn">
          <Link to={`/podcasts/${id}`} className="learn-more-btn">
            <FaHeadphones style={{ marginRight: "0.5rem" }} />
            Listen story
          </Link>
        </div>
      </div>
    </article>
  );
}