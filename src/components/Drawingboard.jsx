import { useState } from "react";
import {
  containerStyle,
  svgStyle,
  warningMessageStyle,
  buttonStyle,
  messageContainerStyle
} from "./Drawingboard.styles";

const MAX_DOTS = 4;
const MIN_DISTANCE = 20;

// ---------- Geometry Helpers ----------
const distance = (a, b) =>
  Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

const isTooClose = (newPoint, points) =>
  points.some((p) => distance(p, newPoint) < MIN_DISTANCE);

const getSideLengths = (points) => [
  distance(points[0], points[1]),
  distance(points[1], points[2]),
  distance(points[2], points[3]),
  distance(points[3], points[0]),
].map((d) => d.toFixed(1));

const isValidSquare = (points) => {
  const sides = getSideLengths(points).map(Number);
  const diagonals = [
    distance(points[0], points[2]),
    distance(points[1], points[3]),
  ];

  const sidesEqual = sides.every(
    (s) => Math.abs(s - sides[0]) < 2
  );

  const diagonalsValid =
    Math.abs(diagonals[0] - diagonals[1]) < 2 &&
    Math.abs(diagonals[0] - Math.sqrt(2) * sides[0]) < 2;

  return sidesEqual && diagonalsValid;
};

// ---------- Color Helper ----------
const generateRandomColor = () => {
  const colors = [
    "#1abc9c",
    "#3498db",
    "#9b59b6",
    "#e67e22",
    "#e74c3c",
    "#2ecc71",
    "#f39c12",
    "#16a085",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// ---------- Component ----------
const DrawingBoard = () => {
  const [currentDots, setCurrentDots] = useState([]);
  const [squares, setSquares] = useState([]);
  const [currentColor, setCurrentColor] = useState(generateRandomColor());
  const [warning, setWarning] = useState("");

  const handleClick = (e) => {
    if (currentDots.length >= MAX_DOTS) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const newDot = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    if (isTooClose(newDot, currentDots)) {
      setWarning(
        "This point is too close to an existing one. Move your mouse and try again."
      );
      return;
    }

    const updatedDots = [...currentDots, newDot];
    setCurrentDots(updatedDots);
    setWarning("");

    // Finalize square
    if (updatedDots.length === MAX_DOTS) {
      setSquares((prev) => [
        ...prev,
        {
          dots: updatedDots,
          isSquare: isValidSquare(updatedDots),
          color: currentColor,
        },
      ]);

      // Prepare next square
      setTimeout(() => {
        setCurrentDots([]);
        setCurrentColor(generateRandomColor());
      }, 0);
    }
  };

  const resetBoard = () => {
    setCurrentDots([]);
    setSquares([]);
    setCurrentColor(generateRandomColor());
    setWarning("");
  };

  const lastSquare = squares[squares.length - 1];

  return (
    <div style={containerStyle}>
      <svg style={svgStyle} onClick={handleClick}>
        {/* Completed squares */}
        {squares.map((square, sIndex) =>
          square.dots.map((dot, index) => {
            const nextDot =
              square.dots[(index + 1) % MAX_DOTS];
            return (
              <line
                key={`square-${sIndex}-line-${index}`}
                x1={dot.x}
                y1={dot.y}
                x2={nextDot.x}
                y2={nextDot.y}
                stroke={square.color}
                strokeWidth="2"
              />
            );
          })
        )}

        {/* Current square in progress */}
        {currentDots.map((dot, index) => {
          if (index === 0) return null;
          const prev = currentDots[index - 1];
          return (
            <line
              key={`current-line-${index}`}
              x1={prev.x}
              y1={prev.y}
              x2={dot.x}
              y2={dot.y}
              stroke={currentColor}
              strokeWidth="2"
            />
          );
        })}

        {/* All dots */}
        {[...squares.flatMap((s) => s.dots), ...currentDots].map(
          (dot, index) => (
            <circle
              key={`dot-${index}`}
              cx={dot.x}
              cy={dot.y}
              r="6"
              fill="black"
            />
          )
        )}
      </svg>

      {/* Reserved message space to prevent layout shift */}
    <div style={messageContainerStyle}>
        {lastSquare && (
        lastSquare.isSquare ? (
        <p
            style={{
            marginTop: "8px",
            color: lastSquare.color,
            fontWeight: "600",
            }}
        >
            🎉 Congratulations! You drew a square.
        </p>
        ) : (
        <div
            style={{
            marginTop: "8px",
            color: lastSquare.color,
            }}
        >
            <p style={{ fontWeight: "600" }}>
            ❌ This is not a square. Try again.
            </p>
            <p>Your four side lengths:</p>
        <ul style={{ listStylePosition: "inside", padding: 0 }}>
            {getSideLengths(lastSquare.dots).map((side, i) => (
                <li key={i}>Side {i + 1}: {side}px</li>
            ))}
        </ul>
    </div>
    )
  )}

  {warning && (
    <p style={warningMessageStyle}>{warning}</p>
  )}
    </div>


      <button style={buttonStyle} onClick={resetBoard}>
        Reset
      </button>
    </div>
  );
};

export default DrawingBoard;
