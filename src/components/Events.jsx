import React from "react";
import Mission from "./Mission.jsx";

export default function Events() {
    return (
      <Mission
        sectionTitle="Events"
        imageSrc="/images/events.jpg"
        imageAlt="Guided heritage tour at Roma Street Station"
        heading="Guided Heritage Tour at Roma Street Station"
        text="Join us for a guided heritage tour of Roma Street Station, where local historians and community members 
              share the fascinating stories of Brisbane’s iconic transport hub. Explore its architectural beauty, 
              learn about its historical significance, and hear personal accounts from people who have lived, worked, 
              and travelled through this landmark. This event is perfect for families, students, and anyone interested 
              in preserving and celebrating Brisbane’s rich cultural heritage."
        reverse={true}
      />
    );
}