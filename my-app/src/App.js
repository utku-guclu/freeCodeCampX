import React, { useState, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [quotes, setQuotes] = useState("");
  const bgRef = useRef();
  const textRef = useRef();

  const getQuote = () => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        let randomNum = Math.floor(Math.random() * data.length);
        setQuotes(data[randomNum]);
      });
  };

  // get quote
  useEffect(() => {
    getQuote();
  }, []);

  // change backroundColor random
  useEffect(() => {
    const colorGenerator = (rgb) => {
      if (rgb.length === 3) return rgb;
      const randomNumber = Math.floor(Math.random() * 256);
      rgb = [...rgb, randomNumber];
      return colorGenerator(rgb);
    };
    const [red, green, blue] = colorGenerator([]);
    bgRef.current.style.backgroundColor = `rgb(${red},${green},${blue})`;
  }, [quotes]);

  // change backroundColor random
  useEffect(() => {
    const colorGenerator = (rgb) => {
      if (rgb.length === 3) return rgb;
      const randomNumber = Math.floor(Math.random() * 256);
      rgb = [...rgb, randomNumber];
      return colorGenerator(rgb);
    };
    const [red, green, blue] = colorGenerator([]);
    textRef.current.style.color = `rgb(${red},${255},${blue})`;
  }, [quotes]);

  return (
    <div ref={bgRef} className="App">
      <div className="quote">
        <p ref={textRef}>
          "{quotes.text}"
        </p>
        <p><i>{quotes.author}</i></p>
        <div className="btn-container">
          <button className="btn" onClick={getQuote}>
            Get quote
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text?=${quotes.text}`}
            className="btn"
            target="_blank"
            rel="nooponer noreferrer"
          >
            Tweet
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
