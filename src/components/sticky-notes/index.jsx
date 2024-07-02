import { useEffect, useRef, useState } from "react";
import "./styles.css";

const WORDS = [
  {
    id: 1,
    label: "Papaya",
  },
  {
    id: 2,
    label: "Orange",
  },
  {
    id: 3,
    label: "Mango",
  },
];

const getDraggableStyles = (idx, isDragged, positions) => {
  return {
    top: positions[idx].y,
    left: positions[idx].x,
    opacity: !positions[idx].x || !positions[idx].y ? 0 : 1,
    transform: isDragged ? "rotate(-5deg)" : "rotate(0deg)",
    boxShadow: isDragged
      ? "0 10px 10px rgba(0, 0, 0, 0.75)"
      : "0 2px 2px rgba(0, 0, 0, 0.25)",
  };
};

const StickyNotes = () => {
  const wrapperRef = useRef();
  const stickyWordRefs = useRef([]);

  const [currentIdx, setCurrentIdx] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [relOffset, setRelOffset] = useState({ x: 0, y: 0 });
  const [positions, setPositions] = useState(
    WORDS.map(() => ({ x: null, y: null }))
  );
  const [initialPositions, setInitialPositions] = useState(
    WORDS.map(() => ({ x: null, y: null }))
  );

  const resetDragState = () => {
    setIsDragging(false);
    setCurrentIdx(null);
  };

  const resetPositions = () => {
    setPositions([...initialPositions]);
    resetDragState();
  };

  const isOverlapping = () => {
    const currentWord = stickyWordRefs.current[currentIdx];
    const currentWordRect = currentWord.getBoundingClientRect();

    const matchExists = stickyWordRefs.current.find((el, idx) => {
      const otherWordRect = el.getBoundingClientRect();
      return (
        idx !== currentIdx &&
        !(
          currentWordRect.right < otherWordRect.left ||
          currentWordRect.left > otherWordRect.right ||
          currentWordRect.bottom < otherWordRect.top ||
          currentWordRect.top > otherWordRect.bottom
        )
      );
    });

    return matchExists;
  };

  const handleMouseDown = (e, idx) => {
    const stickyWord = stickyWordRefs?.current[idx].getBoundingClientRect();
    setRelOffset({
      y: e.clientY - stickyWord.top,
      x: e.clientX - stickyWord.left,
    });
    setIsDragging(true);
    setCurrentIdx(idx);
  };

  const handleMouseUp = () => {
    const wrapperBounds = wrapperRef.current.getBoundingClientRect();
    const currentWord = stickyWordRefs?.current[currentIdx];
    const currentWordRect = currentWord?.getBoundingClientRect();

    if (!currentWordRect) return;

    const isIntersectingBoundary = !(
      currentWordRect.left > wrapperBounds.left &&
      currentWordRect.right < wrapperBounds.right &&
      currentWordRect.top > wrapperBounds.top &&
      currentWordRect.bottom < wrapperBounds.bottom
    );

    if (isIntersectingBoundary || isOverlapping()) {
      resetPositions();
      return;
    }

    setInitialPositions([...positions]);
    resetDragState();
  };

  function handleMouseMove(e) {
    if (isDragging && currentIdx !== null) {
      const wrapperBounds = wrapperRef.current.getBoundingClientRect();

      setPositions((prev) =>
        prev.map((pos, idx) => {
          if (idx === currentIdx) {
            return {
              y: e.clientY - wrapperBounds.top - relOffset.y,
              x: e.clientX - wrapperBounds.left - relOffset.x,
            };
          }
          return pos;
        })
      );
    }
  }

  useEffect(() => {
    const setAtRandomPosition = (prev, wrapperBounds) => {
      const { height, width } = wrapperBounds;
      const res = prev.map(() => ({
        x: Math.abs(Math.random() * width),
        y: Math.abs(Math.random() * height),
      }));
      setInitialPositions([...res]);
      return res;
    };

    if (wrapperRef && wrapperRef.current) {
      const wrapperBounds = wrapperRef.current.getBoundingClientRect();
      setPositions((prev) => setAtRandomPosition(prev, wrapperBounds));
    }
  }, [wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      className="sticky-words-wrapper"
    >
      {WORDS.map((word, idx) => {
        const isDragged = isDragging && currentIdx === idx;
        return (
          <div
            className="sticky-word"
            key={word.id + "-" + idx}
            onMouseUp={handleMouseUp}
            onMouseDown={(e) => handleMouseDown(e, idx)}
            ref={(el) => (stickyWordRefs.current[idx] = el)}
            style={{ ...getDraggableStyles(idx, isDragged, positions) }}
          >
            <span className="sticky-word__label">{word.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default StickyNotes;
