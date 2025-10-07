# Escape Placement Cell Game - API Contracts & Integration Plan

## Current Frontend State ✅
- **3D Game Engine**: Working with Three.js/React Three Fiber
- **Room Environments**: All 3 rooms implemented and styled
- **UI System**: Complete modal system with polished animations
- **Mock Data**: All game logic working with local data
- **User Flow**: Complete game progression from Room 1 → 2 → 3 → Completion

## Mock Data Currently Used
### 1. Aptitude Test (`mock/gameData.js`)
- **Questions**: 10 technical aptitude questions (updated per user requirements)
- **Evaluation**: Local scoring system (60% pass threshold)
- **Timer**: 5-minute countdown
- **Randomization**: 5 random questions from question bank

### 2. Coding Challenge (`mock/gameData.js`) 
- **Problem**: Factorial function implementation
- **Test Cases**: 5 predefined test scenarios
- **Evaluation**: Basic syntax and logic checking
- **Editor**: Textarea with syntax highlighting styling

### 3. Interview Simulation (`mock/gameData.js`)
- **Questions**: 2 personal + 5 technical questions (updated)  
- **Speech-to-Text**: Real browser API integration working
- **Evaluation**: Keyword matching and length validation
- **AI Simulation**: Mock scoring (4/7 pass threshold)

## API Contracts for Backend Integration

### Base URL Structure
```
/api/game/aptitude
/api/game/coding  
/api/game/interview
/api/game/progress
```

### 1. Aptitude Test APIs
```typescript
POST /api/game/aptitude/start
Response: { sessionId: string, questions: Question[], timeLimit: number }

POST /api/game/aptitude/submit  
Request: { sessionId: string, answers: number[] }
Response: { passed: boolean, score: number, keyAwarded: boolean }
```

### 2. Coding Challenge APIs
```typescript  
POST /api/game/coding/start
Response: { sessionId: string, problem: string, starterCode: string, testCases: TestCase[] }

POST /api/game/coding/submit
Request: { sessionId: string, code: string }
Response: { passed: boolean, testResults: TestResult[], keyAwarded: boolean }
```

### 3. Interview APIs
```typescript
POST /api/game/interview/start  
Response: { sessionId: string, questions: InterviewQuestion[] }

POST /api/game/interview/submit
Request: { sessionId: string, answers: string[] }
Response: { passed: boolean, score: number, feedback: string, keyAwarded: boolean }
```

### 4. Game Progress APIs
```typescript
GET /api/game/progress
Response: { currentRoom: number, keysCollected: KeyStatus, roomsCompleted: RoomStatus }

POST /api/game/progress/update
Request: { room: string, completed: boolean, keyAwarded: string }
Response: { success: boolean, newProgress: GameProgress }
```

## Data Models

### Question Model
```typescript
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}
```

### TestCase Model  
```typescript
interface TestCase {
  input: any;
  expected: any;
  description: string;
}
```

### InterviewQuestion Model
```typescript
interface InterviewQuestion {
  id: number;
  question: string;
  type: 'personal' | 'technical';
  expectedKeywords: string[];
  category?: string;
}
```

### GameProgress Model
```typescript
interface GameProgress {
  userId?: string;
  sessionId: string;
  currentRoom: 1 | 2 | 3;
  keysCollected: {
    keyA: boolean;
    keyB: boolean; 
    keyC: boolean;
  };
  roomsCompleted: {
    classroom: boolean;
    codingLab: boolean;
    interviewRoom: boolean;
  };
  startTime: Date;
  completionTime?: Date;
}
```

## Frontend Integration Points

### Files to Update for Backend Integration:
1. **`/components/ui/AptitudeTest.jsx`**
   - Replace `getRandomAptitudeQuestions()` with API call
   - Replace `evaluateAptitudeTest()` with API submission
   
2. **`/components/ui/CodingChallenge.jsx`**
   - Replace `codingChallenge` mock with API data  
   - Replace `evaluateCodingChallenge()` with API submission

3. **`/components/ui/InterviewPanel.jsx`**
   - Replace `interviewQuestions` mock with API data
   - Replace `evaluateInterviewAnswers()` with API submission
   - Keep speech-to-text functionality (already working)

4. **`/components/Game.jsx`**
   - Add API calls for game progress tracking
   - Implement session management
   - Add error handling and loading states

## Backend Implementation Requirements

### Database Collections:
- `questions` (aptitude questions)
- `coding_challenges` (problems and test cases)  
- `interview_questions` (questions bank)
- `game_sessions` (user progress tracking)
- `game_results` (completed game statistics)

### Key Features to Implement:
- **Session Management**: Track user progress across rooms
- **Question Randomization**: Serve random questions from database  
- **Code Execution**: Safe code evaluation for coding challenges
- **AI Integration**: Optional real AI evaluation for interviews
- **Analytics**: Track completion rates, average scores, etc.

## Environment Improvements Made ✅

### Room 1 - Classroom
- ✅ Box-like classroom environment
- ✅ Blackboard with "APTITUDE ROUND" text
- ✅ Teacher character (Prof. Smith)  
- ✅ Multiple student desks in rows
- ✅ Interactive booklet on main desk
- ✅ Updated with user's technical questions

### Room 2 - Coding Lab  
- ✅ Dark gaming theme with neon green accents
- ✅ RGB lighting effects throughout room
- ✅ Gaming PC setup with large monitor
- ✅ Keyboard and mouse details
- ✅ Matrix-style screen effects
- ✅ Multiple coding stations around room

### Room 3 - Interview Room
- ✅ Realistic HR character with dialogue system
- ✅ Professional speech bubbles with animations  
- ✅ Real speech-to-text integration (browser API)
- ✅ Enhanced interview flow with 2 personal + 5 technical questions

## Next Steps for Backend Development
1. Set up MongoDB models and collections
2. Implement basic CRUD operations for questions
3. Create session management system
4. Build evaluation engines for each challenge type
5. Replace frontend mock calls with real API integration
6. Add comprehensive error handling and validation
7. Implement optional AI enhancement for interview evaluation

## Testing Strategy
- Unit tests for evaluation algorithms
- Integration tests for API endpoints
- End-to-end testing for complete game flow
- Performance testing for code execution security
- Speech-to-text compatibility testing across browsers