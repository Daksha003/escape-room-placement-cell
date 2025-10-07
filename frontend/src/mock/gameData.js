// Mock data for the Escape Placement Cell game

export const aptitudeQuestions = [
  {
    id: 1,
    question: "If a train runs at 60 km/h and covers 180 km, how much time will it take?",
    options: ["2 hours", "3 hours", "4 hours", "5 hours"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which data structure uses FIFO (First In, First Out)?",
    options: ["Stack", "Queue", "Linked List", "Tree"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What is the next number in the series: 2, 6, 12, 20, 30, ?",
    options: ["36", "40", "42", "44"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "If the average of 5 numbers is 18, what is their total sum?",
    options: ["85", "88", "90", "90"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "In DBMS, which normal form removes partial dependency?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "If 10110 (binary) is equal to decimal:",
    options: ["20", "22", "24", "26"],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "A man spends 1/3 of his salary on rent, 1/5 on food, and saves the rest. If his salary is ₹30,000, how much does he save?",
    options: ["₹12,000", "₹13,000", "₹14,000", "₹15,000"],
    correctAnswer: 0
  },
  {
    id: 8,
    question: "Which sorting algorithm has the best average time complexity?",
    options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
    correctAnswer: 2
  },
  {
    id: 9,
    question: "A bag contains 5 red balls and 3 blue balls. Probability of picking a blue ball?",
    options: ["3/5", "3/8", "5/8", "2/5"],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "In Operating Systems, which scheduling algorithm is non-preemptive?",
    options: ["Round Robin", "Priority Scheduling", "Shortest Job Next (SJN)", "Multilevel Queue"],
    correctAnswer: 2
  }
];

export const codingChallenges = {
  python: {
    problem: `Write a function that returns the factorial of a given number.

Example:
factorial(5) should return 120
factorial(0) should return 1

Requirements:
- Handle edge case for 0
- Use recursive or iterative approach
- Return the factorial as a number`,
    
    starterCode: `def factorial(n):
    # Your code here
    pass

# Test cases
print(factorial(5))  # Should output: 120
print(factorial(0))  # Should output: 1
print(factorial(3))  # Should output: 6`,

    testCases: [
      { input: 5, expected: 120, description: "factorial(5) should return 120" },
      { input: 0, expected: 1, description: "factorial(0) should return 1" },
      { input: 3, expected: 6, description: "factorial(3) should return 6" }
    ]
  },
  
  java: {
    problem: `Write a method that returns the factorial of a given number.

Example:
factorial(5) should return 120
factorial(0) should return 1

Requirements:
- Handle edge case for 0
- Use recursive or iterative approach
- Return the factorial as a long`,
    
    starterCode: `public class Solution {
    public static long factorial(int n) {
        // Your code here
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(factorial(5));  // Should output: 120
        System.out.println(factorial(0));  // Should output: 1
        System.out.println(factorial(3));  // Should output: 6
    }
}`,

    testCases: [
      { input: 5, expected: 120, description: "factorial(5) should return 120" },
      { input: 0, expected: 1, description: "factorial(0) should return 1" },
      { input: 3, expected: 6, description: "factorial(3) should return 6" }
    ]
  },
  
  cpp: {
    problem: `Write a function that returns the factorial of a given number.

Example:
factorial(5) should return 120
factorial(0) should return 1

Requirements:
- Handle edge case for 0
- Use recursive or iterative approach
- Return the factorial as a long long`,
    
    starterCode: `#include <iostream>
using namespace std;

long long factorial(int n) {
    // Your code here
    return 0;
}

int main() {
    cout << factorial(5) << endl;  // Should output: 120
    cout << factorial(0) << endl;  // Should output: 1
    cout << factorial(3) << endl;  // Should output: 6
    return 0;
}`,

    testCases: [
      { input: 5, expected: 120, description: "factorial(5) should return 120" },
      { input: 0, expected: 1, description: "factorial(0) should return 1" },
      { input: 3, expected: 6, description: "factorial(3) should return 6" }
    ]
  },
  
  c: {
    problem: `Write a function that returns the factorial of a given number.

Example:
factorial(5) should return 120
factorial(0) should return 1

Requirements:
- Handle edge case for 0
- Use recursive or iterative approach
- Return the factorial as a long long`,
    
    starterCode: `#include <stdio.h>

long long factorial(int n) {
    // Your code here
    return 0;
}

int main() {
    printf("%lld\\n", factorial(5));  // Should output: 120
    printf("%lld\\n", factorial(0));  // Should output: 1
    printf("%lld\\n", factorial(3));  // Should output: 6
    return 0;
}`,

    testCases: [
      { input: 5, expected: 120, description: "factorial(5) should return 120" },
      { input: 0, expected: 1, description: "factorial(0) should return 1" },
      { input: 3, expected: 6, description: "factorial(3) should return 6" }
    ]
  }
};

// Keep backward compatibility
export const codingChallenge = codingChallenges.python;

export const interviewQuestions = [
  {
    id: 1,
    question: "Tell me about yourself and why you're interested in this role.",
    type: "personal",
    expectedKeywords: ["experience", "skills", "interest", "passion", "goals", "background"]
  },
  {
    id: 2,
    question: "What is your greatest strength and how has it helped you in your career?",
    type: "personal", 
    expectedKeywords: ["strength", "skill", "ability", "help", "work", "team", "leadership", "problem-solving"]
  },
  {
    id: 3,
    question: "Explain the difference between var, let, and const in JavaScript.",
    type: "technical",
    expectedKeywords: ["scope", "hoisting", "reassign", "block", "function", "immutable", "redeclare"]
  },
  {
    id: 4,
    question: "What is the difference between == and === in JavaScript?",
    type: "technical",
    expectedKeywords: ["strict", "equality", "type", "coercion", "comparison", "loose"]
  },
  {
    id: 5,
    question: "Explain what is a closure in JavaScript and provide an example.",
    type: "technical",
    expectedKeywords: ["function", "scope", "access", "outer", "variable", "example", "lexical"]
  },
  {
    id: 6,
    question: "What is the difference between SQL and NoSQL databases?",
    type: "technical",
    expectedKeywords: ["structured", "schema", "scalability", "ACID", "flexibility", "relational", "document"]
  },
  {
    id: 7,
    question: "Explain the concept of Object-Oriented Programming and its principles.",
    type: "technical",
    expectedKeywords: ["encapsulation", "inheritance", "polymorphism", "abstraction", "class", "object", "methods"]
  }
];

export const gameProgress = {
  currentRoom: 1,
  keysCollected: {
    keyA: false,
    keyB: false,
    keyC: false
  },
  roomsCompleted: {
    classroom: false,
    codingLab: false,
    interviewRoom: false
  }
};

// Helper function to get random aptitude questions
export const getRandomAptitudeQuestions = (count = 5) => {
  const shuffled = [...aptitudeQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Mock evaluation functions
export const evaluateAptitudeTest = (answers, selectedQuestions) => {
  // Fix: Use the actual selected questions instead of the full array
  const correctAnswers = answers.filter((answer, index) => {
    const question = selectedQuestions[index];
    return question && answer === question.correctAnswer;
  });
  
  const percentage = (correctAnswers.length / answers.length) * 100;
  return {
    passed: percentage >= 60,
    score: percentage,
    correctAnswers: correctAnswers.length,
    totalQuestions: answers.length
  };
};

export const evaluateCodingChallenge = (code, language = 'python') => {
  // Enhanced evaluation logic that works for all languages
  let passed = false;
  
  // Check for language-specific patterns
  switch (language) {
    case 'python':
      // Check for proper Python factorial implementation
      const hasPythonDef = code.includes('def factorial');
      const hasReturnOrLogic = code.includes('return') && 
        (code.includes('*') || code.includes('for') || code.includes('while') || 
         code.includes('factorial(n-1)') || code.includes('range'));
      passed = hasPythonDef && hasReturnOrLogic;
      break;
      
    case 'java':
      // Check for proper Java factorial implementation
      const hasJavaMethod = code.includes('factorial') && code.includes('long');
      const hasJavaLogic = code.includes('return') && 
        (code.includes('*') || code.includes('for') || code.includes('while') || 
         code.includes('factorial(n-1)'));
      passed = hasJavaMethod && hasJavaLogic;
      break;
      
    case 'cpp':
    case 'c':
      // Check for proper C/C++ factorial implementation
      const hasCFunction = code.includes('factorial') && 
        (code.includes('long long') || code.includes('int'));
      const hasCLogic = code.includes('return') && 
        (code.includes('*') || code.includes('for') || code.includes('while') || 
         code.includes('factorial(n-1)'));
      passed = hasCFunction && hasCLogic;
      break;
      
    default:
      // Fallback for JavaScript or unknown languages
      const hasFunction = code.includes('function factorial') || code.includes('factorial');
      const hasReturn = code.includes('return');
      const hasLogic = code.includes('*') || code.includes('for') || 
        code.includes('while') || code.includes('factorial(n-1)');
      passed = hasFunction && hasReturn && hasLogic;
  }
  
  // Additional validation: check for basic factorial logic
  if (passed) {
    // Look for factorial-specific patterns
    const hasFactorialLogic = 
      code.includes('n * ') || 
      code.includes('result *') || 
      code.includes('factorial(n-1)') || 
      code.includes('factorial(n - 1)') ||
      (code.includes('for') && code.includes('*')) ||
      (code.includes('while') && code.includes('*'));
    
    // Check for base case handling
    const hasBaseCase = 
      code.includes('n == 0') || 
      code.includes('n <= 1') || 
      code.includes('n < 2') ||
      code.includes('if (n == 0)') ||
      code.includes('if n == 0') ||
      code.includes('if(n==0)') ||
      code.includes('if (n <= 1)');
    
    passed = hasFactorialLogic && hasBaseCase;
  }
  
  const currentChallenge = codingChallenges[language] || codingChallenge;
  return {
    passed,
    language,
    testResults: currentChallenge.testCases.map((test, index) => ({
      testCase: index + 1,
      passed: passed,
      input: test.input,
      expected: test.expected,
      actual: passed ? test.expected : 'Error',
      description: test.description
    }))
  };
};

export const evaluateInterviewAnswers = (answers) => {
  // Mock evaluation based on answer length and keyword matching
  let correctAnswers = 0;
  
  answers.forEach((answer, index) => {
    const question = interviewQuestions[index];
    if (question && answer && answer.length > 20) {
      const hasKeywords = question.expectedKeywords.some(keyword =>
        answer.toLowerCase().includes(keyword.toLowerCase())
      );
      if (hasKeywords) correctAnswers++;
    }
  });
  
  const passed = correctAnswers >= 4;
  return {
    passed,
    score: correctAnswers,
    totalQuestions: answers.length,
    feedback: passed ? "Great responses! You showed good understanding." : "Need to provide more detailed answers."
  };
};