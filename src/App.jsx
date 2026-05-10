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
        </section>
      )}

      {page === "Jobs" && (
        <>
          <section id="filters" className="housing-section">
            <div className="section-card">
              <h2>Filters</h2>
              <p className="filter-summary">
                Showing {filteredJobs.length} jobs - {locationFilter} -{" "}
                {filter === "All" ? "All Housing" : filter}
              </p>
              <div className="housing-tabs">
                {["All Locations", "BC", "Alberta", "USA"].map((name) => (
                  <button
                    key={name}
                    className={`housing-tab neutral-tab ${
                      locationFilter === name ? "active" : ""
                    }`}
                    onClick={() => setLocationFilter(name)}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <div className="housing-tabs">
                {[
                  "All Housing",
                  "Housing Available",
                  "Partial Housing",
                  "No Housing",
                  "Housing Unknown",
                ].map((name) => (
                  <button
                    key={name}
                    className={filterButtonClass(name === "All Housing" ? "All" : name)}
                    onClick={() => setFilter(name === "All Housing" ? "All" : name)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="jobs-grid">
            {filteredJobs.map((job, index) => (
              <article key={`${job.course}-${job.title}-${index}`} className="card">
                <h3>{job.course}</h3>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p>
                  <strong>Role:</strong> {job.title}
                </p>
                <p>
                  <strong>Job Type:</strong> {job.type || "Seasonal"}
                </p>
                <p>
                  <strong>Pay:</strong> {job.pay}
                </p>
                {hasRatings(job) && (
                  <div className="ratings">
                    <span>Course {job.courseRating}</span>
                    <span>|</span>
                    <span>Difficulty {job.difficulty}</span>
                    <span>|</span>
                    <span>Staff {job.staffRating}</span>
                  </div>
                )}
                <p>{job.description}</p>
                <p>
                  <strong>Contact:</strong> {job.contact}
                </p>
                <div className="job-actions">
                  <span className={`housing-badge ${getHousingClass(job.housing)}`}>
                    {job.housing}
                  </span>
                  <a href={getApplyLink(job)} className="email-button">
                    {job.applyText || "Contact Employer"}
                  </a>
                </div>
              </article>
            ))}
          </section>
        </>
      )}

      {page === "Housing" && (
        <section className="jobs-grid">
          {Object.entries(housingGroups).map(([group, items]) => (
            <article key={group} className="card">
              <h3>{group}</h3>
              {items.length === 0 ? (
                <p>No jobs listed yet.</p>
              ) : (
                items.map((job, i) => (
                  <p key={`${job.course}-${i}`}>
                    {job.course} - {job.title}
                  </p>
                ))
              )}
            </article>
          ))}
        </section>
      )}

      {page === "Signup" && (
        <section className="housing-section">
          <div className="section-card">
            <h2>Sign Up</h2>
            <input placeholder="Name" />
          </div>
        </section>
      )}

      {page === "Employer" && <EmployerDashboard />}
      {page === "PostJob" && <PostJob />}
    </div>
  );
}

const getPageLabel = (name) => {
  if (name === "Signup") return "Sign Up";
  if (name === "PostJob") return "Post Job";
  return name;
};

const getFilterClass = (name) => {
  if (name === "All") return "neutral-tab";
  if (name === "Housing Available") return "available-tab";
  if (name === "Partial Housing") return "partial-tab";
  if (name === "No Housing") return "none-tab";
  return "neutral-tab";
};

const getHousingClass = (housing) => {
  if (housing === "Housing Available") return "available";
  if (housing === "Partial Housing") return "partial";
  if (housing === "No Housing") return "none";
  return "unknown";
};

const hasRatings = (job) =>
  job.courseRating || job.difficulty || job.staffRating;

const getRegion = (location = "") => {
  const normalized = location.toLowerCase();

  if (location.includes("BC")) return "BC";
  if (location.includes("AB")) return "Alberta";
  if (
    normalized.includes("usa") ||
    normalized.includes("united states") ||
    normalized.includes("california") ||
    normalized.includes("florida") ||
    normalized.includes("arizona") ||
    normalized.includes("texas")
    normalized.includes("georgia")
  ) {
    return "USA";
  }

  return "Other";
};


export default App;
