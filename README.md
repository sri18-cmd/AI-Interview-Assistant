# AI Interview Assistant 🤖

An AI-powered interview preparation assistant built with **Next.js**.  
It streamlines the screening process by providing an automated, timed interview for candidates and a comprehensive dashboard for interviewers to review performance.

---

## 🔗 Live Demo & Video

- **Live Demo:** [AI Interview Assistant](https://ai-interview-assistant-lilac.vercel.app/)  
- **Demo Video:** Coming soon 🎥  

---

## 📸 Screenshots

- Interviewee Chat View  
- Interviewer Dashboard  
- Candidate Detail View  

*(Replace these placeholders with actual screenshots of your app.)*

---

## ✨ Key Features

### For the Interviewee 🧑‍💻
- 📄 **Resume Upload** – Supports both **PDF** and **DOCX** formats.  
- 🤖 **Automated Info Extraction** – Extracts Name, Email, and Phone number from resumes.  
- 💬 **Interactive Chatbot** – Collects missing info before starting the interview.  
- 🧠 **Dynamic AI Questions** – Generates role-specific interview questions, increasing in difficulty.  
- ⏱️ **Timed Responses** – Each question is time-bound (Easy, Medium, Hard).  
- 🔄 **Session Persistence** – Interview progress is saved even if the page is refreshed or closed.  

### For the Interviewer 📊
- 🏆 **Scored Candidate List** – Dashboard shows candidates sorted by AI-generated score.  
- 🔍 **Search & Sort** – Quickly find candidates by name or score.  
- 📖 **Detailed Review** – Full candidate profile, chat history, answers with AI scores, and summary.  
- 🔄 **Synced Data** – Dashboard stays up-to-date with candidate progress.  

---

## 🛠️ Tech Stack & Tools

- **Framework:** Next.js (App Router)  
- **Styling:** Tailwind CSS, shadcn/ui  
- **State Management:** Zustand (with persist middleware)  
- **Icons:** Lucide React  
- **AI Integration:** Google Gemini API (@google/generative-ai)  
- **File Parsing:** pdf-parse (PDF), mammoth (DOCX)  
- **Deployment:** Vercel  

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v18 or higher)  
- npm / yarn / pnpm  
- A Google Gemini API Key (get one from [Google AI Studio](https://ai.google.dev/))  

### Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ai-interview-assistant.git
cd ai-interview-assistant

# 2. Install dependencies
npm install

# 3. Add your Gemini API key
echo "NEXT_PUBLIC_GEMINI_API_KEY=your_super_secret_api_key_here" > .env.local

# 4. Run the development server
npm run dev
