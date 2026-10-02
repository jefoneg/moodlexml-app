# AI Moodle XML Generator

Turn your questions and answer key into Moodle XML with AI.

Built with Next.js, this application helps educators create quizzes without manually writing XML. Simply paste your questions and answer key, let AI handle the conversion, and download the XML file for import into Moodle.

## How It Works

1. **Paste your questions.** Include answer choices when available.
2. **Paste your answer key.** Match the numbering of your questions.
3. **Generate the XML.** AI processes your input and formats it for Moodle.
4. **Download and review.** Check the generated questions and answers.
5. **Import into Moodle/SLSU-LMS.** Upload the file to your question bank using the Moodle XML import format.

## Features

- Separate text boxes for questions and answer keys.
- AI-assisted conversion to Moodle XML.
- Plain-text input with no manual XML formatting required.
- Downloadable XML output for Moodle import.

## Example Input

### Questions

```text
1. Which Java keyword is used to inherit a class?
A. implements
B. extends
C. import
D. package

2. Encapsulation helps protect an object's internal state.
True or False
```

### Answer Key

```text
1. B
2. True
```

For best results, use consistent numbering and clearly separate each question.

## Tech Stack

- **Next.js** — application framework.
- **React** — user interface.
- **AI API** — question interpretation and XML generation.
- **Moodle XML** — quiz export format.

## Getting Started

### 1. Install dependencies

Run this command inside the project directory:

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file at the project root and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Keep your API key private and ensure `.env` is included in `.gitignore`.

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

```bash
npm run build
npm run start
```

## Reviewing Generated Quizzes

AI-generated output may contain incorrect answers, altered wording, or formatting issues. Review the generated content and verify that Moodle imports it successfully before publishing a quiz.

## Data Handling

Questions and answer keys are sent to the configured AI provider during generation. Data retention and usage depend on the provider and the application's implementation.