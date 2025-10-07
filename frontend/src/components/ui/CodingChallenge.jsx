import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Textarea } from './textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { codingChallenges, evaluateCodingChallenge } from '../../mock/gameData';
import { Play, CheckCircle, XCircle, Code, Zap, Settings } from 'lucide-react';

const CodingChallenge = ({ onComplete }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState(codingChallenges.python.starterCode);
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const languages = [
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'cpp', label: 'C++', icon: '⚡' },
    { value: 'c', label: 'C', icon: '🔧' }
  ];

  const currentChallenge = codingChallenges[selectedLanguage];

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setCode(codingChallenges[language].starterCode);
    setTestResults(null);
    setShowResults(false);
  };

  const handleRunTests = async () => {
    setIsRunning(true);
    
    // Simulate test execution with enhanced feedback
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const results = evaluateCodingChallenge(code, selectedLanguage); // Pass the selected language
    
    // Enhanced test results with only 3 test cases
    const enhancedResults = {
      ...results,
      language: selectedLanguage,
      testResults: currentChallenge.testCases.map((test, index) => ({
        testCase: index + 1,
        passed: results.passed,
        input: test.input,
        expected: test.expected,
        actual: results.passed ? test.expected : 'Error',
        description: test.description,
        executionTime: `${Math.random() * 50 + 10}ms`
      }))
    };
    
    setTestResults(enhancedResults);
    setIsRunning(false);
    setShowResults(true);

    if (enhancedResults.passed) {
      setTimeout(() => {
        onComplete(enhancedResults);
      }, 3000);
    }
  };

  const renderLanguageSelector = () => (
    <Card className="mb-6 border-2 border-cyan-200 bg-gradient-to-r from-blue-50 to-cyan-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-600" />
          Programming Language
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 flex-wrap">
          {languages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => handleLanguageChange(lang.value)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all transform hover:scale-105 ${
                selectedLanguage === lang.value
                  ? 'bg-cyan-600 text-white border-cyan-600 shadow-lg shadow-cyan-600/30'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-cyan-400 hover:bg-cyan-50'
              }`}
            >
              <span className="text-xl">{lang.icon}</span>
              <span className="font-semibold">{lang.label}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-cyan-100 border border-cyan-300 rounded-lg">
          <p className="text-cyan-800 text-sm">
            <strong>Selected:</strong> {languages.find(l => l.value === selectedLanguage)?.label} - 
            Write your solution and run all 3 test cases to pass the challenge!
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderProblemStatement = () => (
    <Card className="mb-6 border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          Problem Statement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-line text-slate-700 leading-relaxed">
          {currentChallenge.problem}
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h5 className="font-semibold text-blue-800 mb-2">Test Cases to Pass:</h5>
          <div className="space-y-1 text-sm text-blue-700">
            {currentChallenge.testCases.map((test, index) => (
              <div key={index} className="font-mono">
                • {test.description}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderCodeEditor = () => (
    <Card className="mb-6 border-2 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-green-600" />
            Code Editor - {languages.find(l => l.value === selectedLanguage)?.label}
          </span>
          <div className="text-sm text-gray-500">
            {code.split('\n').length} lines
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="font-mono text-sm min-h-80 bg-slate-900 text-green-400 border-slate-700 resize-none"
          placeholder="Write your code here..."
        />
        
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-slate-600 flex items-center gap-4">
            <span>Language: <strong>{languages.find(l => l.value === selectedLanguage)?.label}</strong></span>
            <span>Test Cases: <strong>3</strong></span>
          </div>
          
          <Button
            onClick={handleRunTests}
            disabled={isRunning || !code.trim()}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold"
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? 'Running Tests...' : 'Run All Tests'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderTestResults = () => {
    if (!testResults) return null;

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${testResults.passed ? 'text-green-600' : 'text-red-600'}`}>
            {testResults.passed ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            Test Results - {languages.find(l => l.value === testResults.language)?.label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`p-4 rounded-lg mb-6 ${testResults.passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <p className={`font-semibold text-lg ${testResults.passed ? 'text-green-800' : 'text-red-800'}`}>
              {testResults.passed ? '🎉 All Tests Passed!' : '❌ Tests Failed'}
            </p>
            {testResults.passed && (
              <p className="text-green-700 mt-2">
                Excellent work! You earned Key B! 🔑
              </p>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Test Case Results:
            </h4>
            {testResults.testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  result.passed 
                    ? 'bg-green-50 border-l-green-500 border border-green-200' 
                    : 'bg-red-50 border-l-red-500 border border-red-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {result.passed ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className="font-semibold">Test Case {result.testCase}</span>
                  </div>
                  <span className="text-xs text-gray-500">{result.executionTime}</span>
                </div>
                
                <div className="text-sm space-y-1">
                  <div><strong>Description:</strong> {result.description}</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-600">Expected: </span>
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded">{result.expected}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Got: </span>
                      <span className={`font-mono px-2 py-1 rounded ${result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {result.actual}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!testResults.passed && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h5 className="font-semibold text-blue-800 mb-2">💡 Debugging Tips:</h5>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Check your base case: factorial(0) should return 1</li>
                <li>• Ensure your loop or recursion handles all positive integers</li>
                <li>• Verify the return type matches the expected output</li>
                <li>• Test your function with the given examples manually</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (showResults && testResults?.passed) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-green-600 mb-4">Challenge Completed!</h2>
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">All 3 Tests Passed</span>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800 font-semibold">You earned Key B! 🔑</p>
                <p className="text-green-700 text-sm mt-1">Language: {languages.find(l => l.value === selectedLanguage)?.label}</p>
              </div>
              
              <p className="text-slate-600">
                Outstanding! Your factorial function works perfectly across all test cases.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Multi-Language Coding Challenge</h2>
        <p className="text-slate-600">
          Choose your preferred programming language and solve the coding problem
        </p>
      </div>

      {renderLanguageSelector()}
      {renderProblemStatement()}
      {renderCodeEditor()}
      {renderTestResults()}
    </div>
  );
};

export default CodingChallenge;