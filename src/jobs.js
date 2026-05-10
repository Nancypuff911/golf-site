import { useState } from "react";
import EmployerDashboard from "./EmployerDashboard";
import PostJob from "./PostJob";
import jobs from "./jobs";
import "./App.css";

const getEmailAddress = (value = "") =>
  value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];

const getApplyLink = (job) => {
  const email = getEmailAddress(job.applyLink) || getEmailAddress(job.contact);

  if (email) {
    return `mailto:${email}`;
  }

  return job.applyLink;
};

function App() {
  const [page, setPage] = useState(() =>
    window.location.hash === "#filters" ? "Jobs" : "Home",
  );
  const [filter, setFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All Locations");

  const jokes = [
    "Why do golfers carry two pairs of pants? In case they get a hole in one.",
    "I'm not saying my golf game is bad, but I just got a sponsorship from Top Flite.",
    "My golf game is like taxes - I lose a lot of balls and don't know where they went.",
    "Golf is the only sport where yelling 'FORE!' actually makes things worse.",
    "Why did the golfer bring an extra sock? In case he got a hole in one.",
  ];

  const todaysJoke = jokes[new Date().getDate() % jokes.length];

  const filteredJobs = jobs.filter((job) => {
    const housingMatch = filter === "All" || job.housing === filter;
    const locationMatch =
      locationFilter === "All Locations" || getRegion(job.location) === locationFilter;

    return housingMatch && locationMatch;
  });

  const housingGroups = {
    "Housing Available": jobs.filter((job) => job.housing === "Housing Available"),
    "Partial Housing": jobs.filter((job) => job.housing === "Partial Housing"),
    "No Housing": jobs.filter((job) => job.housing === "No Housing"),
    "Housing Unknown": jobs.filter((job) => job.housing === "Housing Unknown"),
  };

  const navButtonClass = (name) =>
    `housing-tab neutral-tab ${page === name ? "active" : ""}`;

  const filterButtonClass = (name) =>
    `housing-tab ${filter === name ? "active" : ""} ${getFilterClass(name)}`;

  return (
    <div className="page-shell">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-box">
            <h1>Golf Job Hub</h1>
            <p>Find seasonal golf jobs with housing</p>
            <button
              className="hero-button"
              onClick={() => {
                window.location.hash = "filters";
                setPage("Jobs");
              }}
            >
              Start Browsing
            </button>
          </div>
        </div>
      </section>

      <nav className="housing-section primary-nav" aria-label="Primary navigation">
        <div className="section-card">
          <div className="housing-tabs">
            {["Home", "Jobs", "Housing", "Signup", "Employer", "PostJob"].map((name) => (
              <button
                key={name}
                className={navButtonClass(name)}
                onClick={() => setPage(name)}
              >
                {getPageLabel(name)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {page === "Home" && (
        <section className="housing-section">
          <div className="section-card">
            <h2>Welcome</h2>
            <p>Find golf jobs with housing info.</p>
            <p>{todaysJoke}</p>
          </div>
