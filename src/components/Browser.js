import React, { useEffect, useState, useRef, useCallback } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialOceanic,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

function Browser({
  isDarkMode,
  codeString,
  initialPosition = { x: 0, y: 0 },
}) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const browserRef = useRef(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const throttledMouseMove = useCallback((e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  }, [isDragging, dragOffset]);

  const onMouseUp = () => setIsDragging(false);

  const onStartDrag = (e) => {
    e.preventDefault();
    const browserRect = browserRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - browserRect.left,
      y: e.clientY - browserRect.top,
    });
    setIsDragging(true);
  };

  useEffect(() => {
    window.addEventListener("mousemove", throttledMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [throttledMouseMove]);

  return (
    <div
      ref={browserRef}
      className="browser-window desktop-only"
      style={{
        backgroundColor: isDarkMode ? "#252f35" : "#f9f9f9",
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="browser-header" onMouseDown={onStartDrag}>
        <div className="browser-dot red-dot"></div>
        <div className="browser-dot yellow-dot"></div>
        <div className="browser-dot green-dot"></div>
      </div>
      <div className="browser-content">
        <SyntaxHighlighter
          language="python"
          style={isDarkMode ? materialOceanic : materialLight}
          customStyle={{ overflow: "visible" }}
          className="code-block"
        >
          {codeString.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default Browser;
