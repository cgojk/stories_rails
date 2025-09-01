import React from "react";
import Mission from "./Mission.jsx";

export default function AboutStory() {
    return (
      <Mission
  sectionTitle="Our Story"
  imageSrc="/public/images/historical/Roma_01.jpg"
  imageAlt="Roma Street Station heritage"
  heading="Our Story"
  text="Roma Street Station is more than just a place of travel  it is a living landmark in Brisbane’s history. 
        Our project highlights the heritage of this iconic site while giving voice to the community who have lived, 
        worked, and journeyed through it. By sharing personal memories and local stories, we aim to keep the spirit 
        of Roma Street alive for future generations. Together, we celebrate its importance as a cultural meeting place 
        and ensure that its history continues to connect people and communities."
  reverse={true}
/>
    );
}