export class CommonConstant {
  public static readonly ERROR = {
    INVALID_PROMPT:
      "We couldn't process your questions and answer key. Please check your input and try again.",
    DOTENV_ERROR: "ERROR DOTENV CONFIG",
    SOMETHING_WENT_WRONG: "Something went wrong",
    INVALID_QUESTION_ANSWER: "Invalid Questions or Answer Keys",
    INVALID_QUESTION_ANSWER_DESC:
      "Please check your questions and answer keys and make sure they are correctly formatted before trying again.",
    CANT_GENERATE_MOODLE:
      "We couldn't generate your Moodle XML right now. Please try again in a moment.",
  };

  public static readonly WAITING = {
    INFO: {
      TITLE: "Generating your Moodle XML...",
      DESCRIPTION: "This may take a moment. Please don't close or refresh the page."
    }
  }

  public static readonly SUCCESS = {
    XML_RDY: "Moodle XML is ready! 🎉",
    XML_RDY_DESC:
      "Your quiz has been successfully converted into a Moodle-ready XML file. You can now download it and import it into Moodle.",
  };

  public static readonly SEPARATOR = {
    EMPTY_STRING: "",
  };

  public static readonly RESPONSE_TYPES = {
    APP_JSON: "application/json",
    APP_XML: "application/xml",
  };

  public static readonly REGEX = {
    ONLY_STRINGS: /\d+\./g,
  };

  public static readonly NUMERIC = {
    ZERO: 0,
  };

  public static readonly ENDPOINTS = {
    GENERATE: "/api/generate",
  };

  public static readonly WELCOME_MESSAGE = {
    TITLE: "Let's get your quiz ready! 👋",
    DESCRIPTION:
      "Add questions one at a time — AI helps organize your questions, answers, and choices, then we'll handle the Moodle formatting for you. Nothing is uploaded anywhere; everything stays in your browser.",
  };

  public static readonly CARD_CONTENTS = {
    QUESTIONS: {
      TITLE: "Questions",
      SENTENCE: "Drop your questions here.",
      NOTE: "Choices are optional. Add them for multiple-choice questions.",
    },
    ANSWERS: {
      TITLE: "Answers",
      SENTENCE: "Drop your answer key here.",
      NOTE: "Keep the answers in the same order as your questions.",
    },
  };
}
