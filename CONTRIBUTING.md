# 🤝 Contributing to CampusConnect

Thank you for your interest in contributing to CampusConnect! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Feature Development](#feature-development)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Review Guidelines](#code-review-guidelines)
- [Team Communication](#team-communication)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git
- VS Code (recommended) or your preferred editor

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/campusconnect.git
cd campusconnect

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
```

## 🔄 Development Workflow

### Git Branching Strategy
We use a feature-based branching strategy:

```bash
# Main branch (production-ready code)
main

# Development branch (integration of features)
develop

# Feature branches (individual features)
feature/mentorship-system
feature/events-management
feature/skill-swap
feature/anonymous-chat

# Bug fix branches
bugfix/login-issue
bugfix/api-error

# Hotfix branches (urgent production fixes)
hotfix/security-patch
```

### Creating a Feature Branch
```bash
# Always start from the develop branch
git checkout develop
git pull origin develop

# Create and switch to your feature branch
git checkout -b feature/your-feature-name

# Example:
git checkout -b feature/mentor-profile-creation
```

### Commit Message Format
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

#### Examples:
```bash
git commit -m "feat: add mentor profile creation form"
git commit -m "fix: resolve authentication token expiration issue"
git commit -m "docs: update API documentation for events endpoint"
git commit -m "test: add unit tests for user authentication"
```

## 📝 Coding Standards

### JavaScript/Node.js Standards
- Use ES6+ features (arrow functions, destructuring, etc.)
- Use `const` and `let` instead of `var`
- Use async/await instead of promises where possible
- Follow ESLint configuration
- Use meaningful variable and function names

### React Standards
- Use functional components with hooks
- Use TypeScript for type safety (optional but recommended)
- Follow React best practices
- Use proper prop validation
- Implement error boundaries

### Database Standards
- Use meaningful collection and field names
- Implement proper indexing
- Use MongoDB aggregation for complex queries
- Validate data at the application level

### API Standards
- Use RESTful conventions
- Implement proper HTTP status codes
- Use consistent response formats
- Implement proper error handling
- Add API documentation

## 🎯 Feature Development

### Feature Development Checklist

#### Backend Development
- [ ] Create database schema/models
- [ ] Implement API endpoints
- [ ] Add input validation
- [ ] Implement error handling
- [ ] Add authentication/authorization
- [ ] Write unit tests
- [ ] Update API documentation
- [ ] Test with Postman/Thunder Client

#### Frontend Development
- [ ] Create React components
- [ ] Implement state management
- [ ] Add form validation
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Make it responsive
- [ ] Write component tests
- [ ] Test user interactions

#### Integration
- [ ] Connect frontend to backend APIs
- [ ] Test end-to-end functionality
- [ ] Handle edge cases
- [ ] Optimize performance
- [ ] Test on different browsers

### Feature Assignment Matrix

| Feature | Backend Developer | Frontend Developer | QA Tester |
|---------|------------------|-------------------|-----------|
| Mentorship System | API, Database | UI Components | E2E Testing |
| Events Management | CRUD APIs | Event Forms | User Flow |
| Skill Swap | Matching Algorithm | Profile UI | Algorithm Testing |
| Anonymous Chat | Socket.io, Moderation | Chat Interface | Real-time Testing |

## 🧪 Testing Guidelines

### Backend Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Frontend Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Testing Checklist
- [ ] Unit tests for all functions
- [ ] Integration tests for API endpoints
- [ ] Component tests for React components
- [ ] End-to-end tests for user flows
- [ ] Performance testing
- [ ] Security testing
- [ ] Cross-browser testing

## 🔄 Pull Request Process

### Before Creating a PR
1. Ensure your code follows the coding standards
2. Write comprehensive tests
3. Update documentation if needed
4. Test your changes thoroughly
5. Rebase your branch with the latest develop branch

### Creating a Pull Request
1. Push your feature branch to GitHub
2. Create a new Pull Request
3. Fill out the PR template
4. Assign reviewers
5. Link related issues

### PR Template
```markdown
## Description
Brief description of the changes made

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing completed

## Checklist
- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
- [ ] Responsive design tested

## Screenshots (if applicable)
Add screenshots of UI changes

## Related Issues
Closes #123
```

## 👀 Code Review Guidelines

### For Reviewers
- Be constructive and respectful
- Focus on code quality and functionality
- Check for security vulnerabilities
- Ensure proper error handling
- Verify test coverage
- Check for performance issues

### For Authors
- Respond to review comments promptly
- Make requested changes
- Explain your reasoning if you disagree
- Update the PR description if needed
- Request re-review when changes are made

### Review Checklist
- [ ] Code follows project standards
- [ ] Proper error handling implemented
- [ ] Security considerations addressed
- [ ] Performance impact considered
- [ ] Tests are comprehensive
- [ ] Documentation is updated
- [ ] No breaking changes (unless intended)

## 💬 Team Communication

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and discussions
- **Slack/Discord**: Real-time communication
- **Email**: Important announcements

### Meeting Schedule
- **Daily Standup**: 15 minutes, discuss progress and blockers
- **Weekly Review**: 1 hour, code review and planning
- **Sprint Planning**: 2 hours, plan next sprint tasks

### Issue Management
- Use GitHub Issues for task tracking
- Label issues appropriately (bug, feature, enhancement, etc.)
- Assign issues to team members
- Set milestones for project phases

## 🚀 Deployment Process

### Development Environment
```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm start
```

### Staging Environment
- Automatic deployment from develop branch
- Used for testing before production
- URL: https://staging.campusconnect.com

### Production Environment
- Manual deployment from main branch
- Requires approval from team lead
- URL: https://campusconnect.com

## 📊 Performance Guidelines

### Backend Performance
- API response time < 200ms
- Database query optimization
- Proper indexing
- Caching where appropriate
- Rate limiting for API endpoints

### Frontend Performance
- Bundle size optimization
- Lazy loading for components
- Image optimization
- Caching strategies
- Progressive Web App features

## 🔒 Security Guidelines

### Authentication & Authorization
- Use JWT tokens with proper expiration
- Implement role-based access control
- Validate all user inputs
- Use HTTPS in production
- Implement rate limiting

### Data Protection
- Encrypt sensitive data
- Use environment variables for secrets
- Implement proper session management
- Regular security audits
- Follow OWASP guidelines

## 📚 Resources

### Documentation
- [React Documentation](https://reactjs.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)

### Tools
- [Postman](https://www.postman.com/) - API testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI
- [VS Code](https://code.visualstudio.com/) - Code editor
- [GitHub Desktop](https://desktop.github.com/) - Git GUI

## 🆘 Getting Help

### When You're Stuck
1. Check the documentation
2. Search existing issues
3. Ask in team chat
4. Create a GitHub issue
5. Schedule a pair programming session

### Contact Information
- **Project Lead**: [Your Name] - [email@example.com]
- **Backend Lead**: [Backend Lead Name] - [backend@example.com]
- **Frontend Lead**: [Frontend Lead Name] - [frontend@example.com]

---

**Thank you for contributing to CampusConnect! 🎓**

Remember: Every contribution, no matter how small, helps make CampusConnect better for students everywhere.
