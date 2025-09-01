


// import { Link } from "react-router-dom";
// import { FaHeadphones } from "react-icons/fa";


// // Base URL for images and audio files
// const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// export default function CardsEntry({ id, img, name, category, description, duration }) {
//   // Ensure full image path is generated only if img is present
  

//   return (

//   <article className="contact-card">
//       <span className={`genre-tag ${category?.toLowerCase()} selected`}>{category}</span>
      
//        {/* Image is clickable and safe */} 
//      <Link
//        to={`/podcasts/${id}`}    
//           aria-label={`View details for podcast "${name}", category: ${category}, description: ${description}, duration: ${duration}`}
//     >
//      <img className="card-image" src={img} alt={`podcast ${category}`} />
//       </Link>
    
    

//     <div className="wrapper_podcastinfo_story">

//         <div className="title_genre">
//               <h3 className="title_podcast_story">{name}</h3>
//           {/* <span className={`genre-tag ${category?.toLowerCase()} selected`}>{category}</span> */}
//         </div> 

//           {/* Description */}
//           <div className="info-group">
//             <p>{description}</p>
//           </div>

//           {/* ⏱Duration */}
//           <div className="info-group">
//             <p className="duration_podcast">{duration}</p>
//           </div>

//           {/* Learn More button */}
//           <div className="info-group_btn">
//             <Link to={`/podcasts/${id}`} className="learn-more-btn">
//               <FaHeadphones style={{ marginRight: "0.5rem" }} />
//               Listen story
//             </Link>
//         </div>
//       </div>
//     </article>
//   );
// }

import { Link } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa";

// Base URL for images and audio files
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function CardsEntry({ id, img, name, category, description, duration }) {
  // Generate full image URL
  const imageUrl = img ? `${BASE_URL}/${img}` : "/default-image.png"; // fallback if no image

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