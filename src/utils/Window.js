export default function Window({ maxed, hidden, children, windowClass }) {
  return (
    <div
      className={`${windowClass} window border shadow${
        maxed ? " maxed" : hidden ? " hidden" : ""
      }`}
    >
      {children}
    </div>
  );
}
