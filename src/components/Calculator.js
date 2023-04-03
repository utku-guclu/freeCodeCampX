import { useState, useEffect } from "react";

const math = require("mathjs");

function Calculator() {
  const operators = ["*", "/", "+", "-"];
  const [exp, setExp] = useState("");
  const [io, setIO] = useState("0");
  const [solved, setSolved] = useState(false);

  const opRegex = /[*/+-]+$/;

  useEffect(() => {
    if (io.length >= 10) {
      setIO("DIGIT LIMIT MET");
      setTimeout(() => {
        setIO("");
        setExp("");
      }, 500);
    }
  }, [io]);

  const clear = () => {
    setExp("");
    setIO("0");
  };

  const op = (todo) => {
    // copy
    let wcExp = exp;

    if (solved) {
      wcExp = io;
      setSolved(false);
    }

    if (todo !== "-") {
      wcExp = wcExp.replace(opRegex, "");
    } else if (todo === "-" && wcExp.endsWith("-")) {
      return;
    }

    setExp(wcExp + todo);
    setIO(todo);
  };

  const n = (digit) => {
    // copy
    let wcExp = exp;
    let wcIO = io;

    if (digit === "0" && wcIO === "0") return;

    if (solved) {
      wcExp = "";
      wcIO = "";
      setSolved(false);
    }

    if (operators.includes(io)) {
      wcIO = "";
    }

    if (wcIO === "0") {
      wcIO = "";
    }

    if (digit === ".") {
      if (wcIO.includes(".")) return;

      if (wcIO === "") {
        wcIO = "0";
      }

      if (wcExp === "" || opRegex.test(wcExp)) {
        wcExp += "0";
      }
    }

    setExp(wcExp + digit);
    setIO(wcIO + digit);
  };

  const solve = () => {
    // copy
    let wcExp = exp;

    wcExp = wcExp.replace(opRegex, "");

    const expArr = Array.from(wcExp)
    if (wcExp.length === 1 && opRegex.test(expArr[0])) return;
    if (wcExp === "" || wcExp.includes("=")) return;

    const result = math.evaluate(wcExp).toString();

    setExp(wcExp + "=" + result);
    setIO(result);
    setSolved(true);
  };

  return (
    <div className="calculator">
      <div className="exp">{exp}</div>
      <div className="io">{io}</div>
      <div className="ac">
        <button onClick={clear}>AC</button>
      </div>
      <div className="d">
        <button onClick={() => op("/")}>/</button>
      </div>
      <div className="m">
        <button onClick={() => op("*")}>*</button>
      </div>
      <div className="n7">
        <button onClick={() => n("7")}>7</button>
      </div>
      <div className="n8">
        <button onClick={() => n("8")}>8</button>
      </div>
      <div className="n9">
        <button onClick={() => n("9")}>9</button>
      </div>
      <div className="s">
        <button onClick={() => op("-")}>-</button>
      </div>
      <div className="n4">
        <button onClick={() => n("4")}>4</button>
      </div>
      <div className="n5">
        <button onClick={() => n("5")}>5</button>
      </div>
      <div className="n6">
        <button onClick={() => n("6")}>6</button>
      </div>
      <div className="a">
        <button onClick={() => op("+")}>+</button>
      </div>
      <div className="n1">
        <button onClick={() => n("1")}>1</button>
      </div>
      <div className="n2">
        <button onClick={() => n("2")}>2</button>
      </div>
      <div className="n3">
        <button onClick={() => n("3")}>3</button>
      </div>
      <div className="eq">
        <button onClick={solve}>=</button>
      </div>
      <div className="n0">
        <button onClick={() => n("0")}>0</button>
      </div>
      <div className="dec">
        <button onClick={() => n(".")}>.</button>
      </div>
    </div>
  );
}

export default Calculator;
