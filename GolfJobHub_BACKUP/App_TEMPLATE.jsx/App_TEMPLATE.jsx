import { useState } from "react";
import "./App.css";

function App() {
  const [housingFilter, setHousingFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("BC");

  const playClick = () => {
    const audio = new Audio("/golfhit.mp3");
    audio.volume = 0.35;
    audio.play().catch(() => {});
  };

  const jobs = [
    {
      title: "Sagebrush Golf Club",
      location: "Merritt, BC",
      region: "BC",
      role: "Cook",
      type: "Seasonal",
      housing: "none",
      pay: "Contact employer",
      details: "Beautiful course setting. No housing currently listed.",
      link: "https://sagebrushgolfclub.com",
      courseRating: 4.7,
      difficulty: "Hard",
      staffRating: 4.2,
    },
    {
      title: "Sandpiper Golf Course",
      location: "Harrison Mills, BC",
      region: "BC",
      role: "Maintenance",
      type: "Seasonal",
      housing: "none",
      pay: "Contact employer",
      details: "Scenic Fraser Valley course. No housing currently listed.",
      link: "https://www.sandpipergolf.com",
      courseRating: 4.3,
      difficulty: "Moderate",
      staffRating: 3.9,
    },
    {
      title: "Fairmont Banff Springs",
      location: "Banff, AB",
      region: "AB",
      role: "Resort Staff",
      type: "Seasonal",
      housing: "available",
      pay: "Contact employer",
      details: "Luxury resort environment with staff housing.",
      link: "https://careers.accor.com",
      courseRating: 4.8,
      difficulty: "Hard",
      staffRating: 4.5,
    },
    {
      title: "Whistler Golf Club",
      location: "Whistler, BC",
      region: "BC",
      role: "Guest Services",
      type: "Seasonal",
      housing: "partial",
      pay: "Contact employer",
      details: "High traffic course.",
      link: "https://www.whistlergolf.com",
      courseRating: 4.4,
      difficulty: "Moderate",
      staffRating: 4.0,
    },
    {
      title: "Predator Ridge",
      location: "Vernon, BC",
      region: "BC",
      role: "Resort Operations",
      type: "Seasonal",
      housing: "available",
      pay: "Contact employer",
      details: "Okanagan resort property.",
      link: "https://www.predatorridge.com",
      courseRating: 4.6,
      difficulty: "Moderate–Hard",
      staffRating: 4.3,
    },
    {
      title: "Nicklaus North",
      location: "Whistler, BC",
      region: "BC",
      role: "Course Staff",
      type: "Seasonal",
      housing: "none",
      pay: "Contact employer",
      details: "Well-known course.",
      link: "https://nicklausnorth.com",
      courseRating: 4.5,
      difficulty: "Moderate",
      staffRating: 3.8,
    },
    {
      title: "Tobiano Golf Course",
      location: "Kamloops, BC",
      region: "BC",
      role: "Course / Hospitality Staff",
      type: "Seasonal",
      housing: "none",
      pay: "Contact employer",
      details: "Top-ranked desert-style course overlooking Kamloops Lake.",
      link: "https://tobianogolf.com",
      courseRating: 4.8,
      difficulty: "Hard",
      staffRating: 4.3,
    },
    {
      title: "Talking Rock Golf Course",
      location: "Chase, BC",
      region: "BC",
      role: "Resort Staff",
      type: "Seasonal",
      housing: "partial",
      pay: "Contact employer",
      details: "Lakeside course with strong tourism traffic.",
      link: "https://qhotels.ca/talking-rock",
      courseRating: 4.6,
      difficulty: "Moderate",
      staffRating: 4.2,
    },
    {
      title: "Greywolf Golf Course",
      location: "Panorama, BC",
      region: "BC",
      role: "Mountain Course Staff",
      type: "Seasonal",
      housing: "available",
      pay: "Contact employer",
      details: "Famous cliff-edge holes and mountain terrain.",
      link: "https://greywolfgolf.com",
      courseRating: 4.7,
      difficulty: "Hard",
      staffRating: 4.4,
    },
    {
      title: "Sun Peaks Golf Course",
      location: "Sun Peaks, BC",
      region: "BC",
      role: "Resort / Course Staff",
      type: "Seasonal",
      housing: "partial",
      pay: "Contact employer",
      details: "Busy resort environment.",
      link: "https://sunpeaksresort.com",
      courseRating: 4.5,
      difficulty: "Moderate",
      staffRating: 4.1,
    },
    {
      title: "Big Sky Golf Club",
      location: "Pemberton, BC",
      region: "BC",
      role: "Guest Services / Grounds",
      type: "Seasonal",
      housing: "none",
      pay: "Contact employer",
      details: "Wide fairways with mountain views.",
      link: "https://bigskygolf.ca",
      courseRating: 4.6,
      difficulty: "Moderate",
      staffRating: 4.0,
    },
    {
      title: "The Rise Golf Course",
      location: "Vernon, BC",
      region: "BC",
      role: "Course / Clubhouse Staff",
      type: "Seasonal",
      housing: "none",
      pay: "Contact employer",
      details: "Elevated course with panoramic views.",
      link: "https://therisegolf.ca",
      courseRating: 4.5,
      difficulty: "Moderate–Hard",
      staffRating: 4.1,
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const housingMatch =
      housingFilter === "all" || job.housing === housingFilter;

    const locationMatch =
      locationFilter === "all" || job.region === locationFilter;

    return housingMatch && locationMatch;
  });

  const getHousingLabel = (housing) => {
    if (housing === "available") return "Housing Available";
    if (housing === "partial") return "Partial Housing";
    return "No Housing";
  };

  return (
    <div className="page-shell">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-box">
            <h1>Golf Job Hub</h1>
            <p>Find seasonal golf jobs with housing</p>
            <a href="#filters" className="hero-button">
              Start Browsing
            </a>
          </div>
        </div>
      </section>

      <section id="filters" className="housing-section">
        <div className="section-card">
          <h2>Filters</h2>

          <div className="housing-tabs">
            <button className={`housing-tab neutral-tab ${locationFilter === "all" ? "active" : ""}`} onClick={() => { playClick(); setLocationFilter("all"); }}>
              All Locations
            </button>

            <button className={`housing-tab neutral-tab ${locationFilter === "BC" ? "active" : ""}`} onClick={() => { playClick(); setLocationFilter("BC"); }}>
              BC
            </button>

            <button className={`housing-tab neutral-tab ${locationFilter === "AB" ? "active" : ""}`} onClick={() => { playClick(); setLocationFilter("AB"); }}>
              Alberta
            </button>
          </div>

          <div className="housing-tabs">
            <button className={`housing-tab neutral-tab ${housingFilter === "all" ? "active" : ""}`} onClick={() => { playClick(); setHousingFilter("all"); }}>
              All Housing
            </button>

            <button className={`housing-tab available-tab ${housingFilter === "available" ? "active" : ""}`} onClick={() => { playClick(); setHousingFilter("available"); }}>
              Housing Available
            </button>

            <button className={`housing-tab partial-tab ${housingFilter === "partial" ? "active" : ""}`} onClick={() => { playClick(); setHousingFilter("partial"); }}>
              Partial Housing
            </button>

            <button className={`housing-tab none-tab ${housingFilter === "none" ? "active" : ""}`} onClick={() => { playClick(); setHousingFilter("none"); }}>
              No Housing
            </button>
          </div>
        </div>
      </section>

      <section className="jobs-grid">
        {filteredJobs.map((job, index) => (
          <div key={index} className="card">
            <h3>{job.title}</h3>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Role:</strong> {job.role}</p>
            <p>{job.details}</p>

            <div className={`housing ${job.housing}`}>
              {getHousingLabel(job.housing)}
            </div>

            <a href={job.link} target="_blank" rel="noopener noreferrer" className="email-button" onClick={playClick}>
              Visit Employer
            </a>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;