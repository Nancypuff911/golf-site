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
        <p>
          Submit a golf job opening. New listings are reviewed before they appear
          on the site.
        </p>

        <form className="job-form" onSubmit={handleSubmit}>
          <input name="company" placeholder="Company" required />
          <input name="contactName" placeholder="Contact name" required />
          <input name="contactEmail" type="email" placeholder="Contact email" required />
          <input name="jobTitle" placeholder="Job title" required />
          <input name="location" placeholder="Location" required />
          <input name="jobType" placeholder="Job type" required />
          <input name="payRange" placeholder="Pay range" />
          <input name="applyUrl" type="url" placeholder="Apply link" />
          <textarea name="description" placeholder="Job description" required />

          <button className="hero-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Job"}
          </button>

          {status && <p>{status}</p>}
        </form>
      </div>
    </section>
  );
}

export default PostJob;
