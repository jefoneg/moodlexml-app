import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
import { CommonConstant } from "@/constants/common.constant";
import { PromptHelper } from "@/app/helpers/prompt.helper";
import { CommonHelper } from "@/app/helpers/common.helper";
import OpenAI from "openai";

dotenv.config();

const geminiKey = process.env.GEMINI_API_KEY;
const geminiModel = process.env.GEMINI_MODEL;
const openaiKey = process.env.OPENAI_KEY;
const deepseekKey = process.env.DEEPSEEK_KEY;

if (!geminiKey || !geminiModel || !openaiKey || !deepseekKey) {
  throw new Error(CommonConstant.ERROR.DOTENV_ERROR);
}

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// const openai = new OpenAI({
//   apiKey: openaiKey,
// });

// const deepseek = new OpenAI({
//   baseURL: "https://api.deepseek.com",
//   apiKey: deepseekKey,
// });

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!Object.keys(prompt).length)
      throw new Error(CommonConstant.ERROR.INVALID_PROMPT);

    const response = await gemini.models.generateContent({
      model: geminiModel || CommonConstant.SEPARATOR.EMPTY_STRING,
      contents: PromptHelper.generateMoodleXMLPrompt(
        prompt.questions,
        prompt.answerKeys,
      ),
      config: {
        responseMimeType: CommonConstant.RESPONSE_TYPES.APP_JSON,
      },
    });

    // const response = await deepseek.chat.completions.create({
    //   model: "deepseek-flash",
    //   messages: [
    //     {
    //       role: "user",
    //       content: PromptHelper.generateMoodleXMLPrompt(
    //         prompt.questions,
    //         prompt.answerKeys,
    //       ),
    //     },
    //   ],
    // });

    // const reply = response.choices[0]?.message?.content ?? "";

    return NextResponse.json({
      response: CommonHelper.parseResponseText(response.text),
    });
    // return NextResponse.json({
    //   response: CommonHelper.parseResponseText(reply),
    // });
  } catch (error) {
    return NextResponse.json({
      error:
        error instanceof Error
          ? error.message
          : CommonConstant.ERROR.SOMETHING_WENT_WRONG,
      status: 500,
    });
  }
}
