import React from 'react';
import './About.css'; // ייבוא קובץ CSS לדף אודות

function About() {
    return (
      <div>
        <img src="/photos/sce_logo.webp" alt="sce logo" class="sce-logo"/>
        <img src="/photos/museum-logo2.jpg" alt="museum-logo2" class="museum-logo2"/>

        <h1 id="main_title">About the Website</h1>
        <div className="faq-text">
        <p>Welcome to the Digital Testimonies of World War II Soldiers website.<br/> Our platform provides easy and up-to-date access to live testimonies
         from soldiers on various fronts, focusing on personal experiences, major battles, and the difficult situations faced during the war. Our 
         mission is to preserve history and make these testimonies accessible to a wide audience through advanced technology.</p>

        <h2>Who Are We?</h2>
        <h4>The website was created as part of a final project by Yoav Vaknin and Dimitri Shepak, computer science students from the Sami Shimon College of Engineering.</h4>

        <h2>Do You Have Any Questions?</h2>
        <h4>If you have any further questions about using the website, feel free to contact us:</h4>

        <ul>
        <li><strong>Yoav Vaknin: yoavva1@ac.sce.ac.il</strong></li>
        <li><strong>Dimitri Shpak: dmitrsh5@ac.sce.ac.il</strong></li>
        </ul>
        </div>
      </div>
    );
}
  
  export default About;