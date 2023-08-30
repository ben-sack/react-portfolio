import React, { useEffect, useState, useCallback } from "react";
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
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const preventDefault = useCallback((e) => e.preventDefault(), []);

  const handleDragMove = useCallback((event) => {
    if (!dragging) return;

    const clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
    const clientY = event.type === 'touchmove' ? event.touches[0].clientY : event.clientY;

    setPosition({ x: clientX - offset.x, y: clientY - offset.y });
  }, [dragging, offset]);

  const handleDragEnd = useCallback(() => {
    setDragging(false);
    document.removeEventListener('touchmove', preventDefault);
  }, [preventDefault]);

  const handleDragStart = useCallback((event) => {
    const clientX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
    const clientY = event.type === 'touchstart' ? event.touches[0].clientY : event.clientY;

    setOffset({ x: clientX - position.x, y: clientY - position.y });
    setDragging(true);
    document.addEventListener('touchmove', preventDefault, { passive: false });
  }, [position, preventDefault]);

  useEffect(() => {
    const events = {
      'mousemove': handleDragMove,
      'mouseup': handleDragEnd,
      'touchmove': handleDragMove,
      'touchend': handleDragEnd
    };

    for (const [event, handler] of Object.entries(events)) {
      window.addEventListener(event, handler);
    }

    return () => {
      for (const [event, handler] of Object.entries(events)) {
        window.removeEventListener(event, handler);
      }
    };
  }, [handleDragMove, handleDragEnd]);

  return (
    <div
      className="browser-window desktop-only"
      style={{
        backgroundColor: isDarkMode ? "#252f35" : "#f9f9f9",
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      <div className="browser-header">
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
