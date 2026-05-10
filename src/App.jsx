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
    "I’m not saying my golf game is bad, but I just got a sponsorship from Top Flite.",
    "My golf game is like taxes — I lose a lot of balls and don’t know where they went.",
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

  const navButtonStyle = (name) => ({
    marginRight: "10px",
    marginBottom: "10px",
    padding: "10px 16px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.28)",
    cursor: "pointer",
    background:
      page === name ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.16)",
    color: "white",
    fontWeight: "600",
    boxShadow:
      page === name
        ? "0 0 18px rgba(255,255,255,0.28), 0 10px 28px rgba(0,0,0,0.2)"
        : "0 10px 28px rgba(0,0,0,0.16)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  });

  const cardStyle = {
    background: "rgba(255,255,255,0.18)",
    border: "1px solid rgba(255,255,255,0.28)",
    padding: "20px",
    marginBottom: "18px",
    borderRadius: "22px",
    color: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  };

  const applyButtonStyle = {
    display: "inline-block",
    marginTop: "12px",
    padding: "10px 16px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.9)",
    color: "#0b5d1e",
    textDecoration: "none",
    fontWeight: "700",
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>Golf Job Hub</h1>

      <button onClick={() => setPage("Home")} style={navButtonStyle("Home")}>
        Home
      </button>
      <button onClick={() => setPage("Jobs")} style={navButtonStyle("Jobs")}>
        Jobs
      </button>
      <button onClick={() => setPage("Housing")} style={navButtonStyle("Housing")}>
        Housing
      </button>
      <button onClick={() => setPage("Signup")} style={navButtonStyle("Signup")}>
        Sign Up
      </button>
      <button onClick={() => setPage("Employer")} style={navButtonStyle("Employer")}>
        Employer
      </button>
      <button onClick={() => setPage("PostJob")} style={navButtonStyle("PostJob")}>
        Post Job
      </button>

      {page === "Home" && (
        <div style={cardStyle}>
          <h2>Welcome</h2>
          <p>Find golf jobs with housing info.</p>
          <p>{todaysJoke}</p>
        </div>
      )}

      {page === "Jobs" && (
        <>
          <div style={{ marginBottom: "18px" }}>
            <button onClick={() => setFilter("All")} style={navButtonStyle("All")}>
              All
            </button>
            <button
              onClick={() => setFilter("Housing Available")}
              style={navButtonStyle("Housing Available")}
            >
              Housing Available
            </button>
            <button
              onClick={() => setFilter("Partial Housing")}
              style={navButtonStyle("Partial Housing")}
            >
              Partial Housing
            </button>
            <button
              onClick={() => setFilter("No Housing")}
              style={navButtonStyle("No Housing")}
            >
              No Housing
            </button>
            <button
              onClick={() => setFilter("Housing Unknown")}
              style={navButtonStyle("Housing Unknown")}
            >
              Housing Unknown
            </button>
          </div>

          {filteredJobs.map((job, index) => (
            <div key={index} style={cardStyle}>
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
              <a href={getApplyLink(job)} style={applyButtonStyle}>
                Contact Employer
              </a>
            </div>
          ))}
        </>
      )}

      {page === "Housing" &&
        Object.entries(housingGroups).map(([group, items]) => (
          <div key={group} style={cardStyle}>
            <h3>{group}</h3>
            {items.length === 0 ? (
              <p>No jobs listed yet.</p>
            ) : (
              items.map((job, i) => (
                <p key={i}>
                  {job.course} — {job.title}
                </p>
              ))
            )}
          </div>
        ))}

      {page === "Signup" && (
        <div style={cardStyle}>
          <h2>Sign Up</h2>
          <input placeholder="Name" />
        </div>
      )}

      {page === "Employer" && <EmployerDashboard />}
      {page === "PostJob" && <PostJob />}
    </div>
  );
}

export default App;
