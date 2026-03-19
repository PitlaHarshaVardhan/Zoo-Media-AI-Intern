<img width="1920" height="1080" alt="Screenshot 2026-03-19 201952" src="https://github.com/user-attachments/assets/45926002-842a-45a4-8b53-5bf017850c61" /># AI Assignment Summarizer

A full-stack application that takes unstructured text input, sends it to an LLM via a Node.js Express backend, and returns a structured JSON summary (summary, key points, sentiment) displayed on a clean React frontend.

---

## How to set up and run the tool

### 1. Backend Setup
Open a terminal in the `server` directory and install dependencies:
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory (based on `.env.example`) and add your Gemini API key:
```env
PORT=5000
LLM_API_KEY=your_gemini_api_key_here
LLM_MODEL=gemini-2.5-flash
```
Start the Node server:
```bash
npm start
```
The backend API will run on `http://localhost:5000`.

### 2. Frontend Setup
Open a new terminal in the `client` directory and install dependencies:
```bash
cd client
npm install
```
Start the Vite development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser to access the frontend application.

---

## Which LLM API you used and why
For this project, I integrated the **Google Gemini API** (using the official `@google/generative-ai` SDK) running the `gemini-2.5-flash` model. 

**Why Gemini?** I chose Google Gemini primarily because of its generous open tier and free credits. This makes it the perfect candidate for local development, internships, and portfolio projects without incurring unexpected billing costs during testing. Furthermore, the *Flash* model tier offers incredibly fast inference times, making the frontend UX feel extremely snappy and responsive compared to heavier models.

---

## A brief explanation of your prompt design
Generating strict, parseable JSON from an LLM requires rigorous prompt engineering to prevent the model from hallucinating conversational filler. The backend system prompt was designed with the following principles:

1. **Persona Assignment**: Grounds the model immediately ("You are an assistant that converts unstructured text into strict JSON").
2. **Explicit Schema Declaration**: Dictates the exact keys required (`summary`, `keyPoints`, `sentiment`) and shows the expected data types/values for each, including strict enums for the sentiment.
3. **Negative Constraints**: Strictly forbids the model from outputting markdown formatting or explanations ("Do not include any other text, markdown blocks, or explanation").
4. **Code Fallback**: Even with perfect prompting, LLMs sometimes wrap outputs in \`\`\`json blocks. The backend code includes a lightweight regex cleaner to strip these blocks before running `JSON.parse()`.

### The Prompt Used to Bootstrap the Architecture
To architect the foundational boilerplates for this full-stack assignment, the following comprehensive prompt was utilized:

Act as a senior full-stack developer with strong experience in React.js, Node.js, and LLM integrations.

Your task is to generate a complete, production-quality mini project based on the following requirements:

PROJECT GOAL:
Build a full-stack application that takes unstructured text input, sends it to an LLM API, and returns a structured JSON summary.

TECH STACK:
- Frontend: React.js with Vite
- Backend: Node.js with Express
- LLM: OpenAI-compatible API
- Other: dotenv, cors, axios/fetch

FEATURE REQUIREMENTS:
1. Input:
   - Textarea for user input
   - Optional file upload (bonus)

2. Processing:
   - Send input text to backend API (/api/summarize)
   - Backend calls LLM with a strong structured prompt

3. Output:
   - JSON response with:
     {
       "summary": "one sentence",
       "keyPoints": ["point 1", "point 2", "point 3"],
       "sentiment": "positive | neutral | negative"
     }

4. UI:
   - Clean, minimal UI
   - Loading state ("Analyzing...")
   - Display result in cards/sections
   - Error messages for failures

BACKEND REQUIREMENTS:
- Create Express server
- One POST route: /api/summarize
- Validate input (non-empty string)
- Use environment variable for API key
- Handle errors:
  - Empty input
  - API failure
  - Invalid JSON from LLM

PROMPT DESIGN (IMPORTANT):
Use a strong LLM prompt like:
"You are an assistant that converts unstructured text into strict JSON..."

Ensure:
- Only JSON output
- No markdown
- Exact schema

PROJECT STRUCTURE:
Generate full folder structure like:

assignment-summarizer/
  client/
    src/
      App.jsx
      main.jsx
      components/
        ResultCard.jsx
    index.html
    package.json
  server/
    src/
      index.js
      llm.js
      prompt.js
      validate.js
    .env.example
    package.json
  README.md

CODE QUALITY:
- Clean, readable, modular code
- Use async/await
- Separate concerns (routes, LLM logic, validation)
- Use best practices

README REQUIREMENTS:
Write a professional README including:
- Project overview
- Tech stack
- Setup instructions
- .env configuration
- How to run frontend & backend
- Prompt design explanation
- Trade-offs
- Future improvements
- Example output

EXTRA (IMPORTANT FOR INTERVIEW):
- Keep solution simple and explainable
- Do NOT over-engineer
- Focus on clarity and correctness

OUTPUT FORMAT:
1. Folder structure
2. Full backend code (all files)
3. Full frontend code (all files)
4. README.md

Make the project look like it was built by a professional developer for an internship assignment.

> "Act as a senior full-stack developer with strong experience in React.js, Node.js, and LLM integrations. Your task is to generate a complete, production-quality mini project based on the following requirements:
> 
> PROJECT GOAL: Build a full-stack application that takes unstructured text input, sends it to an LLM API, and returns a structured JSON summary.
> 
> TECH STACK: Frontend: React.js with Vite. Backend: Node.js with Express. LLM: OpenAI-compatible API. Other: dotenv, cors, axios/fetch.
> 
> FEATURE REQUIREMENTS: 
> 1. Input: Textarea for user input, Optional file upload (bonus). 
> 2. Processing: Send input text to backend API (/api/summarize). Backend calls LLM with a strong structured prompt.
> 3. Output: JSON response with: {"summary": "one sentence", "keyPoints": ["point 1", "point 2", "point 3"], "sentiment": "positive | neutral | negative"}. 
> 4. UI: Clean, minimal UI, Loading state ("Analyzing..."), Display result in cards/sections, Error messages for failures.
> ... (Includes constraints on modular structure, keeping it explainable, and separating concerns strictly)."

---

## What I would do differently or add with more time
If I had more time to expand this mini-project for a true production environment, I would add:
1. **File Uploads**: Implement `multipart/form-data` handling using `multer` on the backend, paired with a document parser (like `pdf-parse`) to allow users to upload and summarize `.pdf` and `.docx` files directly.
2. **Streaming Response (SSE)**: Standard REST API POST requests leave the user waiting in suspense. I would implement Server-Sent Events (SSE) to stream the LLM response chunk-by-chunk in real-time.
3. **Robust State Management & Caching**: Implement `React Query` on the frontend. This would cache identical previous summaries, reducing duplicate API calls and handling loading/error states much more cleanly than isolated React state.
4. **Security & Rate Limiting**: Add `express-rate-limit` middleware to the express API to protect the app from DDOS or accidental infinite loop API abuse.

---

## Any trade-offs or shortcuts you knowingly made
1. **Vanilla CSS vs. Frameworks**: To keep dependencies minimal and demonstrate a foundational understanding of UI styling and CSS variables, I used standard React with Vanilla CSS. A known shortcut here is missing out on established design systems like Tailwind CSS or component libraries (MUI/Chakra/Shadcn), which normally speed up scalable, accessible UI development.
2. **Error Handling Granularity**: The backend currently catches broad LLM SDK errors and bubbles a generic "Failed to generate summary" message to the frontend. In a real system, I would explicitly map and bubble up specific errors (e.g., 429 Rate Limits, 401 Unauthorized, Timeouts) to dynamically guide the user on what went wrong.
3. **No Database Integration**: To focus purely on the core LLM pipeline constraint, I bypassed setting up a database (e.g., PostgreSQL/MongoDB). History is not maintained, so summaries are ephemeral and lost on a page refresh.

---

## 📸 App Screenshots

Below is an example of the AI Summarizer interface securely processing unstructured text into intelligent JSON chunks:
<img width="1920" height="1080" alt="Screenshot 2026-03-19 202028" src="https://github.com/user-attachments/assets/1bd4dd9e-9eac-436d-ab42-4d43fd063b3b" />

