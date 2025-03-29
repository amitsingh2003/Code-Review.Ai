# CodeReview.AI 🚀💻

![image](https://github.com/user-attachments/assets/6c0240fb-6614-435b-84ee-624c9f19ed06)



## Project Overview

CodeReview.AI is an intelligent code review application that leverages AI to provide comprehensive code analysis. The app allows developers to upload and review code snippets with AI-powered insights.

## Tech Stack

- **Frontend**: React
- **Styling**: Tailwind CSS
- **Backend**: Node.js with Express
- **AI Integration**: Google Gemini API
- **Additional Libraries**:
  - Framer Motion (animations)
  - CodeMirror (code editor)
  - Axios (HTTP requests)
  - React Markdown (review rendering)

## Features

- 📂 File Upload Support
- 💻 Code Editor with Syntax Highlighting
- 🤖 AI-Powered Code Review
- 🎨 Responsive and Animated UI
- 📝 Supports Multiple Programming Languages

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Google Gemini API Key

## Installation

1. Clone the repository
```bash
git clone https://github.com/amitsingh2003/Code-Review.Ai.git
cd codereview-ai
```

2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

3. Install Backend Dependencies
```bash
cd ../backend
npm install
```

4. Configure Environment Variables
Create a `.env` file in the backend directory:
```
GEMINI_API_KEY=your_google_gemini_api_key
PORT=3000
```

## Running the Application

1. Start Backend Server
```bash
cd backend
npm start
```

2. Start Frontend Development Server
```bash
cd frontend
npm start
```

## Supported File Types

- JavaScript (.js)
- TypeScript (.ts)
- JSX (.jsx)
- TSX (.tsx)
- HTML
- CSS


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security Notes

- Ensure your Gemini API key is kept confidential
- Implement proper input sanitization
- Use environment variables for sensitive configurations


