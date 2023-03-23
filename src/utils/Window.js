export default function Window({ maxed, hidden, children }) {
  console.log(maxed);
  return (
    <div
      className={`window border shadow${
        maxed ? " maxed" : hidden ? " hidden" : ""
      }`}
    >
      {children}
    </div>
  );
}
