import { useState } from "react";
import EmployerDashboard from "./EmployerDashboard";
import PostJob from "./PostJob";

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

  const jobs = [
    {
      title: "Assistant Superintendent",
      course: "Goshen Golf Club",
      location: "Augusta, Georgia",
      housing: "Housing Unknown",
      pay: "Not listed",
      applyText: "Call to Apply",
      applyLink: "tel:7067931035",
      contact: "706-793-1035",
      description:
        "Assistant Superintendent position supporting golf course maintenance operations, turf health, irrigation, fertilizer and pesticide programs, staff supervision, course setup, and record keeping.",
    },
    {
      title: "Line Cook",
      course: "Sagebrush Golf Club",
      location: "Merritt, BC",
      housing: "No Housing",
      pay: "Not listed",
      applyText: "Apply / Contact",
      applyLink: "#",
      contact: "Contact employer",
      description: "Kitchen position at Sagebrush Golf Club.",
    },
    {
      title: "Grounds Crew",
      course: "Fairmont Hot Springs Resort",
      location: "Fairmont Hot Springs, BC",
      housing: "Housing Available",
      pay: "Not listed",
      applyText: "Apply / Contact",
      applyLink: "#",
      contact: "Contact employer",
      description: "Grounds crew position with housing available.",
    },
    {
      title: "Guest Services",
      course: "Big Sky Golf Club",
      location: "Pemberton, BC",
      housing: "Partial Housing",
      pay: "Not listed",
      applyText: "Apply / Contact",
      applyLink: "#",
      contact: "Contact employer",
      description: "Guest services position with partial housing.",
    },
  ];

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
    border: "none",
    cursor: "pointer",
    background: page === name ? "#2f6f3e" : "#4caf50",
    color: "white",
    fontWeight: "600",
  });

  const cardStyle = {
    background: "#2f6f3e",
    padding: "20px",
    marginBottom: "18px",
    borderRadius: "12px",
    color: "white",
  };

  const applyButtonStyle = {
    display: "inline-block",
    marginTop: "12px",
    padding: "10px 16px",
    borderRadius: "999px",
    background: "white",
    color: "#2f6f3e",
    textDecoration: "none",
    fontWeight: "700",
  };

  return (
    <div style={{ padding: "30px", color: "black" }}>
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
              <a href={job.applyLink} style={applyButtonStyle}>
                {job.applyText}
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