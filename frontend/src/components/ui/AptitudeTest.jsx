import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Progress } from './progress';
import { getRandomAptitudeQuestions, evaluateAptitudeTest } from '../../mock/gameData';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const AptitudeTest = ({ onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Load random questions when component mounts
    const randomQuestions = getRandomAptitudeQuestions(5);
    setQuestions(randomQuestions);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showResults && currentPage > 1) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleSubmit();
    }
  }, [timeLeft, showResults, currentPage]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmit = () => {
    const answerArray = questions.map((_, index) => answers[index] ?? -1);
    const testResults = evaluateAptitudeTest(answerArray, questions); // Pass the selected questions
    setResults(testResults);
    setShowResults(true);
    
    setTimeout(() => {
      onComplete(testResults);
    }, 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderWelcomePage = () => (
    <div className="text-center py-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Welcome to the Aptitude Test</h2>
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Instructions:</strong>
            </p>
            <ul className="mt-2 text-sm text-blue-700 list-disc list-inside space-y-1">
              <li>You will have 5 minutes to complete 5 questions</li>
              <li>Each question has multiple choice answers</li>
              <li>You need to score at least 60% to pass</li>
              <li>Once you start, the timer will begin</li>
              <li>Review your answers before submitting</li>
            </ul>
          </div>
        </div>
      </div>
      <Button 
        onClick={() => setCurrentPage(1)} 
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
      >
        Start Test
      </Button>
    </div>
  );

  const renderInstructionsPage = () => (
    <div className="text-center py-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Test Instructions</h2>
      <Card className="text-left max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-800">Time Limit</h4>
                <p className="text-slate-600">5 minutes for 5 questions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-800">Passing Score</h4>
                <p className="text-slate-600">60% or higher (3 out of 5 questions)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-semibent text-slate-800">Important</h4>
                <p className="text-slate-600">You cannot go back once you proceed to the next question</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Button 
        onClick={() => setCurrentPage(2)} 
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
      >
        Begin Questions
      </Button>
    </div>
  );

  const renderQuestionPage = () => {
    const currentQuestionIndex = currentPage - 2;
    const question = questions[currentQuestionIndex];
    
    if (!question) return null;

    return (
      <div className="py-4">
        {/* Timer and Progress */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-600" />
            <span className={`font-mono text-lg ${timeLeft < 60 ? 'text-red-600' : 'text-slate-700'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="text-sm text-slate-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>

        <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="mb-6" />

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Question {currentQuestionIndex + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-800 mb-6 text-lg leading-relaxed">{question.question}</p>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    answers[currentQuestionIndex] === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={index}
                    checked={answers[currentQuestionIndex] === index}
                    onChange={() => handleAnswerSelect(currentQuestionIndex, index)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-3 text-slate-700">{option}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage <= 2}
              >
                Previous
              </Button>
              
              {currentQuestionIndex === questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={answers[currentQuestionIndex] === undefined}
                >
                  Submit Test
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={answers[currentQuestionIndex] === undefined}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next Question
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderResults = () => (
    <div className="text-center py-8">
      <div className={`text-6xl mb-4 ${results.passed ? 'text-green-600' : 'text-red-600'}`}>
        {results.passed ? '🎉' : '😞'}
      </div>
      
      <h2 className={`text-3xl font-bold mb-4 ${results.passed ? 'text-green-600' : 'text-red-600'}`}>
        {results.passed ? 'Congratulations!' : 'Test Failed'}
      </h2>
      
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-800">{results.score.toFixed(1)}%</div>
              <div className="text-slate-600">Your Score</div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between text-sm">
                <span>Correct Answers:</span>
                <span className="font-semibold">{results.correctAnswers}/{results.totalQuestions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Passing Score:</span>
                <span className="font-semibold">60%</span>
              </div>
            </div>
            
            {results.passed && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800 font-semibold">You earned Key A! 🔑</p>
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

  if (currentPage === 0) {
    return renderWelcomePage();
  }

  if (currentPage === 1) {
    return renderInstructionsPage();
  }

  return renderQuestionPage();
};

export default AptitudeTest;