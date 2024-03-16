import { useEffect, useMemo, useState } from "react";

import { test1, test2, test3, challengeInput } from "./lib/data";
import Matrix from "./lib/matrix";

function App() {
  const [matrix, setMatrix] = useState<string[][]>(test1);

  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [progressIndexes, setProgressIndexes] = useState<
    | {
        x: number;
        y: number;
      }[]
    | never[]
  >([]);

  const memoMatrix = useMemo(() => {
    const temp = new Matrix(matrix);
    temp.getFullPath();
    temp.findLetters();

    return temp;
  }, [matrix]);

  const { x, y } = memoMatrix.pathCoordinates[index];

  const finished =
    index === memoMatrix.pathCoordinates.length - 1 ? true : false;

  const visualMatrix = matrix.map((item, i) => {
    return (
      <div className="row" key={i}>
        {item.map((cell, j) => {
          return (
            <div
              className={`cell ${x === i && y === j ? "active" : ""} 
              ${cell !== " " ? "path" : ""}
              ${cell.match(/[A-Z]/) ? "letter" : ""} 
              ${
                progressIndexes.find((p) => p.x === i && p.y === j)
                  ? "visited"
                  : ""
              }
              `}
              key={j}
            >
              {cell}
            </div>
          );
        })}
      </div>
    );
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    console.log(finished);
    if (finished && !active) {
      setIndex(0);
      setProgressIndexes([]);
      console.log("%c 'FINISHED", "background: pink");
      setActive(true);
      return;
    }

    if (active) {
      interval = setInterval(() => {
        if (index === memoMatrix.pathCoordinates.length - 1) {
          setActive(true);
          clearInterval(interval);
          return;
        }
        setProgressIndexes([...progressIndexes, { x, y }]);
        setIndex((prev) =>
          Math.min(prev + 1, memoMatrix.pathCoordinates.length - 1)
        );
      }, 50);
    }
    return () => {
      clearInterval(interval);
    };
  }, [
    active,
    memoMatrix.pathCoordinates,
    index,
    progressIndexes,
    x,
    y,
    finished,
  ]);

  return (
    <div>
      <main className="">
        <section>
          <div className="wrapper">{visualMatrix}</div>
          <div className="controls">
            <button
              className={active && !finished ? "active" : ""}
              onClick={() => {
                setActive(!active);
              }}
            >
              {active && !finished ? "stop" : "start"}
            </button>

            <select
              name="input"
              id="input"
              onChange={async (e) => {
                setIndex(0);
                setActive(false);
                setProgressIndexes([]);
                setMatrix(
                  { test1, test2, test3, challengeInput }[e.target.value]!
                );
              }}
            >
              <option value="test1">1</option>
              <option value="test2">2</option>
              <option value="test3">3</option>
              <option value="challengeInput">4</option>
            </select>
          </div>
          {finished && (
            <div className="results">
              <div className="">
                <p>Full Path:</p>
                <span className="">{memoMatrix.fullPath}</span>
              </div>

              <div className="">
                <p>Letters:</p>
                <span className="">
                  {memoMatrix.letters === "" ? "None" : memoMatrix.letters}
                </span>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
