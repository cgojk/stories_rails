import React from "react";
import Mission from "./Homestarted.jsx";

export default function HomeStart() {
  return (
    <Mission
      sectionTitle="Welcome to Our Roma Street Station Hub"
      imageSrc="/images/events.jpg"
      imageAlt="Guided heritage tour at Roma Street Station"
      heading="Discover, Share, and Listen to Stories"
      text="Explore the rich history of Roma Street Station and immerse yourself in the stories that make this landmark special. Browse historical information, listen to personal accounts from the community, and share your own memories of this iconic place. Whether you’re a history enthusiast, a local resident, or just curious, there’s something here for everyone to discover and celebrate."
      reverse={true}
    />
  );
}