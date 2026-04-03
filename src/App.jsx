import { useState } from "react";

function App() {
  const [page, setPage] = useState("Home");
  const [filter, setFilter] = useState("All");
  const [country, setCountry] = useState("Canada");

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
      title: "Line Cook",
      course: "Sagebrush Golf Club",
      location: "Merritt, BC",
      housing: "No Housing",
      rating: "★★★★☆",
      applyLink: "#",
      reviewLink: "https://www.google.com/search?q=Sagebrush+Golf+Club+reviews",
    },
    {
      title: "Grounds Crew",
      course: "Fairmont Hot Springs Resort",
      location: "Fairmont Hot Springs, BC",
      housing: "Housing Available",
      rating: "★★★★☆",
      applyLink: "#",
      reviewLink: "https://www.google.com/search?q=Fairmont+Hot+Springs+Golf+reviews",
    },
    {
      title: "Guest Services",
      course: "Big Sky Golf Club",
      location: "Pemberton, BC",
      housing: "Partial Housing",
      rating: "★★★★☆",
      applyLink: "#",
      reviewLink: "https://www.google.com/search?q=Big+Sky+Golf+Club+Pemberton+reviews",
    },
  ];

  const filteredJobs =
    filter === "All"
      ? jobs
      : jobs.filter((job) => job.housing === filter);

  const housingGroups = {
    "Housing Available": jobs.filter((job) => job.housing === "Housing Available"),
    "Partial Housing": jobs.filter((job) => job.housing === "Partial Housing"),
    "No Housing": jobs.filter((job) => job.housing === "No Housing"),
  };

  const canadaProvinces = [
    "British Columbia",
    "Alberta",
    "Saskatchewan",
    "Manitoba",
    "Ontario",
    "Quebec",
    "New Brunswick",
    "Nova Scotia",
    "Prince Edward Island",
    "Newfoundland and Labrador",
    "Yukon",
    "Northwest Territories",
    "Nunavut",
  ];

  const usaStates = [
    "Washington",
    "Oregon",
    "California",
    "Nevada",
    "Idaho",
    "Montana",
    "Arizona",
    "Utah",
    "Colorado",
    "Texas",
    "Florida",
    "New York",
    "Other",
  ];

  const provinceStateOptions =
    country === "Canada"
      ? canadaProvinces
      : country === "USA"
      ? usaStates
      : ["Other"];

  const navButtonStyle = (name) => ({
    marginRight: "10px",
    marginBottom: "10px",
    padding: "10px 16px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.35)",
    cursor: "pointer",
    background: page === name ? "rgba(47,111,62,0.95)" : "rgba(255,255,255,0.18)",
    color: "#ffffff",
    fontWeight: "600",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  });

  const filterButtonStyle = (name) => ({
    marginRight: "10px",
    marginBottom: "10px",
    padding: "8px 14px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.35)",
    cursor: "pointer",
    background: filter === name ? "rgba(76,175,80,0.95)" : "rgba(255,255,255,0.18)",
    color: "#ffffff",
    fontWeight: "600",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  });

  const cardStyle = {
    background: "rgba(255,255,255,0.18)",
    border: "1px solid rgba(255,255,255,0.28)",
    padding: "20px",
    marginBottom: "18px",
    borderRadius: "22px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    color: "#ffffff",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  const inputStyle = {
    width: "100%",
    marginBottom: "12px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.35)",
    background: "rgba(255,255,255,0.9)",
    color: "#1f2a22",
    boxSizing: "border-box",
  };

  const smallText = {
    color: "rgba(255,255,255,0.92)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(10, 25, 12, 0.45), rgba(10, 25, 12, 0.55)), url('/sunset.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "30px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
        <div
          style={{
            background: "rgba(255,255,255,0.14)",
            border: "1px solid rgba(255,255,255,0.28)",
            borderRadius: "30px",
            padding: "34px 24px",
            marginBottom: "24px",
            textAlign: "center",
            color: "white",
            boxShadow: "0 16px 38px rgba(0,0,0,0.2)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          <img
            src="/logo-small.png"
            alt="Logo"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
              display: "block",
              margin: "0 auto 12px auto",
            }}
          />

          <h1 style={{ margin: "0 0 10px 0", fontSize: "2.4rem" }}>
            Golf Job Hub
          </h1>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.92)" }}>
            Jobs, housing, and real course insights — all in one place.
          </p>
        </div>

        <div style={{ textAlign: "center", marginBottom: "24px" }}>
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
        </div>

        {page === "Home" && (
          <>
            <div style={cardStyle}>
              <h2 style={{ marginTop: 0 }}>Welcome</h2>
              <p style={smallText}>
                Find golf course jobs with real info on housing, reviews, and course quality.
              </p>
            </div>

            <div style={cardStyle}>
              <h2 style={{ marginTop: 0 }}>⛳ Daily Golf Joke</h2>
              <p style={{ ...smallText, marginBottom: 0 }}>{todaysJoke}</p>
            </div>
          </>
        )}

        {page === "Jobs" && (
          <>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              {["All", "Housing Available", "Partial Housing", "No Housing"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={filterButtonStyle(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            {filteredJobs.map((job, index) => (
              <div
                key={index}
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 18px 36px rgba(0,0,0,0.24)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.18)";
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: "8px" }}>{job.title}</h3>
                <p style={{ ...smallText, margin: "0 0 6px 0" }}>
                  <strong>{job.course}</strong>
                </p>
                <p style={{ ...smallText, margin: "0 0 6px 0" }}>{job.location}</p>
                <p style={{ ...smallText, margin: "0 0 6px 0" }}>
                  <strong>{job.housing}</strong>
                </p>
                <p style={{ ...smallText, margin: "0 0 14px 0" }}>{job.rating}</p>

                <div style={{ marginTop: "10px" }}>
                  <button
                    style={{
                      marginRight: "10px",
                      padding: "10px 16px",
                      borderRadius: "10px",
                      border: "none",
                      background: "#4caf50",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Apply
                  </button>

                  <a href={job.reviewLink} target="_blank" rel="noreferrer">
                    <button
                      style={{
                        padding: "10px 16px",
                        borderRadius: "10px",
                        border: "none",
                        background: "#1f1f1f",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Reviews
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </>
        )}

        {page === "Housing" && (
          <div>
            {Object.entries(housingGroups).map(([groupName, groupJobs]) => (
              <div key={groupName} style={cardStyle}>
                <h3 style={{ marginTop: 0 }}>{groupName}</h3>
                {groupJobs.length === 0 ? (
                  <p style={{ ...smallText, marginBottom: 0 }}>No listings in this category yet.</p>
                ) : (
                  groupJobs.map((job, index) => (
                    <p key={index} style={{ ...smallText, margin: "8px 0" }}>
                      <strong>{job.course}</strong> — {job.title}
                    </p>
                  ))
                )}
              </div>
            ))}
          </div>
        )}

        {page === "Signup" && (
          <div style={cardStyle}>
            <h2 style={{ marginTop: 0 }}>Employee Sign Up</h2>

            <input
              placeholder="Full Name"
              style={inputStyle}
            />

            <input
              placeholder="Email"
              style={inputStyle}
            />

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={inputStyle}
            >
              <option>Canada</option>
              <option>USA</option>
              <option>Other</option>
            </select>

            <select style={inputStyle}>
              <option>Province / State</option>
              {provinceStateOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <input
              placeholder="City"
              style={inputStyle}
            />

            <input
              placeholder="Preferred Job Type (Cook, Grounds, Guest Services, etc.)"
              style={inputStyle}
            />

            <button
              style={{
                padding: "12px 22px",
                borderRadius: "10px",
                border: "none",
                background: "#4caf50",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;