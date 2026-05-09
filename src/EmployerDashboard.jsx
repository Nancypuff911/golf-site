function EmployerDashboard() {
  const boxStyle = {
    background: "rgba(255,255,255,0.18)",
    border: "1px solid rgba(255,255,255,0.28)",
    padding: "20px",
    marginBottom: "18px",
    borderRadius: "22px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    color: "#ffffff",
  };

  const buttonStyle = {
    marginRight: "10px",
    marginTop: "10px",
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    background: "#4caf50",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  };

  return (
    <div>
      <div style={boxStyle}>
        <h1 style={{ marginTop: 0 }}>Employer Dashboard</h1>
        <button style={buttonStyle}>+ Post a Job</button>
      </div>

      <div style={boxStyle}>
        <p><strong>Active:</strong> 3</p>
        <p><strong>Expired:</strong> 1</p>
        <p><strong>Applications:</strong> 0</p>
      </div>

      <div style={boxStyle}>
        <h3 style={{ marginTop: 0 }}>Assistant Superintendent</h3>
        <p>Sagebrush – Merritt, BC</p>
        <p>Housing: Partial</p>
        <button style={buttonStyle}>Edit</button>
        <button style={buttonStyle}>Renew</button>
      </div>
    </div>
  );
}

export default EmployerDashboard;