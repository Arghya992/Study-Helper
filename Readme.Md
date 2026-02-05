# 📚 Study Helper App

An AI-powered study management platform with notes, flashcards, quizzes, pomodoro timer, and file uploads. Built with MERN stack and integrated with OpenAI for intelligent content generation.

![Study Helper](https://img.shields.io/badge/Status-Active-success)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)

## ✨ Features

### 📝 Notes Management
- Rich text editor with formatting options
- File attachments (PDF, DOC, images)
- Tag organization
- Pin important notes
- AI-powered note generation from topics

### 🎴 Flashcards
- Create custom flashcard decks
- Spaced repetition algorithm
- Track review progress
- Subject-based organization
- AI-generated flashcards from content

### 📊 Quizzes
- Multiple-choice quiz creation
- Score tracking and attempt history
- Subject categorization
- AI-generated quizzes with explanations

### ⏱️ Study Sessions
- Pomodoro timer
- Track study time per subject
- Study streak counter
- Session history and analytics
- Visual progress charts

### 📈 Analytics Dashboard
- Total study time tracking
- Subject-wise breakdown
- 7-day activity chart
- Study streak monitoring
- Performance insights

### 🤖 AI Features
- Generate comprehensive notes from any topic
- Create quizzes automatically
- Generate flashcards from study material
- Powered by OpenAI GPT-3.5

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **React Quill** - Rich text editor
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - File storage
- **OpenAI API** - AI features

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account
- OpenAI API key
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/study-helper.git
cd study-helper
```

2. **Setup Backend**
```bash
cd server
npm install
```

Create `.env` file in `server/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_min_32_characters
NODE_ENV=development

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# OpenAI
OPENAI_API_KEY=your_openai_api_key
```

Start the backend server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

3. **Setup Frontend**
```bash
cd ../client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 📁 Project Structure
```
study-helper/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context (Auth)
│   │   ├── utils/         # API utilities
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   ├── public/            # Static assets
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   │   ├── db.js         # MongoDB connection
│   │   └── cloudinary.js # Cloudinary config
│   ├── controllers/      # Route controllers
│   │   ├── authController.js
│   │   ├── noteController.js
│   │   ├── flashcardController.js
│   │   ├── quizController.js
│   │   ├── studySessionController.js
│   │   ├── subjectController.js
│   │   └── aiController.js
│   ├── models/           # Mongoose models
│   │   ├── User.js
│   │   ├── Note.js
│   │   ├── Flashcard.js
│   │   ├── Quiz.js
│   │   ├── StudySession.js
│   │   └── Subject.js
│   ├── routes/           # API routes
│   │   ├── authRoutes.js
│   │   ├── noteRoutes.js
│   │   ├── flashcardRoutes.js
│   │   ├── quizRoutes.js
│   │   ├── studySessionRoutes.js
│   │   ├── subjectRoutes.js
│   │   └── aiRoutes.js
│   ├── middleware/       # Custom middleware
│   │   ├── auth.js       # JWT authentication
│   │   └── upload.js     # Multer file upload
│   ├── services/         # Business logic
│   │   └── aiService.js  # OpenAI integration
│   ├── server.js         # Entry point
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## 🔑 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | JWT secret key | `your-secret-key` |
| `NODE_ENV` | Environment | `development` or `production` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `abcdef123` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Subjects
- `GET /api/subjects` - Get all subjects (protected)
- `POST /api/subjects` - Create subject (protected)
- `PUT /api/subjects/:id` - Update subject (protected)
- `DELETE /api/subjects/:id` - Delete subject (protected)

### Notes
- `GET /api/notes` - Get all notes (protected)
- `POST /api/notes` - Create note with files (protected)
- `PUT /api/notes/:id` - Update note (protected)
- `DELETE /api/notes/:id` - Delete note (protected)
- `PUT /api/notes/:id/pin` - Toggle pin (protected)
- `DELETE /api/notes/:id/files/:fileId` - Delete file (protected)

### Flashcards
- `GET /api/flashcards` - Get all flashcard decks (protected)
- `POST /api/flashcards` - Create deck (protected)
- `PUT /api/flashcards/:id` - Update deck (protected)
- `DELETE /api/flashcards/:id` - Delete deck (protected)
- `PUT /api/flashcards/:id/review` - Update card review (protected)

### Quizzes
- `GET /api/quizzes` - Get all quizzes (protected)
- `POST /api/quizzes` - Create quiz (protected)
- `PUT /api/quizzes/:id` - Update quiz (protected)
- `DELETE /api/quizzes/:id` - Delete quiz (protected)
- `POST /api/quizzes/:id/attempt` - Submit quiz attempt (protected)

### Study Sessions
- `GET /api/sessions` - Get all sessions (protected)
- `POST /api/sessions` - Create session (protected)
- `DELETE /api/sessions/:id` - Delete session (protected)
- `GET /api/sessions/stats` - Get statistics (protected)

### AI Features
- `POST /api/ai/generate-notes` - Generate notes from topic (protected)
- `POST /api/ai/generate-quiz` - Generate quiz (protected)
- `POST /api/ai/generate-flashcards` - Generate flashcards (protected)

---

## 🚀 Deployment

### Backend (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set root directory to `server`
5. Add environment variables
6. Deploy

### Frontend (Vercel)

1. Update API URL in code
2. Push to GitHub
3. Import project on Vercel
4. Set root directory to `client`
5. Deploy

### Database (MongoDB Atlas)

1. Create free M0 cluster
2. Add database user
3. Whitelist IP (0.0.0.0/0 for production)
4. Copy connection string

---

## 📸 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Notes with File Upload
![Notes](screenshots/notes.png)

### AI Quiz Generator
![AI Quiz](screenshots/ai-quiz.png)

### Study Timer
![Timer](screenshots/timer.png)

*Note: Add actual screenshots to a `screenshots/` folder in your repository*

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---



---

## 👤 Author

**Arghyadeep Gope**



---

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for GPT-3.5 API
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [Cloudinary](https://cloudinary.com/) for file storage
- [Render](https://render.com/) for backend hosting
- [Vercel](https://vercel.com/) for frontend hosting





---

## 🔮 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Collaborative study groups
- [ ] Video notes with timestamps
- [ ] Export notes to PDF
- [ ] Calendar integration
- [ ] Gamification (badges, levels)
- [ ] Dark mode
- [ ] Multiple languages support

---

Made with ❤️ by [Arghyadeep Gope]