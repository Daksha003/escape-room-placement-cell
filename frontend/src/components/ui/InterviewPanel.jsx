import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Textarea } from "./textarea";
import { Progress } from "./progress";
import {
  interviewQuestions,
  evaluateInterviewAnswers,
} from "../../mock/gameData";
import {
  User,
  MessageSquare,
  CheckCircle,
  XCircle,
  Mic,
  MicOff,
} from "lucide-react";

const InterviewPanel = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    Array(interviewQuestions.length).fill("")
  );
  const [isListening, setIsListening] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // Initialize Speech Recognition with enhanced settings
  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const speechRecognition = new SpeechRecognition();

      // Enhanced configuration for better accuracy
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = "en-US";
      speechRecognition.maxAlternatives = 3;

      let finalTranscript = "";
      let interimTranscript = "";

      speechRecognition.onstart = () => {
        console.log("Speech recognition started");
      };

      speechRecognition.onresult = (event) => {
        finalTranscript = "";
        interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        // Update the answer with final transcript
        if (finalTranscript) {
          const currentAnswer = answers[currentQuestion] || "";
          const newAnswer = currentAnswer + finalTranscript;
          handleAnswerChange(newAnswer);

          // Show feedback to user
          console.log("Speech captured:", finalTranscript);
        }
      };

      speechRecognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);

        // Handle different error types
        switch (event.error) {
          case "network":
            alert(
              "Network error occurred during speech recognition. Please check your internet connection."
            );
            break;
          case "not-allowed":
            alert(
              "Microphone access denied. Please allow microphone access and try again."
            );
            break;
          case "no-speech":
            console.log("No speech detected, continuing...");
            break;
          case "audio-capture":
            alert(
              "No microphone was found. Please connect a microphone and try again."
            );
            break;
          default:
            console.warn("Speech recognition error:", event.error);
        }

        setIsListening(false);
      };

      speechRecognition.onend = () => {
        console.log("Speech recognition ended");
        setIsListening(false);
      };

      setRecognition(speechRecognition);
    } else {
      console.warn("Speech Recognition not supported in this browser");
    }
  }, [currentQuestion]); // Removed answers from dependencies to prevent excessive re-initialization

  const handleAnswerChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    // Stop speech recognition when moving to next question
    if (isListening && recognition) {
      recognition.stop();
    }
    if (currentQuestion < interviewQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    // Stop speech recognition when moving to previous question
    if (isListening && recognition) {
      recognition.stop();
    }
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitInterview = () => {
    // Stop speech recognition before submitting
    if (isListening && recognition) {
      recognition.stop();
    }

    const interviewResults = evaluateInterviewAnswers(answers);
    // Include the answers array in the results for detailed feedback
    const resultsWithAnswers = {
      ...interviewResults,
      answers: [...answers],
      totalQuestions: interviewQuestions.length,
    };
    setResults(resultsWithAnswers);
    setShowResults(true);

    setTimeout(() => {
      onComplete(resultsWithAnswers);
    }, 3000);
  };

  const toggleSpeechRecognition = () => {
    if (!recognition) {
      alert(
        "Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari for the best experience."
      );
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        recognition.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        alert(
          "Could not start speech recognition. Please ensure your microphone is connected and try again."
        );
      }
    }
  };

  const renderWelcome = () => (
    <div className="text-center py-8">
      <div className="text-6xl mb-6">👔</div>
      <h2 className="text-3xl font-bold text-slate-800 mb-4">
        HR Interview Round
      </h2>
      <Card className="max-w-2xl mx-auto text-left">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-800">
                  Interview Format
                </h4>
                <p className="text-slate-600">
                  7 questions covering personal and technical topics
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-800">
                  Response Options
                </h4>
                <p className="text-slate-600">
                  Type your answers or use speech-to-text (Chrome recommended)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-800">
                  Passing Criteria
                </h4>
                <p className="text-slate-600">
                  Answer at least 4 out of 7 questions satisfactorily
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Tip:</strong> Provide detailed, thoughtful answers.
              Include relevant examples and demonstrate your knowledge and
              enthusiasm.
            </p>
          </div>

          {!recognition && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> Speech recognition is not available in
                your browser. You can still type your answers manually.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Button
        onClick={() => setInterviewStarted(true)}
        className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
      >
        Begin Interview
      </Button>
    </div>
  );

  const renderQuestion = () => {
    const question = interviewQuestions[currentQuestion];

    return (
      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-600">
              Question {currentQuestion + 1} of {interviewQuestions.length}
            </span>
            <span
              className={`text-sm px-2 py-1 rounded ${
                question.type === "personal"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {question.type === "personal" ? "Personal" : "Technical"}
            </span>
          </div>
          <Progress
            value={((currentQuestion + 1) / interviewQuestions.length) * 100}
          />
        </div>

        {/* HR Avatar with Dialogue */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
            HR
          </div>
          <Card className="flex-1 relative">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Ms. Sarah Wilson - HR Manager</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600">Speaking</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Speech bubble pointer */}
              <div className="absolute left-0 top-6 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white -ml-2"></div>

              <p className="text-slate-800 text-lg leading-relaxed">
                "{question.question}"
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                <div
                  className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
                <span className="ml-2">Waiting for your response...</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Answer Input */}
        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Answer</span>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleSpeechRecognition}
                disabled={!recognition}
                className={`${
                  isListening
                    ? "bg-red-50 border-red-300 text-red-600"
                    : "bg-gray-50"
                } ${!recognition ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
                {isListening ? "Stop" : "Voice"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={answers[currentQuestion]}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Share your thoughts here... (minimum 20 characters for a good response)"
              className="min-h-32 resize-none"
            />

            <div className="flex justify-between items-center mt-4 text-sm text-slate-600">
              <span>
                {answers[currentQuestion].length} characters
                {answers[currentQuestion].length < 20 &&
                  " (minimum 20 recommended)"}
              </span>
              {isListening && (
                <div className="flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-600 font-medium">Recording...</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-red-400 rounded animate-pulse"></div>
                    <div
                      className="w-1 h-4 bg-red-500 rounded animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-1 h-3 bg-red-400 rounded animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {recognition && (
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mic className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-blue-800 text-sm font-semibold mb-2">
                      🎤 Enhanced Voice Input Available
                    </p>
                    <div className="text-blue-700 text-xs space-y-1">
                      <div>
                        • <strong>Click microphone</strong> to start/stop
                        recording
                      </div>
                      <div>
                        • <strong>Speak clearly</strong> at normal pace for best
                        results
                      </div>
                      <div>
                        • <strong>Automatic punctuation</strong> and
                        capitalization
                      </div>
                      <div
                        className={`flex items-center gap-2 ${
                          isListening ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            isListening ? "bg-red-500" : "bg-green-500"
                          }`}
                        ></div>
                        <strong>Status:</strong>{" "}
                        {isListening ? "Listening..." : "Ready to record"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!recognition && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <MicOff className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-yellow-800 text-sm font-semibold mb-1">
                      Speech Recognition Unavailable
                    </p>
                    <p className="text-yellow-700 text-xs">
                      Please use <strong>Chrome, Edge, or Safari</strong> for
                      voice input support. You can still type your answers
                      manually.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>

          {currentQuestion === interviewQuestions.length - 1 ? (
            <Button
              onClick={handleSubmitInterview}
              className="bg-purple-600 hover:bg-purple-700"
              disabled={answers[currentQuestion].length < 10}
            >
              Submit Interview
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="bg-purple-600 hover:bg-purple-700"
              disabled={answers[currentQuestion].length < 10}
            >
              Next Question
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderResults = () => (
    <div className="text-center py-8">
      <div
        className={`text-6xl mb-4 ${
          results.passed ? "text-green-600" : "text-red-600"
        }`}
      >
        {results.passed ? "🎉" : "😞"}
      </div>

      <h2
        className={`text-3xl font-bold mb-4 ${
          results.passed ? "text-green-600" : "text-red-600"
        }`}
      >
        {results.passed ? "Interview Passed!" : "Interview Failed"}
      </h2>

      <Card className="max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-800">
                {results.score}/{results.totalQuestions}
              </div>
              <div className="text-slate-600">Questions Answered Well</div>
            </div>

            <div className="border-t pt-4">
              <p className="text-slate-600 text-sm">{results.feedback}</p>
            </div>

            {results.passed && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800 font-semibold">
                  You earned Key C! 🔑
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (showResults) {
    return renderResults();
  }

  if (!interviewStarted) {
    return renderWelcome();
  }

  return renderQuestion();
};

export default InterviewPanel;
