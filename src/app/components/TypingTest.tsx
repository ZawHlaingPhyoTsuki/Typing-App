"use client";

import { RefreshCcw } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// New lessons
const lessonText = [
  "asdf fdsa asdf fdsa",
  "jkl; ;lkj jkl; ;lkj",
  "qwer rewq qwer rewq",
  "uiop poiu uiop poiu",
  "The quick brown fox jumps over the lazy dog.",
  "Programming practice: if (x > y) { return true; }",
];

export default function TypingTest() {
  const [state, setState] = useState({
    userInput: "",
    startTime: null as number | null,
    elapsedTime: 0,
    isComplete: false,
    currentLessonIndex: 0,
  });

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Get current lesson text
  const currentLesson = lessonText[state.currentLessonIndex];

  // Auto-focus the input on mount
  useEffect(() => {
    inputRef.current?.focus();
    return () => clearInterval(timerRef.current as NodeJS.Timeout);
  }, []);

  // Handle typing and tracking time
  useEffect(() => {
    if (state.userInput.length === 1 && !state.startTime) {
      const startTime = Date.now();
      setState((prev) => ({ ...prev, startTime }));

      timerRef.current = setInterval(() => {
        setState((prev) => ({
          ...prev,
          elapsedTime: Math.floor((Date.now() - startTime) / 1000),
        }));
      }, 1000);
    }

    if (state.userInput === currentLesson) {
      clearInterval(timerRef.current as NodeJS.Timeout);
      setState((prev) => ({ ...prev, isComplete: true }));
    }
  }, [state.userInput, currentLesson]);

  // Calculate accuracy
  const accuracy = state.userInput
    ? (state.userInput.split("").filter((char, i) => char === currentLesson[i])
        .length /
        state.userInput.length) *
      100
    : 0;

  // Calculate words per minute (WPM)
  const wpm = state.isComplete
    ? Math.floor(currentLesson.split(" ").length / (state.elapsedTime / 60))
    : 0;

  // Handle user input
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!state.isComplete) {
      setState((prev) => ({ ...prev, userInput: e.target.value }));
    }
  };

  // Reset test
  const resetTest = () => {
    clearInterval(timerRef.current as NodeJS.Timeout);
    setState({
      userInput: "",
      startTime: null,
      elapsedTime: 0,
      isComplete: false,
      currentLessonIndex: state.currentLessonIndex,
    });
    inputRef.current?.focus();
  };

  // Go to the next lesson
  const nextLesson = () => {
    if (state.currentLessonIndex < lessonText.length - 1) {
      setState((prev) => ({
        ...prev,
        userInput: "",
        isComplete: false,
        currentLessonIndex: prev.currentLessonIndex + 1,
      }));
    } else {
      alert("You've completed all lessons!");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-800 whitespace-pre-wrap text-xl tracking-wide font-medium">
          {currentLesson.split("").map((char, index) => {
            let color =
              index < state.userInput.length
                ? state.userInput[index] === char
                  ? "text-green-600"
                  : "text-red-600"
                : "text-gray-800";
            return (
              <span key={index} className={color}>
                {char}
              </span>
            );
          })}
        </p>
      </div>

      <textarea
        ref={inputRef}
        value={state.userInput}
        onChange={handleInputChange}
        className="w-full h-32 p-4 border border-gray-300 rounded-lg mb-4"
        placeholder="Start typing here..."
        disabled={state.isComplete}
      />

      {state.isComplete && (
        <div className="mb-6 p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Results</h3>
          <p>
            Words Per Minute: <span className="font-bold">{wpm}</span>
          </p>
          <p>
            Accuracy: <span className="font-bold">{accuracy.toFixed(2)}%</span>
          </p>
        </div>
      )}

      <div className="flex justify-between text-gray-600">
        <p>Accuracy: {accuracy.toFixed(2)}%</p>
        <p>Time: {state.elapsedTime}s</p>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={resetTest}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <RefreshCcw className="w-6 h-6" />
        </button>

        {/* only when lesson is completed and there are more lessons */}
        {state.isComplete &&
          state.currentLessonIndex < lessonText.length - 1 && (
            <button
              onClick={nextLesson}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Next Lesson
            </button>
          )}
        {state.isComplete &&
          !(state.currentLessonIndex < lessonText.length - 1) && (
            <div className="px-4 py-2 bg-green-600 text-white rounded-lg">
              Lesson Completed
            </div>
          )}
      </div>
    </div>
  );
}
