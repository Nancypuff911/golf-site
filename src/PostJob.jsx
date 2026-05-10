import { useState } from "react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyMoJ4vAFaxleNDt7WcM1B3YtHlq6c2HQLyaja90p76dNaEZIhCR9pbVyn1ZRVYW6MzCw/exec";

function PostJob() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const job = {
      company: String(data.get("company") || "").trim(),
      contactName: String(data.get("contactName") || "").trim(),
      contactEmail: String(data.get("contactEmail") || "").trim(),
      jobTitle: String(data.get("jobTitle") || "").trim(),
      location: String(data.get("location") || "").trim(),
      jobType: String(data.get("jobType") || "").trim(),
      payRange: String(data.get("payRange") || "").trim(),
      applyUrl: String(data.get("applyUrl") || "").trim(),
      description: String(data.get("description") || "").trim(),
    };

    setIsSubmitting(true);
    setStatus("Submitting...");

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(job),
      });

      form.reset();
      setStatus("Submitted. Your listing will appear after review.");
    } catch {
      setStatus("Could not submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="housing-section">
      <div className="section-card">
        <h2>Post a Job</h2>
        <p className="filter-summary">
          Share a golf job opening. New listings are reviewed before they appear
          on the site.
        </p>

        <form className="post-job-form" onSubmit={handleSubmit}>
          <div className="post-job-grid">
            <label>
              Company
              <input name="company" required />
            </label>

            <label>
              Contact name
              <input name="contactName" required />
            </label>

            <label>
              Contact email
              <input name="contactEmail" type="email" required />
            </label>

            <label>
              Job title
              <input name="jobTitle" required />
            </label>

            <label>
              Location
              <input name="location" placeholder="Augusta, Georgia" required />
            </label>

            <label>
              Job type
              <input name="jobType" placeholder="Seasonal, full-time, part-time" required />
            </label>

            <label>
              Pay range
              <input name="payRange" placeholder="$18-$24/hour" />
            </label>

            <label>
              Apply link
              <input name="applyUrl" type="url" placeholder="https://example.com/apply" />
            </label>
          </div>

          <label>
            Job description
            <textarea name="description" rows="7" required />
          </label>

          <div className="post-job-actions">
            <button className="hero-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Job"}
            </button>

            {status && <p className="post-job-status">{status}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}

export default PostJob;
