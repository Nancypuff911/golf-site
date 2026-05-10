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
  const [page, setPage] = useState("Home");
  const [filter, setFilter] = useState("All");

  const jokes = [
    "Why do golfers carry two pairs of pants? In case they get a hole in one.",
    "I'm not saying my golf game is bad, but I just got a sponsorship from Top Flite.",
    "My golf game is like taxes - I lose a lot of balls and don't know where they went.",
    "Golf is the only sport where yelling 'FORE!' actually makes things worse.",
    "Why did the golfer bring an extra sock? In case he got a hole in one.",
  ];

  const todaysJoke = jokes[new Date().getDate() % jokes.length];

  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.housing === filter);

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
            <p>Find seasonal golf jobs with housing info.</p>
          </div>
        </div>
      </section>

      <nav className="housing-section" aria-label="Primary navigation">
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
          <section className="housing-section">
            <div className="section-card">
              <h2>Filters</h2>
              <div className="housing-tabs">
                {[
                  "All",
                  "Housing Available",
                  "Partial Housing",
                  "No Housing",
                  "Housing Unknown",
                ].map((name) => (
                  <button
                    key={name}
                    className={filterButtonClass(name)}
                    onClick={() => setFilter(name)}
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
                <h3>{job.title}</h3>
                <p>
                  <strong>Course:</strong> {job.course}
                </p>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p>
                  <strong>Housing:</strong> {job.housing}
                </p>
                <p>
                  <strong>Pay:</strong> {job.pay}
                </p>
                <p>{job.description}</p>
                <p>
                  <strong>Contact:</strong> {job.contact}
                </p>
                <a href={getApplyLink(job)} className="email-button">
                  {job.applyText || "Contact Employer"}
                </a>
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
  if (name === "Housing Available") return "available-tab";
  if (name === "Partial Housing") return "partial-tab";
  if (name === "No Housing") return "none-tab";
  return "neutral-tab";
};

export default App;
