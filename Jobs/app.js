const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyMoJ4vAFaxleNDt7WcM1B3YtHlq6c2HQLyaja90p76dNaEZIhCR9pbVyn1ZRVYW6MzCw/exec";

function isConnected() {
  return GOOGLE_SCRIPT_URL.startsWith("https://script.google.com/");
}

function setStatus(message, type = "") {
  const status = document.querySelector("#form-status");
  if (!status) return;

  status.textContent = message;
  status.className = `status ${type}`.trim();
}

function formPayload(form) {
  const data = new FormData(form);

  return {
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
}

async function submitJob(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const button = document.querySelector("#submit-button");

  if (!isConnected()) {
    setStatus("The Google Sheet is not connected yet.", "error");
    return;
  }

  button.disabled = true;
  setStatus("Submitting...");

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(formPayload(form)),
    });

    form.reset();
    setStatus("Submitted. Check the Google Sheet for the new row.", "success");
  } catch (error) {
    setStatus("The form could not submit. Please check the script URL.", "error");
  } finally {
    button.disabled = false;
  }
}

function jobCard(job) {
  const card = document.createElement("article");
  card.className = "job-card";

  const title = document.createElement("h2");
  title.textContent = job.jobTitle || "Untitled job";

  const meta = document.createElement("ul");
  meta.className = "job-meta";

  [job.company, job.location, job.jobType, job.payRange].filter(Boolean).forEach((value) => {
    const item = document.createElement("li");
    item.textContent = value;
    meta.append(item);
  });

  const description = document.createElement("p");
  description.className = "job-description";
  description.textContent = job.description || "";

  card.append(title, meta, description);

  if (job.applyUrl) {
    const apply = document.createElement("a");
    apply.className = "apply-link";
    apply.href = job.applyUrl;
    apply.target = "_blank";
    apply.rel = "noopener";
    apply.textContent = "Apply";
    card.append(apply);
  }

  return card;
}

async function loadJobs() {
  const list = document.querySelector("#jobs-list");
  if (!list) return;

  if (!isConnected()) {
    list.innerHTML = '<p class="status error">The Google Sheet is not connected yet.</p>';
    return;
  }

  try {
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=list`);
    const result = await response.json();

    if (!result.ok) {
      throw new Error();
    }

    list.innerHTML = "";

    if (!result.jobs.length) {
      list.innerHTML = '<p class="status">No approved jobs are posted yet.</p>';
      return;
    }

    result.jobs.forEach((job) => list.append(jobCard(job)));
  } catch (error) {
    list.innerHTML = '<p class="status error">Jobs could not be loaded.</p>';
  }
}

document.querySelector("#job-form")?.addEventListener("submit", submitJob);
loadJobs();
