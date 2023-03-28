function Volume({ level = 0.5, setLevel }) {
  const handleChange = (event) => {
    setLevel(event.target.value);
  };

  return (
    <div className="volume">
      <input
        type="range"
        value={level}
        min={0}
        max={1}
        step={0.01}
        onChange={handleChange}
      />
    </div>
  );
}

export default Volume;
