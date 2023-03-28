function Switch({ label, status, setStatus }) {
  const handleToggle = () => {
    setStatus(status === "L" ? "R" : status === "R" ? "L" : undefined);
  };

  return (
    <div className="switch-container">
      <div className="label">{label}</div>
      <div className={`switch ${status}`} onClick={handleToggle}>
        <div className="toggle"></div>
      </div>
    </div>
  );
}

export default Switch;
