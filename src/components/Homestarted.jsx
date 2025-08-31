
export default function Homestarted({ sectionTitle, imageSrc, imageAlt, heading, text, reverse = false }) {
    return (
        <section className="wrapper_mission">
        <div className="mission-section">
            <h1 className=" title_homestart">{sectionTitle}</h1>
            <div className={`mission_container container ${reverse ? 'reverse' : ''}`}>
                <div className="mission-container_image">
                    <img className="mission-image" src={imageSrc} alt={imageAlt} />
                </div>
                <div className="container_text_mission">
                    <h2 className="mission-title_container">{heading}</h2>
                    <p className="mission-description">{text}</p>
                </div>
            </div>
            </div>
        </section>
    );
}