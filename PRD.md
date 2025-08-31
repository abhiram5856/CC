# 📋 CampusConnect - Product Requirements Document (PRD)

## 🎯 Product Vision
CampusConnect aims to create a comprehensive student networking platform that facilitates meaningful connections between freshmen, seniors, and alumni through mentorship, events, skill sharing, and anonymous discussions.

## 👥 Target Users
- **Freshmen**: Seeking guidance and mentorship
- **Seniors**: Offering expertise and leadership
- **Alumni**: Providing career insights and networking
- **Event Organizers**: Managing campus events and opportunities

---

## 🏗️ Technical Architecture

### Backend Stack
- **Framework**: Node.js + Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.io for chat functionality
- **File Upload**: Multer for profile pictures and documents

### Frontend Stack
- **Framework**: React.js with Hooks
- **Styling**: Tailwind CSS
- **State Management**: React Context API + useReducer
- **Routing**: React Router v6
- **HTTP Client**: Axios for API calls

---

## 📊 Feature 1: Seniors' Guidance & Mentorship

### 🎯 Overview
A comprehensive mentorship system that connects freshmen with experienced seniors and alumni based on interests, skills, and academic needs.

### 📋 Implementation Checklist

#### Backend Setup
- [ ] **Database Schema Design**
  ```javascript
  // User Model
  {
    _id: ObjectId,
    email: String,
    password: String (hashed),
    name: String,
    role: String (freshman/senior/alumni),
    year: Number,
    stream: String,
    interests: [String],
    skills: [String],
    bio: String,
    profilePicture: String,
    rating: Number,
    mentorshipCount: Number,
    createdAt: Date
  }

  // Mentorship Request Model
  {
    _id: ObjectId,
    menteeId: ObjectId,
    mentorId: ObjectId,
    subject: String,
    description: String,
    status: String (pending/accepted/rejected/completed),
    scheduledAt: Date,
    createdAt: Date
  }

  // Q&A Model
  {
    _id: ObjectId,
    authorId: ObjectId,
    title: String,
    content: String,
    tags: [String],
    upvotes: Number,
    answers: [{
      authorId: ObjectId,
      content: String,
      upvotes: Number,
      isAccepted: Boolean,
      createdAt: Date
    }],
    createdAt: Date
  }
  ```

- [ ] **API Endpoints**
  ```javascript
  // Authentication
  POST /api/auth/register
  POST /api/auth/login
  GET /api/auth/profile

  // User Management
  GET /api/users/mentors
  GET /api/users/mentors/:id
  PUT /api/users/profile
  GET /api/users/search

  // Mentorship
  POST /api/mentorship/request
  GET /api/mentorship/requests
  PUT /api/mentorship/requests/:id
  DELETE /api/mentorship/requests/:id

  // Q&A System
  POST /api/qa/questions
  GET /api/qa/questions
  POST /api/qa/questions/:id/answers
  PUT /api/qa/answers/:id/upvote
  ```

- [ ] **Terminal Commands**
  ```bash
  # Initialize backend
  mkdir backend && cd backend
  npm init -y
  npm install express mongoose bcryptjs jsonwebtoken cors dotenv multer socket.io
  npm install --save-dev nodemon

  # Create package.json scripts
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
  ```

#### Frontend Setup
- [ ] **Component Structure**
  ```
  src/
  ├── components/
  │   ├── MentorCard.jsx
  │   ├── MentorSearch.jsx
  │   ├── MentorshipRequest.jsx
  │   ├── QACard.jsx
  │   └── UserProfile.jsx
  ├── pages/
  │   ├── MentorshipHub.jsx
  │   ├── MentorProfile.jsx
  │   ├── QASection.jsx
  │   └── MyMentorships.jsx
  └── services/
      ├── authService.js
      ├── mentorService.js
      └── qaService.js
  ```

- [ ] **State Management**
  ```javascript
  // Context for user authentication
  const AuthContext = createContext();

  // Context for mentorship data
  const MentorshipContext = createContext();
  ```

#### Integration Steps
- [ ] Set up API service layer with Axios
- [ ] Implement authentication flow with JWT
- [ ] Create protected routes for authenticated users
- [ ] Add error handling and loading states
- [ ] Implement real-time notifications for mentorship requests

#### Testing Checklist
- [ ] User registration and login
- [ ] Mentor search and filtering
- [ ] Mentorship request creation and management
- [ ] Q&A posting and answering
- [ ] Profile updates and validation
- [ ] Responsive design on mobile devices

---

## 📅 Feature 2: Events & Opportunities Board

### 🎯 Overview
A centralized platform for discovering, organizing, and managing campus events, workshops, hackathons, and career opportunities.

### 📋 Implementation Checklist

#### Backend Setup
- [ ] **Database Schema**
  ```javascript
  // Event Model
  {
    _id: ObjectId,
    title: String,
    description: String,
    category: String,
    organizerId: ObjectId,
    date: Date,
    location: String,
    mode: String (online/offline/hybrid),
    maxParticipants: Number,
    currentParticipants: Number,
    tags: [String],
    image: String,
    registrationDeadline: Date,
    status: String (upcoming/ongoing/completed/cancelled),
    createdAt: Date
  }

  // Event Registration Model
  {
    _id: ObjectId,
    eventId: ObjectId,
    userId: ObjectId,
    status: String (registered/attended/cancelled),
    registeredAt: Date
  }
  ```

- [ ] **API Endpoints**
  ```javascript
  // Events
  POST /api/events
  GET /api/events
  GET /api/events/:id
  PUT /api/events/:id
  DELETE /api/events/:id

  // Event Registration
  POST /api/events/:id/register
  DELETE /api/events/:id/register
  GET /api/events/:id/participants

  // Event Search & Filter
  GET /api/events/search?category=&date=&mode=
  ```

#### Frontend Setup
- [ ] **Components**
  ```
  src/components/
  ├── EventCard.jsx
  ├── EventForm.jsx
  ├── EventFilter.jsx
  ├── EventCalendar.jsx
  └── RegistrationModal.jsx
  ```

- [ ] **Pages**
  ```
  src/pages/
  ├── EventsHub.jsx
  ├── EventDetails.jsx
  ├── CreateEvent.jsx
  └── MyEvents.jsx
  ```

#### Integration Steps
- [ ] Implement event CRUD operations
- [ ] Add search and filtering functionality
- [ ] Create registration system
- [ ] Add calendar view integration
- [ ] Implement event notifications

---

## 🤝 Feature 3: Skill Swap + Teammates Finder

### 🎯 Overview
A platform for students to find project partners, swap skills, and form teams for hackathons, projects, and competitions.

### 📋 Implementation Checklist

#### Backend Setup
- [ ] **Database Schema**
  ```javascript
  // Skill Profile Model
  {
    _id: ObjectId,
    userId: ObjectId,
    skillsToTeach: [String],
    skillsToLearn: [String],
    projects: [{
      title: String,
      description: String,
      skills: [String],
      status: String
    }],
    availability: String,
    rating: Number,
    completedSwaps: Number
  }

  // Team/Project Model
  {
    _id: ObjectId,
    creatorId: ObjectId,
    title: String,
    description: String,
    requiredSkills: [String],
    teamSize: Number,
    currentMembers: [ObjectId],
    status: String (open/in-progress/completed),
    deadline: Date,
    createdAt: Date
  }
  ```

- [ ] **Matching Algorithm**
  ```javascript
  // Skill matching logic
  function findMatches(userId, userSkills) {
    // Find users with complementary skills
    // Calculate compatibility score
    // Return ranked matches
  }
  ```

#### Frontend Setup
- [ ] **Components**
  ```
  src/components/
  ├── SkillProfile.jsx
  ├── TeamCard.jsx
  ├── MatchingAlgorithm.jsx
  └── SkillSwapModal.jsx
  ```

#### Integration Steps
- [ ] Implement skill profile creation
- [ ] Build matching algorithm
- [ ] Create team formation system
- [ ] Add skill verification system

---

## 🕵️ Feature 4: Anonymous Chat

### 🎯 Overview
A safe, moderated anonymous chat system for sensitive discussions, mental health support, and general student discussions.

### 📋 Implementation Checklist

#### Backend Setup
- [ ] **Database Schema**
  ```javascript
  // Chat Room Model
  {
    _id: ObjectId,
    name: String,
    description: String,
    category: String,
    isAnonymous: Boolean,
    maxUsers: Number,
    currentUsers: Number,
    moderators: [ObjectId],
    createdAt: Date
  }

  // Message Model
  {
    _id: ObjectId,
    roomId: ObjectId,
    senderId: ObjectId,
    anonymousId: String,
    content: String,
    isAnonymous: Boolean,
    isFlagged: Boolean,
    createdAt: Date
  }
  ```

- [ ] **Socket.io Implementation**
  ```javascript
  // Real-time messaging
  io.on('connection', (socket) => {
    socket.on('join-room', (roomId) => {
      socket.join(roomId);
    });
    
    socket.on('send-message', (data) => {
      io.to(data.roomId).emit('new-message', data);
    });
  });
  ```

#### Frontend Setup
- [ ] **Components**
  ```
  src/components/
  ├── ChatRoom.jsx
  ├── MessageList.jsx
  ├── MessageInput.jsx
  └── AnonymousChat.jsx
  ```

#### Integration Steps
- [ ] Set up Socket.io client
- [ ] Implement anonymous user management
- [ ] Add content moderation system
- [ ] Create reporting mechanism

---

## 🚀 Deployment Guide

### GitHub Repository Setup
```bash
# Initialize repository
git init
git add .
git commit -m "Initial commit: CampusConnect project setup"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/campusconnect.git
git branch -M main
git push -u origin main
```

### Environment Variables
Create `.env` files in both backend and frontend:

**Backend (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campusconnect
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

### Deployment Commands
```bash
# Backend deployment (Render)
npm install
npm start

# Frontend deployment (Vercel)
npm run build
```

---

## 👥 Team Collaboration

### Git Workflow
```bash
# Feature development
git checkout -b feature/mentorship-system
git add .
git commit -m "feat: add mentor profile creation"
git push origin feature/mentorship-system
# Create PR on GitHub
```

### Task Assignment
- **Backend Developer**: API development, database design, authentication
- **Frontend Developer**: UI/UX implementation, state management, responsive design
- **DevOps**: Deployment setup, CI/CD pipeline, environment management
- **QA Tester**: Testing, bug reporting, user acceptance testing

### Code Review Process
1. Create feature branch
2. Implement feature with tests
3. Create pull request
4. Code review by team members
5. Address feedback and merge

---

## 📊 Progress Tracking

### Week 1-2: Foundation
- [ ] Backend API setup
- [ ] Database schema design
- [ ] Authentication system
- [ ] Basic frontend structure

### Week 3-4: Core Features
- [ ] Mentorship system
- [ ] Events management
- [ ] User profiles

### Week 5-6: Advanced Features
- [ ] Skill swap system
- [ ] Anonymous chat
- [ ] Real-time functionality

### Week 7-8: Polish & Deploy
- [ ] Testing and bug fixes
- [ ] Performance optimization
- [ ] Deployment setup
- [ ] Documentation

---

## 🎯 Success Metrics

### Technical Metrics
- API response time < 200ms
- 99.9% uptime
- Zero critical security vulnerabilities
- Mobile-responsive design

### User Metrics
- User registration and retention
- Mentorship session completion rate
- Event participation rate
- User satisfaction scores

---

**📝 Note**: This PRD is a living document. Update it as requirements evolve and features are implemented.
