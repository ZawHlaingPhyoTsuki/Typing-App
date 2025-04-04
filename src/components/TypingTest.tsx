"use client";

import { RefreshCcw } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lesson {state.currentLessonIndex + 1}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 border rounded-lg bg-muted/50">
            <p className="whitespace-pre-wrap text-xl tracking-wide font-mono">
              {currentLesson.split("").map((char, index) => {
                const color =
                  index < state.userInput.length
                    ? state.userInput[index] === char
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                    : "text-foreground";
                return (
                  <span key={index} className={color}>
                    {char}
                  </span>
                );
              })}
            </p>
          </div>

          <Textarea
            ref={inputRef}
            value={state.userInput}
            onChange={handleInputChange}
            className="w-full h-32 text-xl font-mono"
            placeholder="Start typing here..."
            disabled={state.isComplete}
          />

          <div className="flex justify-between mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>Accuracy:</span>
              <span className="font-medium">{accuracy.toFixed(2)}%</span>
              <Progress value={accuracy} className="w-24 h-2" />
            </div>
            <div>
              <span>Time: </span>
              <span className="font-medium">{state.elapsedTime}s</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {state.isComplete && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-muted-foreground">Words Per Minute: </span>
              <span className="font-bold">{wpm}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Accuracy: </span>
              <span className="font-bold">{accuracy.toFixed(2)}%</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between gap-4">
        <Button
          onClick={resetTest}
          size="icon"
          className="h-11 w-11 bg-[#fbfbfb] hover:bg-[#ffffff] active:bg-[#F2F2F2] text-[#000000] border dark:border-none dark:bg-[#171717] dark:hover:bg-[#232323] dark:active:bg-[#101010] dark:text-[#FAFAFA]"
        >
          <RefreshCcw className="h-5 w-5 " />
        </Button>

        {state.isComplete && (
          <Button
            onClick={nextLesson}
            disabled={state.currentLessonIndex >= lessonText.length - 1}
            className="flex-1"
          >
            {state.currentLessonIndex < lessonText.length - 1
              ? "Next Lesson"
              : "All Lessons Completed"}
          </Button>
        )}
      </div>
    </div>
  );
}
