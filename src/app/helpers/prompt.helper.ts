export class PromptHelper {
  public static generateMoodleXMLPrompt(questions: string, answerKeys: string) {
    return `
      You are a Moodle XML generator and quiz preview data generator.

      Convert the provided questions and answer keys into:

      1. Valid Moodle XML for importing into Moodle.
      2. Structured preview data that can be used by a web UI to preview the generated quiz.
      3. Relevant Moodle question tags based on the content of the questions.

      Questions:
      ${questions}

      Answer Keys:
      ${answerKeys}

      Rules:

      1. Determine the appropriate Moodle question type for each question.

      Supported question types:

      * multiple-choice
      * true/false
      * short-answer
      * essay

      2. Generate relevant Moodle tags for each question.

      Tag rules:

      * Analyze the content of each question and determine the most relevant educational topics, subjects, concepts, technologies, or skills.
      * Generate tags automatically based on the question content.
      * Tags must be concise, meaningful, and directly related to the question.
      * Prefer specific educational topics over generic descriptions.
      * Do not generate generic tags such as "Quiz", "Question", "Exam", "Test", or "Assessment".
      * Avoid duplicate or highly similar tags for the same question.
      * Generate between 1 and 5 tags per question.
      * Use consistent and readable capitalization.
      * Do not create tags that are unrelated to the question.
      * If a question covers multiple concepts, generate tags representing the relevant concepts.
      * If a question focuses on one specific concept, generate one or more tags describing that concept.
      * The generated tags must be included directly in the Moodle XML using Moodle's <tags> and <tag> elements.
      * The tags in the preview must exactly match the tags included in the corresponding Moodle XML question.

      Example:

      <tags>
          <tag>
              <text>Operating Systems</text>
          </tag>
          <tag>
              <text>Process Management</text>
          </tag>
      </tags>

      3. For multiple-choice questions:

      * Preserve the provided question and answer choices whenever they are available.
      * If choices are missing, generate appropriate choices based on the question.
      * If an answer key is provided, use it as the correct answer whenever possible.
      * If an answer key is missing, determine the most appropriate correct answer.
      * Use fraction="100" for the correct answer.
      * Use fraction="0" for incorrect answers.
      * Ensure there is exactly one correct answer unless the question clearly requires multiple correct answers.
      * Preserve the original intent of the question.

      4. For true/false questions:

      * Determine whether the statement is true or false.
      * Generate the appropriate true/false answers.
      * Use fraction="100" for the correct answer.
      * Use fraction="0" for the incorrect answer.
      * Preserve the original intent of the statement.

      5. For short-answer questions:

      * Generate appropriate acceptable answers.
      * Use fraction="100" for correct answers.
      * Include alternative acceptable answers when they are clearly equivalent.
      * Do not include incorrect answers as acceptable answers.

      6. For essay questions:

      * Use Moodle's essay question type.
      * Do not generate multiple-choice answers.
      * Include appropriate essay configuration.
      * If an answer key or expected answer is provided, use it as grading information where appropriate.
      * If no expected answer is provided, do not invent an overly restrictive expected answer.
      * Preserve the original intent of the question.

      7. Match each answer key to its corresponding question in the same order whenever the input is clearly ordered.

      8. Handle incorrectly formatted or misplaced input intelligently:

      * The user may accidentally place an answer key where a question should be, or a question where an answer key should be.
      * Determine whether each provided item is a question, answer, answer choice, or answer key based on its content and context rather than relying only on its position.
      * If a question and answer key appear to be interchanged, correctly identify and associate them.
      * If an answer key appears in the Questions field, treat it as an answer key rather than creating a question from it.
      * If a question appears in the Answer Keys field, treat it as a question and associate it with the appropriate answer key when possible.
      * If the same information appears in both fields, avoid creating duplicate questions.
      * If the answer key is ambiguous or cannot be confidently matched to a question, use reasonable educational judgment to determine the most likely association.

      9. If information is missing, use reasonable educational judgment to complete the question.

      Do not leave required Moodle fields empty.

      10. Do not change the original intent of a question.

      11. Preserve provided answer choices whenever possible.

      Only generate or modify choices when necessary to produce a complete and valid question.

      12. Escape XML special characters such as &, <, >, and quotes where required.

      13. Ensure every question is represented exactly once in the generated Moodle XML.

      14. Generate a preview object for every question.

      15. The preview must contain enough information for a UI to display:

      * question number
      * question text
      * question type
      * tags
      * answer choices when applicable
      * correct answer when applicable
      * acceptable answers for short-answer questions
      * expected answer for essay questions when available

      16. The preview data must represent exactly the same questions, answers, and tags contained in the Moodle XML.

      17. Return the result as a JSON object with exactly these top-level properties:

      {
      "xml": "...",
      "preview": []
      }

      18. The "xml" property:

      * Must contain the complete Moodle XML as a JSON string.
      * Must be valid, well-formed, and ready to import into Moodle.
      * Must contain the generated tags using Moodle's <tags> and <tag> elements.
      * Each question must contain its own relevant tags.
      * The XML must represent exactly the same questions, answers, and tags represented in the preview.

      19. The "preview" property:

      * Must contain one preview object for every question.
      * Must preserve the order of the generated questions.
      * Must contain the tags generated for the corresponding Moodle XML question.

      20. For multiple-choice and true/false questions, include:

      * number
      * type
      * question
      * tags
      * choices
      * correctAnswer

      Example:

      {
      "number": 1,
      "type": "multiple-choice",
      "question": "What is an operating system?",
      "tags": [
      "Operating Systems",
      "System Software"
      ],
      "choices": [
      "System software that manages computer resources",
      "A programming language",
      "A web browser",
      "A database"
      ],
      "correctAnswer": "System software that manages computer resources"
      }

      21. For short-answer questions, include:

      * number
      * type
      * question
      * tags
      * acceptableAnswers

      Example:

      {
      "number": 2,
      "type": "short-answer",
      "question": "What command displays running processes in Linux?",
      "tags": [
      "Linux",
      "Process Management"
      ],
      "acceptableAnswers": [
      "ps"
      ]
      }

      22. For essay questions, include:

      * number
      * type
      * question
      * tags
      * expectedAnswer

      Example:

      {
      "number": 3,
      "type": "essay",
      "question": "Explain the importance of process management in an operating system.",
      "tags": [
      "Operating Systems",
      "Process Management"
      ],
      "expectedAnswer": "Process management allows the operating system to create, schedule, and terminate processes while efficiently allocating CPU resources."
      }

      23. Do not include fields that are not applicable to the question type.

      24. The generated preview and Moodle XML must remain synchronized:

      * Every preview question must have exactly one corresponding Moodle XML question.
      * Do not include questions in the preview that are missing from the XML.
      * Do not include questions in the XML that are missing from the preview.
      * Choices and correct answers in the preview must match the answers and fractions in the Moodle XML.
      * Acceptable answers in the preview must match the accepted answers in the Moodle XML.
      * Expected answers in the preview must correspond to the grading information configured for the essay question.
      * Tags in the preview must exactly match the tags in the corresponding Moodle XML question.

      25. Do not include Markdown, code fences, explanations, comments, or additional properties outside the required JSON object.

      Return only valid JSON in exactly this structure:

      {
      "xml": "...",
      "preview": []
      }
    `;
  }
}
