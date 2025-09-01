


import { useEffect, useState } from "react";
import { FaTimes } from 'react-icons/fa';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/gallery`)
      .then((res) => res.json())
      .then(setImages)
      .catch((err) => console.error("Gallery fetch error:", err));
  }, []);

  return (
    <section className="wrapper_gallery container">
      <h1 className='title_section_gallery'> Events and Gallery</h1>
            <p className="title_section-sm_gallery">This is the events and gallery page where you can find all the 
              latest news and updates about our community events and photo galleries.</p>
    <section className="gallery-container container">
      <h2 className="gallery-title">Roma Street Station Through Time</h2>

      <div className="gallery-grid">

        {/* {images.map((img) => (
          <div key={img._id} className="gallery-item" onClick={() => setSelected(img)}>
            <img src={encodeURI(img.src)} alt={img.alt} />
            <div className="caption">
              <h4>{img.title}</h4>
              <p>{img.description}</p>
            </div>
          </div>
        ))} */}

        {images.map((img, i) => {
  console.log(`Image ${i + 1}`, img);

  if (!img.src) {
    console.warn("Missing src on image", img._id);
    return <div key={img._id}>Missing image source</div>;
  }

  return (
    <div key={img._id} className="gallery-item" onClick={() => setSelected(img)}>
      <img src={img.src} alt={img.alt} />
      <div className="caption">
        <h3 className="title_card_gallery">{img.title}</h3>
        <p className="description_gallery">{img.description}</p>
      </div>
    </div>
  );
})}
      </div>

     {selected && (
  <div className="popup-overlay" role="dialog" onClick={() => setSelected(null)}>
    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-button__gallery" onClick={() => setSelected(null)} aria-label="Close">
        <FaTimes />
      </button>
      <img src={encodeURI(selected.src)} alt={selected.alt || 'Gallery image'} />
      <h3>{selected.title}</h3>
      <p>{selected.description}</p>
    </div>
  </div>

      )}
    </section>
    </section>
  );
}