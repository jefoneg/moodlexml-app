"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { CommonConstant } from "../../constants/common.constant";
import { CloudArrowDownIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { ApiHelper } from "../../helpers/api.helper";
import { CommonHelper } from "../../helpers/common.helper";
import { AlertDestructive } from "../../reusable-components/alert-destructive";
import { AlertInfo } from "../../reusable-components/alert-info";
import { AlertSuccess } from "../../reusable-components/alert-success";
import { Paragraph } from "../../reusable-components/paragraph-text";
import { Title } from "../../reusable-components/title-text";
import { NavigationBar } from "../../reusable-components/navigation-bar";
import { usePathname } from "next/navigation";

export default function MainContent() {
  const [toXMLText, setToXMLText] = useState({});
  const [questions, setQuestions] = useState(
    CommonConstant.SEPARATOR.EMPTY_STRING,
  );
  const [answerKeys, setAnswerKeys] = useState(
    CommonConstant.SEPARATOR.EMPTY_STRING,
  );
  const [numberOfQuestions, setNumbeOfQuestions] = useState([] as number[]);
  const [numberOfAnswerKeys, setNumberOfAnswerKeys] = useState([] as number[]);
  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    CommonConstant.SEPARATOR.EMPTY_STRING,
  );
  const [errorTitle, setErrorTitle] = useState(
    CommonConstant.SEPARATOR.EMPTY_STRING,
  );
  const [isBusy, setBusyState] = useState(false);
  const [isSuccessful, setSuccessful] = useState(false);
  const [moddleXmlContent, setMoodleXmlContent] = useState(
    CommonConstant.SEPARATOR.EMPTY_STRING,
  );

  /**
   * Handles value changes from the textarea.
   *
   * @param    {React.ChangeEvent<HTMLTextAreaElement>} event        The value passed from an event like a value from a textarea.
   * @param    {boolean}                                isQuestions  Flag to determine if the passed value is a question or not.
   * @returns  {void}
   */
  function handleTextValueChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
    isQuestions?: boolean,
  ): void {
    const capturedValue = event.target.value;
    const items =
      capturedValue.match(CommonConstant.REGEX.ONLY_STRINGS)?.map(Number) ?? [];

    if (!isQuestions) {
      setAnswerKeys(capturedValue);
      setNumberOfAnswerKeys(items);
    } else {
      setQuestions(capturedValue);
      setNumbeOfQuestions(items);
    }
  }

  /**
   * Handles clearing all entries on the textarea.
   *
   * @returns  {void}
   */
  function clearEntries(): void {
    setQuestions(CommonConstant.SEPARATOR.EMPTY_STRING);
    setAnswerKeys(CommonConstant.SEPARATOR.EMPTY_STRING);
    setError(false);
    CommonHelper.handleScrollTop(CommonConstant.PARAMETERS.WELCOME_MESSAGE_ID);
  }

  /**
   * Handles the API endpoint call when generating MoodleXML.
   *
   * @returns  {Promise<void>}
   */
  async function generateMoodleXML(): Promise<void> {
    CommonHelper.handleScrollTop("action");
    setSuccessful(false);
    setBusyState(true);
    const isQuestionsAndKeyValid =
      numberOfQuestions.length === numberOfAnswerKeys.length &&
      ![numberOfAnswerKeys.length, numberOfQuestions.length].some(
        (inputs) => CommonConstant.NUMERIC.ZERO === inputs,
      );

    if (!isQuestionsAndKeyValid) {
      setErrorTitle(CommonConstant.ERROR.INVALID_QUESTION_ANSWER);
      setErrorMessage(CommonConstant.ERROR.INVALID_QUESTION_ANSWER_DESC);
      setError(!isQuestionsAndKeyValid);
      setBusyState(isQuestionsAndKeyValid);
      CommonHelper.handleScrollTop(
        CommonConstant.PARAMETERS.WELCOME_MESSAGE_ID,
      );
      return;
    }

    setError(false);

    setToXMLText({
      questions: questions.trim(),
      answerKeys: answerKeys.trim(),
    });

    try {
      const res = await ApiHelper.api(
        CommonConstant.ENDPOINTS.GENERATE,
        toXMLText,
      );

      const data = await res.json();

      if (data?.error) {
        setError(true);
        setErrorTitle(CommonConstant.ERROR.SOMETHING_WENT_WRONG);
        setErrorMessage(CommonConstant.ERROR.CANT_GENERATE_MOODLE);
        CommonHelper.handleScrollTop(
          CommonConstant.PARAMETERS.WELCOME_MESSAGE_ID,
        );

        return;
      }
      setMoodleXmlContent(data.response.xml);
      setSuccessful(true);
      CommonHelper.handleScrollTop(
        CommonConstant.PARAMETERS.WELCOME_MESSAGE_ID,
      );
    } catch (error) {
      setError(true);
      setErrorTitle(CommonConstant.ERROR.SOMETHING_WENT_WRONG);
      setErrorMessage(
        error instanceof Error
          ? error?.message
          : CommonConstant.ERROR.CANT_GENERATE_MOODLE,
      );
      CommonHelper.handleScrollTop(
        CommonConstant.PARAMETERS.WELCOME_MESSAGE_ID,
      );
    } finally {
      setBusyState(false);
    }
  }

  useEffect(() => {
    if (!isBusy) return;

    window.addEventListener("beforeunload", CommonHelper.handleBeforeUnload);

    return () => {
      window.removeEventListener(
        "beforeunload",
        CommonHelper.handleBeforeUnload,
      );
    };
  }, [isBusy]);

  return (
    <>
      <NavigationBar shouldShow={"/home" === usePathname()} />
      <div className="container mx-auto flex flex-col items-center justify-center h-max">
        <div
          className="p-5 text-center flex justify-center items-center flex-col gap-5"
          id="welcome-message"
        >
          <Title text={CommonConstant.WELCOME_MESSAGE.TITLE} />
          <Paragraph text={CommonConstant.WELCOME_MESSAGE.DESCRIPTION} />
          {hasError && (
            <AlertDestructive
              alertTitle={errorTitle}
              alertDescription={errorMessage}
            />
          )}
          {isSuccessful && (
            <div>
              <AlertSuccess
                alertTitle={CommonConstant.SUCCESS.XML_RDY}
                alertDescription={CommonConstant.SUCCESS.XML_RDY_DESC}
              />
              <Button
                className="mt-3 text-sm p-5 md:text-lg cursor-pointer"
                onClick={() => ApiHelper.downloadXML(moddleXmlContent)}
              >
                <CloudArrowDownIcon data-icon="inline-start" /> Download
              </Button>
            </div>
          )}
        </div>
        <section
          className="p-5 w-full flex gap-5 flex-wrap md:flex-nowrap"
          id="contents"
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">
                {CommonConstant.CARD_CONTENTS.QUESTIONS.TITLE}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Field>
                    <FieldDescription className="text-sm md:text-lg">
                      {CommonConstant.CARD_CONTENTS.QUESTIONS.SENTENCE}
                    </FieldDescription>
                    <FieldDescription className="text-xs md:text-sm italic">
                      {CommonConstant.CARD_CONTENTS.QUESTIONS.NOTE}
                    </FieldDescription>
                    <Textarea
                      className="text-sm h-62.5 overflow-y-auto lg:text-lg"
                      id="textarea-message"
                      value={questions}
                      placeholder={
                        "1. What is...?\n2. Explain...\n3. The sky is always green..."
                      }
                      onChange={(event) => handleTextValueChange(event, true)}
                      disabled={isBusy}
                    />
                  </Field>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">
                {CommonConstant.CARD_CONTENTS.ANSWERS.TITLE}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Field>
                      <FieldDescription className="text-sm md:text-lg">
                        {CommonConstant.CARD_CONTENTS.ANSWERS.SENTENCE}
                      </FieldDescription>
                      <FieldDescription className="text-xs md:text-sm italic">
                        {CommonConstant.CARD_CONTENTS.ANSWERS.NOTE}
                      </FieldDescription>
                      <Textarea
                        className="text-sm h-62.5 overflow-y-auto resize-none lg:text-lg"
                        id="textarea-message"
                        value={answerKeys}
                        placeholder={"1. B\n2. Essay\n3. True"}
                        onChange={(event) =>
                          handleTextValueChange(event, false)
                        }
                        disabled={isBusy}
                      />
                    </Field>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
        {isBusy && (
          <div className="mb-5 p-5">
            <AlertInfo
              alertTitle={CommonConstant.WAITING.INFO.TITLE}
              alertDescription={CommonConstant.WAITING.INFO.DESCRIPTION}
            />
          </div>
        )}
        <div
          className="flex justify-center items-center flex-col gap-2 md:flex-row"
          id="action"
        >
          <Button
            variant="destructive"
            className="w-44 p-5 text-sm md:text-lg cursor-pointer"
            onClick={clearEntries}
            disabled={!questions || isBusy}
          >
            Clear
          </Button>
          <Button
            className="text-sm p-5 md:text-lg cursor-pointer"
            onClick={async () => {
              generateMoodleXML();
            }}
            disabled={!questions || !answerKeys || isBusy}
          >
            {isBusy && <Spinner data-icon="inline-start" />}
            Generate MoodleXML
          </Button>
        </div>
      </div>
    </>
  );
}
