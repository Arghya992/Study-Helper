# Contributing to Study Helper

First off, thank you for considering contributing to Study Helper! 🎉

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List some examples of how it would be used**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code follows the existing style
5. Write a clear commit message

## Development Process

1. **Clone your fork**
```bash
   git clone https://github.com/YOUR_USERNAME/study-helper.git
```

2. **Create a branch**
```bash
   git checkout -b feature/my-new-feature
```

3. **Make your changes**

4. **Test your changes**
```bash
   # Backend
   cd server
   npm run dev

   # Frontend
   cd client
   npm run dev
```

5. **Commit your changes**
```bash
   git add .
   git commit -m "Add some feature"
```

6. **Push to your fork**
```bash
   git push origin feature/my-new-feature
```

7. **Create a Pull Request**

## Code Style

### JavaScript/React
- Use ES6+ features
- Use functional components with hooks
- Follow the existing code structure
- Use meaningful variable names
- Add comments for complex logic

### Git Commit Messages
- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues and pull requests after the first line

## Project Structure
```
study-helper/
├── client/          # React frontend
└── server/          # Node.js backend
```

## Questions?

Feel free to open an issue with your question!

Thank you for contributing! 🚀