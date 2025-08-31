import React from 'react';
import { Link } from "react-router-dom";


 export default function LayoutHero() {
  return (
    <div className="hero-container">

       <h1 className="hero_title_video"> Through the walls of Roma Street Station history and Tales from the tracks</h1>
        
         <Link to="/podcasts" className="btn btn_hero">
             Check our community podcasts stories 
           </Link>
        
    </div>
  );
}